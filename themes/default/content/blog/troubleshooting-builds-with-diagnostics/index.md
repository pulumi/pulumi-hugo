---
title: "Troubleshooting Builds With Diagnostics"
date: 2022-03-29T12:00:55-06:00
draft: false
meta_desc: Explore how to gather diagnostic data to debug your Pulumi programs.
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - troubleshooting
---

One of the most common things a developer, an operations professional, a security researcher, and a quality assurance engineer all have in common is the pain of troubleshooting. No matter where you are in an IT organization, you probably have cursed your system at some point as you stare at a wall of characters representing an error somewhere. Whenever humans interact with a system, we introduce chaos, and the more complex the system, the more likely the system's diagnostic data is complex and multi-layered. Pulumi, as a system that represents some of the more complex systems we can make, is no exception. So let's demystify diagnostics in Pulumi.

<!--more-->

## Getting data

First, if you don't know how to get diagnostic data from a Pulumi run, our [troubleshooting page]({{< relref "/docs/troubleshooting" >}}) is a good place to start. There's a section specifically on [diagnostics]({{< relref "/docs/troubleshooting#diagnosing-issues" >}}). If you're in a hurry, though, here's the fast answer that gives you every single piece of data you could possibly want:

```bash
TF_LOG=TRACE PULUMI_DEBUG_PROMISE_LEAKS=true pulumi <command> -v=11 --logflow --logtostderr 2>&1 | tee -a pulumi_log.txt
```

However, let's dig in on this a bit as there's a lot to unpack.

### Data sources

