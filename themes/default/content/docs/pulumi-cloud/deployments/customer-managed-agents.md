---
title: Customer-Managed Agents
title_tag: Get started with Customer-Managed Agents
meta_desc: Customer-Managed Agents allows you to self-host deployment agents and get all the power and flexiblity of Pulumi Deployments in your isolated environments
menu:
  pulumicloud:
    parent: deployments
    weight: 2
---

Customer-managed deployments allow you to self-host deployment agents bringing the same power and flexibility as Pulumi-hosted deployments. Self-hosting your agents comes with many benefits:

- **Host anywhere**: You can host the deployment agents anywhere to manage infrastructure, even within your fully private VPCs
- **Any hardware, any environment<sup>1</sup>**: Run the agents on any hardware of your choice and configure the environment that meets your needs
- **Mix & match**: You can use standard Pulumi-hosted deployments for your development stacks and use self-hosted Customer-Managed Agents for your private network infrastructure. You can mix and match to suit your unique needs
- **Multiple pools**: You can set up multiple deployment agent pools, assign stacks to specific pools, and scale agents dynamically to increase your deployment concurrency. Customers can have up to 150 concurrent deployments
- **Meet compliance**: You can configure the agents with the credentials needed to manage your infrastructure. This way your cloud provider credentials never leave your private network

<sup>1</sup> *Currently Linux and MacOS are supported*

Customer-Managed Agents support all the deployment triggers currently offered by Pulumi Deployments such as click to deploy, the Pulumi Deployments REST API, git push to deploy, Review Stacks, and remote Automation API.

{{% notes "info" %}}
Customer-Managed Agents is available on the Business Critical edition of Pulumi Cloud. [Contact sales](/contact/?form=sales) if you are interested and want to enable Customer-Managed Agents. If you are a self-hosted Pulumi Cloud customer, please [get in touch](https://share.hsforms.com/1YajiJ73sSuGn5RoTkyvKxg2mxud) to be notified when it is available.
{{% /notes %}}

## How to get started

Before you begin, ensure you have installed the [Pulumi Github App](/docs/using-pulumi/continuous-delivery/github-app/) and update the [source control settings](/docs/pulumi-cloud/deployments/get-started). [Docker](https://docs.docker.com/engine/) is a requirement for the agent.

### Install and configure the agent

Go to **Deployment runners** under Organization Settings in the left-hand navigation menu. Once on the Deployment runners page, click on the 'Add a new pool' button. Next, provide a name and description for your agent. You will then get a new access token for the pool, ensure to copy and save the token in a secure location.

{{< video title="Create a new pool" src="../customer-managed-agents-assets/create-new-pool.mp4" autoplay="true" loop="true" >}}

{{< notes type="warning" >}}
If you run into issues, ensure [docker](https://docs.docker.com/engine/install/) is running before you configure and start the agents. Ensure you restart or refresh the shell session (example: `source ~/.zshrc`).
{{< /notes >}}

{{< video title="Configure the agents" src="../customer-managed-agents-assets/configure-agents.mp4" autoplay="true" loop="true" >}}

Now your first agent should be up and running! You can verify the status of the agent by refreshing the page. Additionally, you can use the same token to set up multiple agents to increase concurrency of your deployments and they will be assigned to the same pool.

![Pool Details view](../customer-managed-agents-assets/view-agent-status.png)

Agents poll Pulumi Cloud every 30 seconds to check for pending deployments. In the pool page, you can see the last online status of the agents. Agents will disappear from the list after 1-2 hours of being offline. If you are running the agent inside a firewall ensure to allow outbound requests to api.pulumi.com.

### Configure Stack

Go to deployment settings, found under the settings tab on a stack under 'Deploy'. Scroll down and select the pool you created under the Deployment Runner pool drop-down.

{{< video title="Assign Stack to Deployment Pool" src="../customer-managed-agents-assets/configure-stack.mp4" autoplay="true" loop="true" >}}

Ensure that agents have the cloud provider credentials to be able to deploy in your environments. You have two methods:

1. Use [OpenID Connect (OIDC) to generate credentials](/docs/pulumi-cloud/oidc)
2. Directly provide credentials to agents through environment variables configured in the host, or passing the environment variables when invoking the binary. Example:

   ```bash
   VARIABLE=value customer-managed-deployment-agent run
   ```

   You also need to update the `pulumi-deployment-agent.yaml` configuration file by setting `env_forward_allowlist`. The configuration file can be found in the directory where the agent is extracted. `env_forward_allowlist` expects an array of strings. Example:

    ```yaml
    token: pul-d2d2….
    version: v0.0.5
    env_forward_allowlist:
        - key_one
        - key_two
        - key_three
    ```

### Verify setup

You have completed the setup. Try out the agent by doing `pulumi refresh` through the **Actions** drop-down in your stack page.

{{< video title="Run a deployment on the agent" src="../customer-managed-agents-assets/verify-setup.mp4" autoplay="true" loop="true" >}}

You should see the logs in the agent running on the machine you configured and also in the Pulumi Cloud console.

On the deployments page, you can see all the deployments including pending deployments, and which deployment agents were used in a deployment.

![Deployments page](../customer-managed-agents-assets/view-deployment-status.png)
