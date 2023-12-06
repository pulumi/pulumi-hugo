---
title: What is Platform Engineering?
allow_long_title: true
meta_desc: |
    Understand what platform engineering is, along with the main benefits and importance for modern application development.
type: what-is
page_title: What is Platform Engineering?
---

Platform engineering is a set of modern engineering practices that take a holistic approach to managing the entire software development lifecycle, encompassing infrastructure, tools, and processes. The aim of platform engineering is to provide a platform that supports the development, deployment, and operation of software applications in a standardized and efficient way.

## What is platform engineering?

In a platform engineering approach, one or more teams---often referred to as the platform engineering team or the platform team---build a comprehensive set of shared tools and services (aka "the platform") to help development teams develop, deploy, and operate cloud infrastructure on a self-service basis. This includes cloud infrastructure, container orchestration platforms, databases, networking, monitoring, code repositories, and deployment pipelines.

Platform teams typically adopt a customer-driven mindset where they treat the application developers that they serve as customers that must be understood and won over through products that solve their problems. The products these teams offer are infrastructure tools and building blocks that development teams use to provision and manage standardized infrastructure for their applications and services. Typically, these tools have built-in guardrails that enforce best practices and security standards without impeding developers' agility and workflow.

## What are the key components of platform engineering?

There are three key components of platform engineering:

1. **Infrastructure management**: Platform teams focus on creating tools and solutions to help development teams provision and manage the infrastructure for their applications and services. Self-service is key to scale here, enabling development teams to provision infrastructure themselves according to "golden paths" or patterns established by the platform team.
1. **Automation and tooling**: [Automation](/automation/) is part and parcel of everything the platform engineering team does, through tools like [infrastructure as code (IaC)](/what-is/what-is-infrastructure-as-code/), internal developer portals, shared IaC templates, continuous integration/continuous delivery (CI/CD) pipelines, and even custom CLI tools.
1. **Standardization**: Standardizing the environments development teams use to develop and deploy their applications and services is a key part of a platform engineering team's charter. Part of this standardization effort includes defining and enforcing best practices and security standards (such as by using a [policy as code framework](/crossguard/). Consistency helps reduce downtime and speed problem resolution. Tools like version control, containerization, infrastructure as code, and configuration management are frequently used as part of this effort.

## What are some of the principles behind platform engineering?

There are some simple principles that drive platform engineering teams:

* **Simple and powerful user experience**: Build curated experiences that empower developers by meeting them at their level of expertise, whether it's an abstracted developer portal, custom CLI, or shared IaC templates.
* **Automation as default**: Automation reduces devastating errors. Don't leave anything to ClickOps. Every change to infrastructure must be run through tests before rolling into production. No change should be untraceable. All infrastructure from resources, configurations, environments, and secrets are tracked in version control. Everything from infrastructure provisioning to control plane orchestrations needs to be programmable.
* **Full visibility on everything**: Log, monitor, and observe all infrastructure for greater operational control. Optimize against unnecessary costs.
* **Security as a foundation**: Security and compliance guardrails need to exist for everything. Fine-grained access controls should exist for every piece of infrastructure. Prefer dynamic, short-lived credentials over long-lived, static credentials with seamless integration into development workflows.
* **Well architected by design**: Decouple the application complexity from the infrastructure complexity, reducing the blast radius of incidents while increasing resiliency. Construct shareable infrastructure components that are built for high availability and low operational maintenance. Operate seamlessly across heterogeneous environments while implementing best-in-class infrastructure.

## What is a platform engineer?

_Platform engineer_ is a term used to describe the engineers that make up a platform team or a platform engineering team. Typically, these engineers have the multi-disciplinary skills, experience, and empathy needed to build a great product, serve developers' needs, and "go to market" within their company. Often, they have experience with multiple engineering disciplines like infrastructure or DevOps and software engineering. The reality is that many engineers who perform platform engineering responsibilities do not have the title "platform engineer." In practice they have varying job titles like software engineer, DevOps engineer, SRE, cloud architect, cloud engineer, and more. By providing developers with infrastructure and tooling to deploy and operate their applications efficiently, platform engineers enable developers to focus on building great software.

## Why is platform engineering important?

Developers need infrastructure to run their applications and services. Traditionally, companies have used central infrastructure teams that provision and manage infrastructure on behalf of developers, but this model is prone to bottlenecks as developer requests for infrastructure overwhelm central teams. As modern development teams have taken responsibility over owning and operating their own infrastructure, they also need simple and fast ways of provisioning it while adhering to best practices.

Platform teams solve these challenges:
* The cloud is too complex and unwieldy for most developers to use without abstractions and tooling
* Developers need to know which infrastructure resources to provision
* Developers need an easy way to provision, configure, and manage infrastructure
* Infrastructure provisioned by developers needs to adhere to company best practices

Platform engineering can increase development velocity, improve security, increase infrastructure's adherence to best practices, and reduce operational costs through automation. It helps organizations increase the ROI on cloud investments and improves the software delivery lifecycle so that developers can ship new features faster.

Many companies have already started to create dedicated teams for platform engineering. According to Gartner, by 2026, 80% of software engineering organizations will establish platform teams as internal providers of reusable services, infrastructure components, and tools for application delivery.

## What are the main approaches to platform engineering?

There are three main approaches that platform teams are using to enable developers to self-service infrastructure.

### Infrastructure libraries

Infrastructure libraries express infrastructure resources and configurations in code. These libraries are used to provision infrastructure using an infrastructure as code tool.

### Infrastructure CLIs

Infrastructure CLIs allow developers to provision and manage infrastructure through a familiar command-line interface similar to Heroku.

### Infrastructure platform

These are typically web applications that provide a graphical user interface for developers to provision and manage infrastructure.

## Case studies

### Elkjøp Nordic

<iframe width="560" height="315" src="https://www.youtube.com/embed/aoa_O-rh5KE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Elkjøp Nordic is the leading consumer electronics retailer in the Nordics. The company had a modernization strategy to increase agility of development teams by giving them ownership over their services and the infrastructure that runs them. At the same time, they wanted to create security and compliance guardrails that prevent issues while maintaining developers’ freedom. They accomplished this by building an infrastructure platform application that enabled developers to provision infrastructure running on Kubernetes in Azure. Learn more in the [blog post](/blog/how-elkjop-nordic-enables-developers-to-self-serve-infrastructure/).

### Washington Trust Bank

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q63ZaX340M4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Washington Trust Bank modernized its software development and infrastructure practices since migrating to Azure and adopting infrastructure as code. It enables developers with self-service infrastructure components, prevents developers from deploying forbidden resources with CrossGuard policies, and uses automation to save time and effort.

## Choosing an infrastructure as code framework

Choosing an infrastructure as code framework is an important foundation of a platform engineering strategy because it impacts how infrastructure is modeled, tested, distributed, and deployed across an organization. In particular, the choice of IaC language affects infrastructure's usability, reusability, and capacity for scale. General-purpose languages provide major advantages because they are widely adopted already, have more flexibility and expressiveness than DSLs, and come with rich ecosystems of tools and frameworks that increase productivity. Last but not least, it's much easier for developers to use IaC when it's written in languages they already know.

Pulumi is open-source infrastructure as code in any programming language including TypeScript, Python, Go, C#, Java, and YAML. It supports all major clouds and over 120+ cloud and SaaS providers. [Try it out for free](/docs/get-started/).