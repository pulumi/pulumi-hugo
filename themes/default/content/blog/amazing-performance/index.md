---
title: "Amazing Performance"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-12-01T09:04:21-05:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: "Introducing the Amazing Performance initiative, and an overview of performance tooling we've developed for Pulumi."

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - robbie-mckinstry

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - performance
    - platform
    - engineering

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

*Amazing Performance* is an initiative we've begun to improve the throughput and latency of the Pulumi CLI, not just for power users but for as many users as possible. By the end of June 2022, we had assembled a list of high-value improvements which require a sizable investment, along with low-hanging fruit. The complete list, including the items we have yet to tackle, is contained in [a tracking issue on GitHub](https://github.com/pulumi/home/issues/1499), but this series will cover the highlights. This post describes how we've done performance tracking in the past. Toward the end, we also cover a few miscellaneous improvements.

<!--more-->

Over the last six months at Pulumi, the Platform Team has been working on a project we call "Amazing Performance." *Amazing Performance* is an initiative we've begun to improve the throughput and latency of the Pulumi CLI, not just for power users, but for as many users as possible. By the end of June 2022, we had assembled a list of high-value improvements which require a sizable investment, along with low-hanging fruit. The complete list, including the items we have yet to tackle, is contained in [a tracking issue on GitHub](https://github.com/pulumi/home/issues/1499), but this series will cover the highlights.

This post describes how we've done performance tracking in the past. Toward the end, we also cover a few miscellaneous improvements. Future posts describe in depth the major wins we've had as part of the *Amazing Performance* initiative. 



## Tools We've Already Built



The *Amazing Performance* initiative didn't come from a vacuum. We've been working to understand and improve the performance of the Pulumi CLI for years now. A lot of the earlier effort has been focused on gaining performance insights – building an understanding of where our performance pains were the sharpest. The two most impactful tools at our disposal for understanding performance pains are our analytics dashboard and our OpenTracing support.

**Analytics Dashboard:** We've built an analytics dashboard and monitoring system to let us know when performance dips. This system has three components: a suite of benchmarks, a data warehouse for analytics, and an alerting system.

<Insert Graphic with the System Architecture>

We've written a suite of benchmarks measuring different performance characteristics of the CLI. Each benchmark answers a simple question like "how long does the CLI take to run `up` when the plan has no changes?" or "how long does the CLI take to run an empty plan?" In addition to these simple questions, we also have a few benchmarks to stress test creating many resources. Each of these benchmarks is implemented in Go, JavaScript, TypeScript, C#, and Python (with YAML and Java forthcoming). Each night, we exercise the benchmarks, capturing samples. Once execution is complete, the results are uploaded to a serverless function which stores them in our data warehouse.

<Insert Graphic Showing Dashboard from Metabase>

We've written blog posts in the past about how we use Metabase to visualize queries in our datawarehouse. Our performance data is no different. Any employee can log into Metabase and view our performance dashboard, which charts the nightly data as a line graph. This allows us to identify any performance dips visually. Sometimes the data from our nightly runs are noisy. In the absence of noise, the line graph allows us to pinpoint the day the regression was introduced so we can leaf through the pull requests merged that day. More often, there's enough noise in the data that we have to look through a couple of days to find the regression.

Shortly after shipping the performance dashboard internally, we used the initial numbers we observed to establish a service-level objective (SLO) for performance for each of the language benchmarks. The intention of this SLO was to ensure that we set a "do not breach" expectation across the team, ensuring all team-members where alerted of major regressions, or creeping regressions, that pushed slowness beyond an acceptable level. One objective we had for the *Amazing Performance* initiative was to keep the "do not breach" SLO by the end of Q3 2022, which we were able to achieve.

Each night, when new benchmark data is collected, if one or more benchmarks violate our SLOs, then a Slackbot sends a message with the list of breaches, including the language and program name. It also displays the SLO threshold and the observed value.

