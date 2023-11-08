---
title_tag: Modernizing Manufacturing with 4IR and Pulumi | Case Studies
title: "Case Study: Modernizing Manufacturing with 4IR and Pulumi"
description: |
    Learn how 4IR worked with Pulumi to cut deployment time from days to hours and saved $75k annually on outsourcing costs.
    
meta_desc: Learn how 4IR worked with Pulumi to cut deployment time from days to hours and saved $75k annually on outsourcing costs.

customer_name: 4IR
customer_logo: /logos/customers/4ir.png
customer_url: https://www.4ir.cloud/

hide_pulumi_footer: true

---

> ***“Pulumi has emerged as a key element in our strategy, creating tangible value for us by reducing infrastructure deployment time, up-skilling our team, and accelerating our time to market.”*** - *Joseph Dolivo, CTO, 4IR Solutions*

##### Learn how 4IR leveraged Pulumi to:

- Cut deployment time from days to hours
- Bring IaC in-house, saving $75,000/year on outsourcing costs
- Deliver an MVP 4 weeks earlier

## Background

While technology and IT companies have been benefiting from cloud and "cloud-adjacent" technologies for years, other industries like Manufacturing have typically been left behind.

Industry veterans have witnessed an "IT-OT convergence," with manufacturers integrating IT technologies like Ethernet cables and IP-based protocols into traditional OT (Operational Technology) systems on factory floors. This shift has extended more slowly to software, where Windows still dominates. However, spurred in part by a global pandemic and leadership’s desire for remote monitoring, manufacturers are advancing their digital transformations, urging suppliers to adopt modern, open technologies based on Linux and containers that feature mobile-responsive web interfaces and integrated support for version control systems like Git.

