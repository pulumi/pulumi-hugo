---
title: What are CircleCI secrets?
meta_desc: |
     Learn more about what CircleCI Secrets are and how to use them.

type: what-is
page_title: "What are CircleCI secrets?"
---

[CircleCI](https://circleci.com/) is an agile Continuous Integration/Continuous Deployment (CI/CD) platform. It aims to automate software development processes for faster, reliable releases. CircleCI Secrets empower developers to safeguard critical data while streamlining workflows.

## What are CircleCI secrets?

CircleCI secrets are a secure and efficient means of managing sensitive data within your CI/CD pipelines. These secrets encompass API keys, passwords, and other confidential data crucial for the successful execution of your build and deployment processes.

### Key features

- **Enhanced security:** provides a secure vault to store and manage sensitive data, reducing the risk of exposure and unauthorized access.
- **Simplified configuration:**  centralizes your configuration files, eliminating the need to embed sensitive details directly into your codebase. This not only streamlines your configuration process but also enhances code maintainability.
- **Effortless integration:** integrates into existing CI/CD workflows. The straightforward implementation ensures a smooth transition, minimizing disruption to development pipelines.
- **Version control integration:** integrates with version control systems, allowing you to maintain version history for your configuration files without exposing sensitive data.
- **Dynamic environment variables:** reference as environment variables. This flexibility enables you to adapt your processes to different environments and scenarios effortlessly.

## Getting Started with CircleCI Secrets

### Define circleCI secrets via the CLI

Visit the [official installation page](https://circleci.com/docs/local-cli/) to complete the CLI Installation. Then, define a secret via the CLI as follows:

```bash
$ circleci api create-secret MY_PROJECT_NAME MY_ENV_VAR_NAME
```

### Configure workflows with secrets

Integrate CircleCI secrets into your workflows by referencing them in your configuration files. This step ensures that your sensitive data remains secure while being accessible during the execution of CI/CD pipelines. For example, let's assume you have a secret named `API_KEY` that you've defined for your CircleCI project. In your `.circleci/config.yml` file, you can reference this secret within your workflow steps:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: circleci/python:3.8

    steps:
      - checkout

      # Your build steps here...

workflows:
  version: 2
  build_and_deploy:
    jobs:
      - build

      # Deploy step that uses the secret
      - deploy:
          name: Deploy to Production
          command: |
            echo "Deploying to production..."
            # Use the API_KEY secret in your deployment script or command
            ./deploy_script.sh $API_KEY
```

In this example:

- The `build` job is defined with its necessary steps.
- The `build_and_deploy` workflow is defined, including the `build` job.
- A subsequent job, named deploy, is included in the workflow. This job may represent the deployment step of your CI/CD process.
- Inside the `deploy` job, you can reference the `API_KEY` secret by using the `$API_KEY` syntax. This allows you to securely pass the secret value to your deployment script or command.

Remember to adjust the job names, workflow structure, and secret references according to your specific project requirements. This example demonstrates the basic concept of integrating a CircleCI secret into your workflow by referencing it in the configuration file.

### Reference secrets in CircleCI jobs

Leverage CircleCI secrets within your jobs, allowing your pipeline to access confidential data without exposing it directly in your code.

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: circleci/python:3.8

    steps:
      - checkout

      # Your build steps here...

  test:
    docker:
      - image: circleci/node:18

    steps:
      - checkout

      # Your test steps here...

  deploy:
    docker:
      - image: circleci/python:3.8

    steps:
      - checkout

      # Deploy step that uses the secret
      - run:
          name: Deploy to Production
          command: |
            echo "Deploying to production..."
            # Use the API_KEY secret in your deployment script or command
            ./deploy_script.sh $API_KEY

workflows:
  version: 2
  build_and_deploy:
    jobs:
      - build
      - test
      - deploy:
          # Specify the API_KEY secret for the deploy job
          secrets:
            - API_KEY
```

In this extended example:

1. Three jobs are defined: `build`, `test`, and `deploy`.
2. The `deploy` job includes a deploy step that uses the `$API_KEY` secret. The secret is accessed securely without exposing its actual value in the configuration file.
3. The `build_and_deploy` workflow is defined to execute the `build`, `test`, and `deploy` jobs in sequence.
4. The `deploy` job is specified to use the `API_KEY` secret, ensuring that the secret is available for this specific job in the workflow.

This example illustrates how CircleCI secrets can be leveraged within jobs to securely access confidential data during different stages of your CI/CD pipeline. The secret is referenced in the job configuration without exposing its actual value in the code, enhancing security and maintaining best practices for sensitive information handling.

### Enhance security policies

Set up fine-grained access controls and permissions to ensure that only authorized personnel can manage and utilize CircleCI secrets. CircleCI provides a way to set up fine-grained access controls and permissions using their Contexts feature. Contexts allow you to manage and share environment variables, including secrets, among your projects. Here's an example of how you can set up access controls for CircleCI secrets:

Assuming you have a context named `production`:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: circleci/python:3.8

    steps:
      - checkout

      # Your build steps here...

workflows:
  version: 2
  build_workflow:
    jobs:
      - build:
          context: production
```

In this example:

1. A job named `build` is defined, which uses the `production` context.
2. The `production` context is a place where you can store environment variables, including secrets like `API_KEY`.
3. Access controls and permissions for the `production` context can be managed through the CircleCI web interface.

To set up fine-grained access controls:

1. **Navigate to the CircleCI web interface.**
2. **Go to the "Settings" page for your project.**
3. **Select "Contexts" from the sidebar.**
4. **Click on the `production` context.**
5. **Manage access controls and permissions for team members or specific roles.**

By following these steps, you ensure that only authorized personnel with the appropriate permissions can manage and utilize CircleCI secrets within the specified context. This approach enhances security by restricting access to sensitive information and maintaining a clear separation of concerns within your CI/CD pipeline.

### Challenges and Considerations

Using CircleCI secrets comes with certain challenges and considerations that organizations should be aware of to ensure a secure and efficient CI/CD pipeline. Here are three key challenges:

1. **Management of Secrets Overhead:**
   - *Challenge:* As the number of secrets and contexts grows, managing them effectively can become challenging. Teams need to keep track of which secrets are used where and by whom.
   - *Consideration:* Establish clear naming conventions and documentation for secrets and contexts. Regularly review and audit secrets to ensure they are up-to-date and properly managed. Consider automating the rotation process to reduce the manual effort required.

2. **Access Control Complexity:**
   - *Challenge:* Setting up fine-grained access controls is crucial, but it can become complex as teams and projects scale. Defining and maintaining access permissions for different roles and responsibilities can be challenging.
   - *Consideration:* Regularly review and update access controls as team structures evolve. Clearly define roles and responsibilities to determine who needs access to specific secrets. Consider using role-based access control (RBAC) principles to simplify and organize permissions.

3. **Integration with External Secret Management Systems:**
   - *Challenge:* Organizations may already have established processes for secrets management using external tools, and integrating these with CircleCI secrets can be complex.
   - *Consideration:* Evaluate whether integrating with an external secrets management system is necessary for your organization. If required, explore solutions that seamlessly integrate with CircleCI and provide a unified approach to secrets management. Ensure that the chosen solution aligns with your security and compliance requirements.

Addressing these challenges and considerations requires a thoughtful approach to secrets management, clear communication within the development team, and a commitment to maintaining security best practices throughout the CI/CD pipeline. Regular reviews and updates to your secret management strategy will help ensure a secure and efficient development process.

### Best Practices

Here are five best practices for managing CircleCI secrets:

- **Context-Based management:**  Organize your secrets using [Contexts](https://circleci.com/docs/contexts/) in CircleCI. Group related secrets together in a context, making it easier to manage access controls and permissions. This practice ensures that only authorized personnel have access to specific sets of secrets based on their roles or responsibilities.
- **Fine-Grained access controls:**  Set up fine-grained access controls and permissions for each context to restrict who can manage and utilize the secrets within that context. By carefully assigning permissions, you reduce the risk of unauthorized access to sensitive information, enhancing the overall security of your CI/CD process.
- **Avoid hardcoding secrets in configuration files:**  Refrain from hardcoding secret values directly in your configuration files. Instead, reference secrets using the `$SECRET_NAME` syntax. This approach keeps sensitive information separate from the codebase, minimizing the risk of accidental exposure and making it easier to update or rotate secrets without modifying the code.
- **Rotate secrets:** Implement a regular rotation schedule for your secrets, especially for long-lived API keys or credentials. CircleCI provides an easy way to update secrets without modifying the configuration files. Regularly rotating secrets helps mitigate the impact of potential security breaches and ensures that compromised credentials are promptly replaced.
- **Auditing and monitoring:** Implement auditing and monitoring mechanisms to track changes and usage of secrets within your CI/CD pipeline. CircleCI provides tools and logs that enable you to monitor when and how secrets are accessed. Regularly review these logs to identify any suspicious activities and promptly address potential security incidents.

Check out [more security recommendations](https://circleci.com/docs/security-recommendations/) provided by CircleCI.

## Conclusion

CircleCI secrets are pivotal in fortifying your CI/CD pipelines, combining security with efficiency. By seamlessly integrating sensitive data into your workflows, you can ensure the confidentiality of critical data while optimizing your development processes.

Now that you're equipped with the knowledge of CircleCI secrets, take your cloud infrastructure management to the next level with Pulumi. Discover how to efficiently manage sensitive data and secrets in your cloud applications. Dive into Pulumi's [Secrets Management guide](/blog/managing-secrets-with-pulumi/) for in-depth information on encrypting specific values for added security and ensuring that these values never appear in plain text in your state file​.

Our [community on Slack](https://slack.pulumi.com/) is always open for discussions, questions, and sharing experiences. Join us there and become part of our growing community of cloud professionals!
