---
title: Customer-Managed Deployment Agents
title_tag: Get started with Customer-Managed Deployment Agents
meta_desc: Here is a placeholder meta description of between 50 and 150 characters.
menu:
  pulumicloud:
    parent: deployments
    weight: 2
---

Customer-managed deployments allow you to self-host deployment agents bringing the same power and flexibility as Pulumi-hosted deployments. Self-hosting your agents comes with many benefits:

- **Host anywhere**: You can host the deployment agents anywhere to manage infrastructure, even within your fully private VPCs
- **Any hardware, any environment<sup>1</sup>**: Run the agents on any hardware of your choice and configure the environment that meets your needs
- **Mix & Match**: You can use standard Pulumi-hosted deployments for your development and public stacks, and use self-hosted Customer-Managed Agents for your private network infrastructure. You can mix and match to suit your unique needs
- **Multiple pools**: You can set up multiple deployment agent pools, assign stacks to specific pools, and scale agents dynamically to increase your deployment concurrency. Customers can have up to 150 concurrent deployments
- **Meet Compliance**: You can configure the agents with the credentials needed to manage your infrastructure. This way your cloud provider credentials never leave your private network

<sup>1</sup> *Currently Linux and MacOS are supported*

{{% notes "info" %}}
Customer-managed deployment agents are available to business-critical customers. Contact sales if you are interested and want to enable customer-managed deployments.
{{% /notes %}}

Before you begin, ensure you have installed [Pulumi Github App](/docs/using-pulumi/continuous-delivery/github-app/) and update the [source control settings](/docs/pulumi-cloud/deployments/get-started/#:~:text=Fill%20out%20the%20Source%20control%20settings). [Docker](https://docs.docker.com/engine/) is a requirement for the agent.

## How to install and configure the agent

Go to **Deployment runners** under settings and click on Add a new pool. Provide a name and description. You will get a new access token for the pool. Ensure to copy and save the token in a secure location.

{{< video title="Install the agents" src="../customer-managed-deployment-agents-assets/install-the-agents.mp4" autoplay="true" loop="true" >}}

{{< notes type="warning" >}}
If you run into issues, ensure docker is running before you configure and start the agents. ensure you restart or refresh the shell session (example: `source ~/.zshrc`).
{{< /notes >}}

{{< video title="Configure the agents" src="../customer-managed-deployment-agents-assets/configure-the-agents.mp4" autoplay="true" loop="true" >}}

Now your first agent should be up and running. You can verify the status of the agent by refreshing the page. Additionally, you can use the same token to set up multiple agents to increase concurrency of your deployments and they will be assigned to the same pool.

![Pool Details view](../customer-managed-deployment-agents-assets/view-agent-status.png)

Agents poll Pulumi Cloud every 30 seconds to see if there are any pending deployments. In the pool page, you can see the last online status of the agents. Agents will disappear from the list after 1-2 hours of being offline. If you are running the agent inside a firewall ensure to allow outbound requests to api.pulumi.com.

## Configuring Stack

Go to the deployment setting found under the settings page of a stack. Scroll down and select the pool you created under the Deployment Runner pool drop-down.

{{< video title="Assign Stack to Deployment Pool" src="../customer-managed-deployment-agents-assets/configure-the-stack.mp4" autoplay="true" loop="true" >}}

Ensure that agents have the cloud provider credentials to be able to deploy in your environments. You have two methods:

1. Use the [OIDC configuration](https://www.pulumi.com/docs/pulumi-cloud/oidc/).
2. Directly provide credentials to agents through environment variables configured in the host, or passing the environment variables when invoking the binary. Example:

   ```bash
   VARIABLE=value customer-managed-deployment-agent run
   ```

   You also need to update the `pulumi-deployment-agent.yaml` configuration file by setting `env_forward_allowlist`. The configuration file can be found in the directory where the agent is extracted. `env_forward_allowlist`` expects an array of strings. Example:

    ```yaml
    token: pul-d2d2….
    version: v0.0.5
    env_forward_allowlist:
        - key_one
        - key_two
        - key_three
    ```

## Verify setup

You have completed the setup. Try out the agent by doing `Pulumi Refresh` through the **Actions** option drop-down in your stack page.

{{< video title="Run a deployment on the agent" src="../customer-managed-deployment-agents-assets/verify-complete-setup.mp4" autoplay="true" loop="true" >}}

You should see the logs in the agent running on the machine you configured and also on the Pulumi console.

On the deployments page, you can see all the deployments including pending deployments, and which deployment agents were used in a deployment.

![Deployments page](../customer-managed-deployment-agents-assets/view-deployments-status.png)
