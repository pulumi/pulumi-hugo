---
title: "Troubleshooting Builds With Diagnostics"
date: 2022-02-10T12:00:55-06:00
draft: true
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

First, if you don't know how to get diagnostic data from a Pulumi run, our [troubleshooting page]({{< relref "/docs/troubleshooting" >}}) is a good place to start. There's a section specifically on [diagnostics]({{< relref "/docs/troubleshooting#diagnosing-issues" >}}). To get that data, add the `-v` flag with a number representing the logging level you need:

```bash
pulumi up -v=5
```

How do you decide which level to ask for? In the classic style of professionals discussing complex data, it depends. We often encourage people to start at level 9, which gives you almost everything you need. Level 1 can be thought of as equivalent to `CRITICAL` messages only---Red Alert, panic panic panic. Level 9, on the other hand, can be thought of as equivalent to `DEBUG` messages and above---give me all the things. And then, of course, you can turn it to 11, which can be thought of as `TRACE` in many logging paradigms.

Now, that flag only covers what Pulumi's engine is doing. 




https://github.com/pulumi/pulumi/blob/master/pkg/cmd/pulumi/pulumi.go#L181-L182
https://github.com/pulumi/pulumi/blob/master/sdk/go/common/util/logging/log.go