There are two different kinds of diagnostics you can get from a standard Pulumi CLI command because there're actually two pieces running: the Pulumi [deployment engine]({{< relref "/docs/intro/concepts/how-pulumi-works#deployment-engine" >}}) and the [resource providers]({{< relref "/docs/reference/glossary#resource-provider" >}}). To get data from each piece, you need to run different flags. In general, the root flag you'll always need is the `-v` flag, which stands for "verbose" (that's standard for most CLIs). That flag gives you data from the deployment engine. If you want general diagnostics for a `pulumi up`, you would add the `-v` flag with a number representing the logging level you need:

```bash
pulumi up -v=5
```

How do you decide which level to ask for? In the classic style of professionals discussing complex data, "it depends." We often encourage people to start at level 9, which gives you almost everything you need. Level 1 can be thought of as equivalent to `CRITICAL` messages only---Red Alert, panic panic panic. Level 9, on the other hand, can be thought of as equivalent to `DEBUG` messages and above---give me all the things. And then, of course because [every dial needs to unlock more power](https://youtu.be/KOO5S4vxi0o), you can turn it up to 11, which can be thought of as `TRACE` in many logging paradigms.

Now, that flag only covers what Pulumi's engine is doing. Most of the time, you also need data from the providers you're calling. Each API that Pulumi works with has their own format of diagnostic data, and we need to pass in a flag to ensure those logs bubble up. Why is there a separate flag? Well, some Pulumi providers use a schema from the Terraform community to connect to various systems. Many providers didn't really have create-read-update-delete (CRUD) operations mapped out when they started, which is why the Terraform schema exists in the first place. For those providers, an environment variable is needed to surface the right data in the diagnostics. For non-"bridged" providers (meaning providers that don't use the Terraform schema), you won't need that variable to get set, but you do need a different flag to ask those child processes to bubble up their data. Because there are a lot of moving parts in a Pulumi program, there're a lot of places to get data from, and all of these flags allow you to decide what data you need.

So, to get diagnostic data for "bridged" providers, you need to add in the `TF_LOG` environment variable:

```bash
TF_LOG=DEBUG pulumi up -v=5
```

How can you tell if a provider uses the Terraform bridge? There's two ways. First, you can [open up the provider in the Registry](https://registry.pulumi.com/) and check the **Package Details** at the bottom of the API docs landing page. If the Notes section lists the provider as based on a Terraform provider, you know the provider uses the Terraform bridge.

 ![An example provider's Package Details that contains a link to the provider's GitHub repo, the open-source license information for the provider, and a note explaining the provider is based off of a Terraform provider.](./package_details.png "Package Details on a provider")

Second, if you'd rather check from the provider's repository, you can search for `tfgen` in the repository's Makefile, like in [this search of the Makefile for the Aiven provider](https://github.com/pulumi/pulumi-aiven/search?l=Makefile&q=tfgen).

To get data from another provider that isn't "bridged," you need to pass in the `--logflow` flag, which asks the providers (all child processes) to bubble up their data:

```bash
pulumi up -v=5 --logflow
```

In practice, we generally use all of these together because that way, you don't need to know which type of provider you might be calling:

```bash
TF_LOG=DEBUG pulumi up -v=9 --logflow
```

If you really, really want to go down the rabbit hole, there's also an environment variable to help debug promise leaks. If you have a promise leak somewhere in your code, Pulumi [prints an error message](https://github.com/pulumi/pulumi/blob/f8a9698ca9599240223bed8305bbdfe4c4a5446a/sdk/nodejs/runtime/debuggable.ts#L36-L46) that tells you to use the `PULUMI_DEBUG_PROMISE_LEAKS` environment variable to rerun your command:

```go
export function leakedPromises(): [Set<Promise<any>>, string] {
    const leaked = leakCandidates;
    const promisePlural = leaked.size === 0 ? "promise was" : "promises were";
    const message = leaked.size === 0 ? "" :
        `The Pulumi runtime detected that ${leaked.size} ${promisePlural} still active\n` +
        "at the time that the process exited. There are a few ways that this can occur:\n" +
        "  * Not using `await` or `.then` on a Promise returned from a Pulumi API\n" +
        "  * Introducing a cyclic dependency between two Pulumi Resources\n" +
        "  * A bug in the Pulumi Runtime\n" +
        "\n" +
        "Leaving promises active is probably not what you want. If you are unsure about\n" +
        "why you are seeing this message, re-run your program "
            + "with the `PULUMI_DEBUG_PROMISE_LEAKS`\n" +
        "environment variable. The Pulumi runtime will then print out additional\n" +
        "debug information about the leaked promises.";

    if (debugPromiseLeaks) {
        for (const leak of leaked) {
            console.error("Promise leak detected:");
            console.error(promiseDebugString(leak));
        }
    }

    leakCandidates = new Set<Promise<any>>();
    return [leaked, message];
}
```

The variable causes Pulumi to dump the context, stack trace, and error for the leak. It's very rare you'll need to do this kind of debugging, but in case you do:

```bash
PULUMI_DEBUG_PROMISE_LEAKS=true pulumi up -v=11
```

### Data return

Those flags, though, don't tell the CLI where to send the data for you to examine. You might be working on a system that doesn't allow you to write logs anywhere, you might be streaming that data to another platform, or you might be able to write to a file to examine or parse later. If you want to write the diagnostic data to stdout/stderr, you need to add the `--logtostderr` flag:

```bash
TF_LOG=DEBUG pulumi up -v=9 --logflow --logtostderr
```

If you want to write that diagnostic data to a file and not to stdout/stderr, you can use your standard output pipe to point the data to a file (in this example, we're appending to any existing logfile):

```bash
TF_LOG=TRACE pulumi up -v=11 --logflow --logtostderr &>> pulumi_log.txt
```

Alternatively, you could stream that diagnostic data to stdout/stderr *and* write it to a file with a slight change to that line:

```bash
TF_LOG=TRACE pulumi up -v=11 --logflow --logtostderr 2>&1 | tee -a pulumi_log.txt
```

## Understanding data

While it's great to get the data, it's not useful unless we can understand what the troubleshooting data actually means. If you were to run these commands, you would get what might appear to be a bunch of unhelpful data:

```bash
$ pulumi up -v=11 --logtostderr --logflow
I0328 17:44:35.718433   37108 backend.go:409] found username for access token
I0328 17:44:35.719214   37108 api.go:212] Making Pulumi API call: https://api.pulumi.com/api/stacks/.../dev
I0328 17:44:35.719221   37108 api.go:214] Pulumi API call details (https://api.pulumi.com/api/stacks/.../dev): headers=map[Accept:[application/vnd.pulumi+8] Accept-Encoding:[gzip] Authorization:[token ...] Content-Type:[application/json] User-Agent:[pulumi-cli/1 (v3...; ...)]]; body=
I0328 17:44:36.164457   37108 api.go:238] Pulumi API call response code (https://api.pulumi.com/api/stacks/.../dev): 200 OK
I0328 17:44:36.164537   37108 api.go:320] Pulumi API call response body (https://api.pulumi.com/api/stacks/.../dev): {"orgName":"...","projectName":"...","stackName":"...","activeUpdate":"...","tags":{...},"version":...}
I0328 17:44:36.169720   37108 api.go:212] Making Pulumi API call: https://api.pulumi.com/api/stacks/.../dev/export
I0328 17:44:36.169748   37108 api.go:214] Pulumi API call details (https://api.pulumi.com/api/stacks/.../dev/export): headers=map[Accept:[application/vnd.pulumi+8] Accept-Encoding:[gzip] Authorization:[token ...] Content-Type:[application/json] User-Agent:[pulumi-cli/1 (v3...; ...)]]; body=
I0328 17:44:36.315617   37108 api.go:238] Pulumi API call response code (https://api.pulumi.com/api/stacks/.../dev/export): 200 OK
I0328 17:44:36.315709   37108 api.go:320] Pulumi API call response body (https://api.pulumi.com/api/stacks/.../dev/export): {"version":3,"deployment":{"manifest":{"time":"...","magic":"...","version":"v3..."},"secrets_providers":{"type":"service","state":{"url":"https://api.pulumi.com","owner":"...","project":"...","stack":"dev"}}}}
I0328 17:44:36.319427   37108 backend.go:409] found username for access token
Previewing update (dev)
...
```

We can walk through this, though! Like most logging data, there's some initial labels, timestamps, and process data in the beginning of the line. But the part you want to focus on is the part just before that closing bracket (`]`). In this snippet, you can find the calls to various parts of the Pulumi deployment engine, like `backend.go` or `api.go` (and their relevant lines in the code, so [backend.go:409](https://github.com/pulumi/pulumi/blob/master/pkg/backend/httpstate/backend.go#L409) for that first line). The human-readable messages do give some context, as well. You can use this data to understand where we are in the calls that the engine makes. There's also plugins, which are the various providers. You might find `langruntime_plugin.go`, which reports on what the language host is doing, or `eventsink.go`, which shares which events (or actions happening in the system) are occurring when. As plugins are getting installed, you likely will find a bunch of "skipping file in plugin directory" messages if you've been running Pulumi for a bit. That's all of the older versions of plugins in your Pulumi plugin directory being checked and skipped if a newer one is available and required. Eventually, you'll get to a bunch of [gRPC](https://grpc.io/) calls, which are [remote procedure calls](https://en.wikipedia.org/wiki/Remote_procedure_call) that basically provide connecting glue among all of the various subroutines that are running on both the local machine and the remote Pulumi Service.

## Fixing errors

Sometimes, when exploring the diagnostic data, you can find out what's up pretty quickly by checking the last 10 or 20 lines. You always want to check a handful of lines backwards when going through this kind of information because the problem spots will often appear before child processes sending information and shutting down, other processes failing due to dependencies, etc. I often scan a bit up to something that appears familiar, such as a handful of lines I can find in a previous run, and then work my way down from there until I identify a problem spot.

If it's not a problem in your code, however, it can be difficult to track down the error in question since there are so many moving parts. Based on the behavior of the program before it failed, you can track down which part you need to search for. If a provider is failing, for example, I'd check to find out whether the right versions of provider plugins are being installed, which requires searching the data for `plugins.go` or another similar process. If I'm running into an authentication problem, I'll check the `api.go` details and search for anything out of place.

## Submitting bug reports

Sometimes, though, you might not be able to find a clear reason why your program failed. Or you found a line that didn't make sense, and it really does seem like a bug. It happens! All of the detailed logs you were able to gather are useful for us to fix the problem, along with the details on what system you're trying to run on (e.g., Windows 10, a Mac with an M1 chip) and the versions of Pulumi, the provider, and the language host. We'd love to get a bug report if you find something that doesn't make sense, and if you can find the line in the code that you think might be the problem by [exploring the repo](https://github.com/pulumi/pulumi/), even better! We do like getting community pull requests, too (though please keep in mind that some of the codebase is automatically generated, so we might respond with a note to that effect). If you're not sure if it's a bug, you can [open a Discussion](https://github.com/pulumi/pulumi/discussions) or ask when you open the issue.

---

I hope this article helps you get where you need to go when your Pulumi program doesn't stand up quite right! To learn more about troubleshooting Pulumi, [head to the docs]({{< relref "/docs/troubleshooting" >}}), and feel free to [reach out to me on Twitter](https://twitter.com/nimbinatus) to let me know if you found this article helpful!