![](/Users/robbiemckinstry/workspace/pulumi/pulumi-hugo/themes/default/content/blog/amazing-performance/metabot.jpg)





Lastly, as part of *Amazing Performance*, we established the accuracy of these benchmarks by demonstrating the values observed in our nightly cron are comparable to the values we see on our local laptops, meaning our nightly analysis is a good predictor of actual developer experience. 

#### Tracing Support

<Insert Graphic Showing Pulumi Traces>

If you ever encounter a particularly slow program, and want to know what exactly is taking so long, you can use [Pulumi's tracing support](https://www.pulumi.com/docs/support/troubleshooting/#tracing) to look into the details. When run with the `--tracing` flag, Pulumi will capture a trace of the program's execution, giving you an idea of where time is spent. 

Pulumi can send traces to a Zipkin server, or aggregate them to a local file and let you view them offline. If you provide an HTTP URI with the `--tracing` flag, then Pulumi assumes that URI points to a webserver that accepts Zipkin-format traces, and will send all tracing data there. If you provide a file URI instead, Pulumi spins up a local Zipkin server so child processes can send there data somewhere. Once execution is complete, Pulumi aggregates the traces into a single file, and spins down the Zipkin server. The file is stored locally. You can run `PULUMI_DEBUG_COMMANDS=1 pulumi view-trace ./up.trace` to view the trace. 

Right now, not all spans are exceptionally well-named, and there are definitely blind-spots in our traces. However, traces are typically a pretty good way to subdivide the program execution so hotspots are easily identifiable. We still have some work to do.

### Skipping a Slow Import

One theme you might notice is that a number of performance improvements were made for the NodeJS runtime. Part of the reason we focused on TypeScript is because about 40% of Pulumi programs are written for NodeJS, more than any other language, so improving NodeJS performance benefits more users than any other language. The primary reason we targeted NodeJS, however, is because NodeJS had the most well-understood performance issues that promised the largest returns.

For example, we noticed JavaScript programs were importing the `typescript` even when it was unused. Users might hit this issue if they were using pure JavaScript to write their Pulumi programs. Additionally, one pattern many of our more experienced TypeScript user employ when using Pulumi in CI environments to typecheck their code prior to execution. Some users will enforce typechecking during pull requests to guarantee all code hitting the main branch of the repository is valid. Once it's typechecked, they can precompile the TypeScript into JavaScript before execution. When it comes time to execute their Pulumi program, they executing the compiled JavaScript, which they know to be well-typed. The motivation for precompiling comes from using your own preprocessor. Pulumi uses ts-node to transpiler TypeScript to JavaScript on the fly, but some customers prefer to use SWC, ESBuild, or other options for increased performance.

In both of these scenarios, importing `typescript` when it's not used results in a 300ms slowdown.

### Renewing a Fresh Lease

https://github.com/pulumi/pulumi/pull/10462

One low-hanging fruit bug, which introduces a nice quality of life improvement, involving the renewal of a new lease. When the Pulumi CLI is invoked using the Service backend, user credentials are exchanged with the service for a short-lived access token. This access token is valid for a particular amount of time called a lease. A lease can be renewed, but the CLI has to explicitly ask the Service to renew it to extend the duration for which it is valid. That way, once the lease expires, the token is no longer valid, effectively revoking it. 

We noticed that this access token was renewed almost immediately after it was first created. The HTTP call that the CLI performed blocked further execution until the renewal was complete, introducing an unnecessary slowdown of 120ms. The fix was to remove this renewal from the critical path (unfortunately, we couldn't skip the renewal entirely for reasons that aren't relevant here). By starting the renewal on a background thread, and only blocking if the token is needed but not renewed, we've eliminated the 120ms slowdown.

Since this bug effects anyone using the Pulumi Service backend, most users will benefit from this improvement. It's small, [but it's noticeable](https://link.springer.com/chapter/10.1007/978-3-319-58475-1_4) to most users. Program startup will feel slightly more snappy.
