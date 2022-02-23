---
title: AKS Hosted Installer
menu:
    userguides:
        parent: self_hosted
        identifier: self_hosted_akshosted_installer
        weight: 7
meta_desc: Installer for deploying the self-hosted Pulumi service in AKS.
---

# AKS-Hosted Installer
The "AKS-hosted" installer is used to deploy the self-hosted Pulumi service in Azure Kubernetes Service (AKS).

## AKS-Hosted Deployment

The AKS-hosted installation of Pulumi deploys the following services:
* Active Directory application
* Virtual Network and Subnets
* Managed MySQL Server and DB for persistent state and automated replication and snapshotting.
* Blob storage for checkpoints and policy packs.

### Pulumi deploying Pulumi
This installer uses Pulumi to deploy the Pulumi service. 
In this case, one uses the pulumi CLI with a self-managed backend (e.g. S3) to deploy all services listed above to stand up the self-hosted Pulumi Service.  
The installation package includes Pulumi project code so that you can deploy the service by running `pulumi up`. 

To this end, you need to set up the following:
* [Download and install the Pulumi CLI]({{<relref "docs/get-started/install">}}) on the docker server. 
* [Login to Azure Blob Storage Backend]({{<relref "docs/intro/concepts/state#logging-into-the-azure-blob-storage-backend">}})

### Deployment Steps
See the README.md file provided with the installer package for detailed deployment steps.

## ECS-Hosted System Management and Maintenance

### Pulumi Service Updates
When deploying the service, it is recommended to pin the Pulumi Service image tag to a specific version. See the installer's README file for how to set the `imageTag` configuration property for the installer to use.

When ready to update the Pulumi Sevice containers to use a different version, do the following:
* `pulumi login` to the self-managed (not self-hosted) backend as chosen above when installing the self-hosted service.
* `pulumi config set imageTag {image tag}` to set the version you want to use.
* `pulumi up` to deploy the updates. 

### Database Maintenance
The installer configures the RDS backend database for replication and checkpointing. So no additional maintenance is needed by the customer.

### Blob Storage Mataintenance
The service automatically creates backups of checkpoint files. However the customer may want to enable automated backup of the blob storage created by the installer.

### Updating the AKS Cluster Kubernetes Version 
Currently, the AKS installer uses kubernetes version 1.19.11. To update to a later version contact the Pulumi support team.