While the interest is finally there, the skill gap remains; [4IR Solutions](https://www.4ir.cloud/) was started with the vision of filling this gap by using tools and best practices from the IT industry to operate OT infrastructure for manufacturers at scale. With its FactoryStack™ and PharmaStack™ products, 4IR offers infrastructure and "DevOps-as-a-Service" to manufacturers, taking care of both provisioning and "Day 2" operations like backups, upgrades, security, secrets management, and CI/CD pipelines for OT software.

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-factorystack.png" alt="FactoryStack architecture diagram">

## Selecting Pulumi and its Business Impact

Prior to starting development, 4IR looked at the existing landscape of Infrastructure as Code (IaC) tools. The 4IR engineering team considered Terraform, but as a team of programmers, they were not excited to learn a new configuration language that relied on quirky workarounds for common programming constructs like loops. They also looked at Ansible, which seemed better suited for configuration management, and CloudFormation, which had a reliance on AWS.

4IR eventually discovered Pulumi via Hacker News. By offering support for TypeScript and its vast ecosystem, Pulumi enabled 4IR’s experienced programmers to hit the ground running on day one. Pulumi Cloud's free tier made it easy to get started, and since Pulumi fully embraces open source and offers support for self-hosted backends, the 4IR engineering team wasn’t worried about being locked into a proprietary platform with expensive monthly bills as they scale.

Pulumi quickly became a fan-favorite within 4IR’s engineering team and offered immediate business value:

- **Deployment time** for customer infrastructure **was cut from days to hours** thanks to Pulumi-powered automation.
- 4IR brought Infrastructure as Code in-house, **up-skilling their team and saving an estimated $75,000 per year** on outsourcing costs.
- 4IR **delivered an MVP four weeks earlier** due to its engineers not having to learn a new configuration language and toolset.

### MVP with Pulumi

4IR's initial MVP release was built on AWS, using the ECS module provided by Pulumi's AWS Classic package. However, 4IR's customer base grew to attract larger Manufacturers, many of whom had existing relationships (and cloud spend agreements) with Microsoft Azure.

To support these larger customers, the 4IR engineering team needed to pivot their solution to support multiple clouds and chose Kubernetes to do so.

### Going Multi-Cloud with Kubernetes

Adopting Kubernetes is not a decision to take lightly. Although the cloud provider-managed offerings like AKS and EKS reduce the required maintenance considerably, Kubernetes is a large ecosystem and requires specialized skill sets.

4IR created three projects. The first project is the Kubernetes application layer, which uses Pulumi's Kubernetes provider. This layer is agnostic to the cloud it runs on. The second layer is the AWS layer which is running AWS-specific services, such as VPCs, EKS, and PostgreSQL on RDS. The third layer is the Azure Native layer which is running Azure-specific services, including VNETs, AKS, and Azure Database for PostgreSQL. The AWS and Azure layers run the core compute, database, and networking infrastructure primitives, while the app layer can run across both Azure and AWS.

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-multicloud.png" alt="Multi-cloud architecture diagram with Apps on Azure Native and AWS Classic">

### Supporting Hybrid Cloud with Components

Manufacturers in several industries like Pharmaceuticals and Nuclear have strict data sovereignty/residency requirements. These requirements can sometimes be met by limiting deployments to certain cloud regions, but many manufacturers insist that their critical workloads all be run on premise.

4IR discovered that to operate on premise, certain cloud-native applications like managed databases, were no longer available to them. This meant that they would need a way to selectively deploy parts of the infrastructure depending on the hosting environment.

Pulumi's Component Resources turned out to be the perfect solution.

4IR created a new "Components" Pulumi Project that the other Projects would selectively import from, depending on the environment into which they were deployed. Since 4IR’s engineering  team was using TypeScript, they used an internal npm repository to store these packages.

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-pulumi-components.png" alt="Architecture diagram using Pulumi Components">

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-react-code-sample.png" alt="Code snippet for FactoryStack Designer React application">

***“We also created a front-end React application we coined FactoryStack™ Designer that provides a "drag-and-drop" interface to configure a customer's environment,”*** shared Joseph Dolivo, CTO of 4IR. ***“The application, like our Pulumi code, is written in TypeScript. It is thus able to import Interfaces from our Pulumi Components project to keep the front-end in sync with our Pulumi code. In the future, we plan for this application to more seamlessly integrate with Pulumi via the [Automation API](/docs/using-pulumi/automation-api/),”*** said Dolivo.

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-designer-screenshot-1.png" alt="Screenshot of FactoryStack Designer showing drag and drop interface">

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-designer-screenshot-2.png" alt="Screenshot of FactoryStack Designer showing configuration">

<img class="block mx-auto md:max-w-4xl my-8"
src="/images/case-studies/4ir-configuration-interface.png" alt="Code snippet of the FactoryStack Designer configuration interface in TypeScript">

### Over the Edge

In some cases, Manufacturers may not have a need (or the budget) for a hybrid cloud solution, or they may be in regions of the world where Internet access can be limited or spotty. 4IR always expects that some hardware needs to exist on-site to allow control of equipment and buffering of data when connectivity goes down, but aside from the aforementioned hybrid cloud solutions, 4IR always had to push off the management of this hardware to the end user and "pick it back up" at the cloud level.

The next frontier for 4IR is tackling fleet management of lower-end hardware. A number of tools exist that can perform remote updates and deployments of containerized applications to the edge, usually by targeting the container runtime directly. While Dolivo’s engineering team is still evaluating tools, they already know Pulumi's Docker package will [help solve their problem](/blog/pulumi-and-docker-development-to-production/).

## Summary

Pulumi has taken 4IR all the way from prototype to production, with multiple pivots along the way. “Pulumi has emerged as a key element in our strategy, creating tangible value for us by reducing infrastructure deployment time, up-skilling our team, and accelerating our time to market,” said Dolivo.

While the Infrastructure as Code landscape continues to evolve, Pulumi's recent [re-commitment to open source](/blog/pulumi-hearts-opensource/) gives Dolivo and his team confidence that they have selected the right technology partner to carry them through to their next big milestone – and beyond.
