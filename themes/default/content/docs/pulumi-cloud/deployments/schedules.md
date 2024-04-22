---
title_tag: "Schedules"
meta_desc: Schedule any Pulumi operation to occur at any time.
title: "Schedules"
h1: "Schedules"
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  pulumicloud:
    parent: deployments
    weight: 4
---

Scheduled Deployments in Pulumi Cloud introduce a robust capability to automate cloud operations, enabling precise control over when and how infrastructure updates are applied. This feature is ideal for teams looking to enhance operational efficiency by automating routine tasks and ensuring that changes are made during optimal times, such as off-peak hours or predetermined maintenance windows.

Users can easily define schedules for any stack with Pulumi Deployments configured, using cron expressions to specify exact times for operations. This granular level of control allows for precise management of infrastructure tasks, accommodating complex scheduling needs. Scheduled Deployments build upon the existing infrastructure provided by Pulumi Deployments, enhancing it with the flexibility to manage deployment timing extensively. This means Pulumi Deployments concurrency limits apply to scheduled deployments and pausing deployments on a stack will queue scheduled deployments as well.

## Setting a Time-to-Live on a Stack

### Pulumi Cloud UI

### REST API

### Pulumi Cloud Service provider
