---
title: "Time-to-Live Stacks: Auto-Destroying Stacks"
allow_long_title: True
date: 2024-04-24
draft: false
meta_desc: Explore Pulumi Cloud's new Time-to-Live Stacks feature, designed to help teams manage infrastructure lifecycles and control cloud costs by automatically decommissioning stacks and resources.
meta_image: meta.png
authors:
    - meagan-cojocar
tags:
    - features
---

## Time-to-Live Stacks: Managing Infrastructure Lifecycles Automatically

In the dynamic landscape of cloud-based software development, platform teams face the continuous challenge of balancing the need for innovation with the imperative to control cloud costs and security. Pulumi Cloud's new Time-to-Live (TTL) Stacks feature directly addresses this challenge by empowering teams to manage infrastructure lifecycles automatically, mitigating the risks associated with stale infrastructure and resource costs ballooning.

Creating temporary environments for development, testing, or staging is a common practice in the lifecycle of software development. These environments are crucial for running experiments, testing new features, and ensuring that everything works smoothly before going live. However, these environments often don't get decommissioned properly and linger, forgotten, consuming resources and adding unnecessary costs to your cloud bill.

Furthermore, managing these temporary stacks usually requires manual oversight, adding to the operational burden of your team. They need to track which environments are active, which are outdated, and manually shut them down to avoid security risks from idle and unmonitored resources. This process is not only time-consuming but also prone to human error, leading to either premature deletion of necessary resources or overlooked environments that pose security risks.

### Simplifying Stack Management with Time-to-Live Stacks

The Time-to-Live Stacks feature in Pulumi Cloud is designed to solve these pain points by allowing teams to set a predefined lifespan on any stack directly in Pulumi Cloud. After the specified time, these stacks are automatically destroyed, and using the optional "delete after destroy" setting, they are also removed from Pulumi Cloud entirely. This setting plays a pivotal role by not just destroying the resources but also cleaning up by deleting the stack itself after all resources have been terminated, ensuring that no residual artifacts are left behind. This maintains a clean state in the cloud environment and further reduces costs by reducing clutter.

### Key Benefits of TTL Stacks

- **Cost Control:** Automatically terminate stacks that are no longer needed, helping to avoid overspending on cloud resources that are not in active use.
- **Developer Enablement:** Provides developers the flexibility to quickly spin up and test application changes in sandbox environments without worrying about the cleanup.
- **Operational Efficiency:** Reduces the administrative burden of manually tracking and decommissioning temporary or outdated stacks, allowing teams to focus on more strategic tasks.
- **Enhanced Security:** Automatically removing unused or neglected stacks helps ensure compliance and reduces the potential attack surface, making your infrastructure safer.

## Getting Started with TTL Stacks

### Setting it up in the UI

Ensure Deployments Settings are configured on the stack. Navigate to the Stack > Settings > Schedules, click on Time-to-Live, turn on "Delete After Destroy" if applicable, set the destroy timestamp, and save the schedule.

### Setting it up via the API

For those who prefer to automate and script their infrastructure tasks, Time-to-Live schedules can be configured programmatically using simple HTTP requests:

  ```bash
  curl -H "Accept: application/vnd.pulumi+json" \
       -H "Content-Type: application/json" \
       -H "Authorization: token $PULUMI_ACCESS_TOKEN" \
       --request POST \
       --data '{"timestamp":"2024-12-31T23:59:59Z","deleteAfterDestroy":true}' \
       https://api.pulumi.com/api/stacks/{organization}/{project}/{stack}/deployments/ttl/schedules
```

### Setting it up via the Pulumi Service Provider

