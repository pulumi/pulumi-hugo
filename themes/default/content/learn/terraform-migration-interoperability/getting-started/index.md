---
title: "Getting Started"
layout: topic
date: 2022-06-03T11:31:57-05:00
draft: false
description: Explore the HCL domain-specific language.
meta_desc: Explore the HCL domain-specific language.
index: 0
estimated_time: 2
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - terraform
---

Infrastructure as code, as a concept, has been around for a while. We as a community have created many tools and ecosystems to build infrastructure in a reusable, repeatable, and reliable manner, and Terraform is one of those tools. For one reason or another, you've decided to either run Pulumi alongside a Terraform build or you've decided to replace Terraform with Pulumi all together in your stack. This pathway is a practical walkthrough of what you need to know to bring Pulumi into your existing Terraform-based ecosystem.

## Starting with HCL2

Let's pretend that, in our fictional Pulumipus Boba Tea Shop company, we have some infrastructure that started out as a Terraform build. In fact, here's a small snippet of that code:

```hcl {.line-numbers}
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "backend" {
  name         = "pulumi/tutorial-pulumi-fundamentals-backend:latest"
  keep_locally = false
}

resource "docker_image" "frontend" {
  name         = "pulumi/tutorial-pulumi-fundamentals-frontend:latest"
  keep_locally = false
}

resource "docker_image" "mongo" {
  name         = "pulumi/tutorial-pulumi-fundamentals-database-local:latest"
  keep_locally = false
}

resource "docker_network" "network" {
  name = "services-dev"
}

resource "docker_container" "mongo-container" {
  image = docker_image.mongo.latest
  name  = "mongo-dev"
  ports {
    internal = 27017
    external = 27017
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["mongo"]
  }
}

resource "docker_container" "backend-container" {
  image = docker_image.backend.latest
  name  = "backend-dev"
  env   = [
    "DATABASE_HOST=mongodb://mongo:27017",
    "DATABASE_NAME=cart",
    "NODE_ENV=development"
  ]
  ports {
    internal = 3000
    external = 3000
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["backend-dev"]
  }
}

resource "docker_container" "frontend-container" {
  image = docker_image.frontend.latest
  name  = "frontend-dev"
  env   = [
    "LISTEN_PORT=3001",
    "HTTP_PROXY=backend-dev:3000",
    "PROXY_PROTOCOL=http://"
  ]
  ports {
    internal = 3001
    external = 3001
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["frontend-dev"]
  }
}
```

This code is written in a domain-specific language (DSL) called Hashicorp Configuration Language (HCL), specifically HCL2. For this pathway, we expect that you know and have used Terraform before, so we won't get down into the details. We do need to use this sample to get a Terraform state file and some deployed resources for later, though. To that end, use this example (or the example of your choice!) to run a `terraform plan` and then `terraform apply` to get a `.tfstate` file and stand up the resources (you'll need Docker running!). Remember where you have that file for later.

For reference, here it is:

```json
{
  "version": 4,
  "terraform_version": "1.2.2",
  "serial": 8,
  "lineage": "cad71e47-309b-3d7e-ae94-c83afee9f364",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "docker_container",
      "name": "backend-container",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 2,
          "attributes": {
            "attach": false,
            "bridge": "",
            "capabilities": [],
            "command": [
              "npm",
              "start"
            ],
            "container_logs": null,
            "cpu_set": "",
            "cpu_shares": 0,
            "destroy_grace_seconds": null,
            "devices": [],
            "dns": null,
            "dns_opts": null,
            "dns_search": null,
            "domainname": "",
            "entrypoint": [
              "docker-entrypoint.sh"
            ],
            "env": [
              "DATABASE_HOST=mongodb://mongo:27017",
              "DATABASE_NAME=cart",
              "NODE_ENV=development"
            ],
            "exit_code": null,
            "gateway": "172.18.0.1",
            "group_add": null,
            "healthcheck": null,
            "host": [],
            "hostname": "f6b0183ccc59",
            "id": "f6b0183ccc5953191d4a5a8b24210608399a18f2845551780a140b3551e32403",
            "image": "sha256:bbf5d2ba61771bdbb5208366d85e7fec004082826069f26376ebd1f8b850d2a2",
            "init": false,
            "ip_address": "172.18.0.3",
            "ip_prefix_length": 16,
            "ipc_mode": "private",
            "labels": [],
            "links": null,
            "log_driver": "json-file",
            "log_opts": null,
            "logs": false,
            "max_retry_count": 0,
            "memory": 0,
            "memory_swap": 0,
            "mounts": [],
            "must_run": true,
            "name": "backend-dev",
            "network_alias": null,
            "network_data": [
              {
                "gateway": "172.18.0.1",
                "global_ipv6_address": "",
                "global_ipv6_prefix_length": 0,
                "ip_address": "172.18.0.3",
                "ip_prefix_length": 16,
                "ipv6_gateway": "",
                "network_name": "services-dev"
              }
            ],
            "network_mode": "default",
            "networks": null,
            "networks_advanced": [
              {
                "aliases": [
                  "backend-dev"
                ],
                "ipv4_address": "",
                "ipv6_address": "",
                "name": "services-dev"
              }
            ],
            "pid_mode": "",
            "ports": [
              {
                "external": 3000,
                "internal": 3000,
                "ip": "0.0.0.0",
                "protocol": "tcp"
              }
            ],
            "privileged": false,
            "publish_all_ports": false,
            "read_only": false,
            "remove_volumes": true,
            "restart": "no",
            "rm": false,
            "security_opts": [],
            "shm_size": 64,
            "start": true,
            "stdin_open": false,
            "sysctls": null,
            "tmpfs": null,
            "tty": false,
            "ulimit": [],
            "upload": [],
            "user": "",
            "userns_mode": "",
            "volumes": [],
            "working_dir": "/usr/src/app"
          },
          "sensitive_attributes": [],
          "private": "eyJzY2hlbWFfdmVyc2lvbiI6IjIifQ==",
          "dependencies": [
            "docker_image.backend"
          ]
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_container",
      "name": "frontend-container",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 2,
          "attributes": {
            "attach": false,
            "bridge": "",
            "capabilities": [],
            "command": [
              "npm",
              "start"
            ],
            "container_logs": null,
            "cpu_set": "",
            "cpu_shares": 0,
            "destroy_grace_seconds": null,
            "devices": [],
            "dns": null,
            "dns_opts": null,
            "dns_search": null,
            "domainname": "",
            "entrypoint": [
              "docker-entrypoint.sh"
            ],
            "env": [
              "HTTP_PROXY=backend-dev:3000",
              "LISTEN_PORT=3001",
              "PROXY_PROTOCOL=http://"
            ],
            "exit_code": null,
            "gateway": "172.18.0.1",
            "group_add": null,
            "healthcheck": null,
            "host": [],
            "hostname": "5a68897db62a",
            "id": "5a68897db62aebf7faac6e651427ab90b13b1fc9c3ca4ba6fe211db63d21afe4",
            "image": "sha256:f62880b6243361e97fc9dd5ee4def8a1bc4fd0e44b1b93660157b24b628dbe23",
            "init": false,
            "ip_address": "172.18.0.4",
            "ip_prefix_length": 16,
            "ipc_mode": "private",
            "labels": [],
            "links": null,
            "log_driver": "json-file",
            "log_opts": null,
            "logs": false,
            "max_retry_count": 0,
            "memory": 0,
            "memory_swap": 0,
            "mounts": [],
            "must_run": true,
            "name": "frontend-dev",
            "network_alias": null,
            "network_data": [
              {
                "gateway": "172.18.0.1",
                "global_ipv6_address": "",
                "global_ipv6_prefix_length": 0,
                "ip_address": "172.18.0.4",
                "ip_prefix_length": 16,
                "ipv6_gateway": "",
                "network_name": "services-dev"
              }
            ],
            "network_mode": "default",
            "networks": null,
            "networks_advanced": [
              {
                "aliases": [
                  "frontend-dev"
                ],
                "ipv4_address": "",
                "ipv6_address": "",
                "name": "services-dev"
              }
            ],
            "pid_mode": "",
            "ports": [
              {
                "external": 3001,
                "internal": 3001,
                "ip": "0.0.0.0",
                "protocol": "tcp"
              }
            ],
            "privileged": false,
            "publish_all_ports": false,
            "read_only": false,
            "remove_volumes": true,
            "restart": "no",
            "rm": false,
            "security_opts": [],
            "shm_size": 64,
            "start": true,
            "stdin_open": false,
            "sysctls": null,
            "tmpfs": null,
            "tty": false,
            "ulimit": [],
            "upload": [],
            "user": "",
            "userns_mode": "",
            "volumes": [],
            "working_dir": "/usr/src/app"
          },
          "sensitive_attributes": [],
          "private": "eyJzY2hlbWFfdmVyc2lvbiI6IjIifQ==",
          "dependencies": [
            "docker_image.frontend"
          ]
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_container",
      "name": "mongo-container",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 2,
          "attributes": {
            "attach": false,
            "bridge": "",
            "capabilities": [],
            "command": [
              "mongod"
            ],
            "container_logs": null,
            "cpu_set": "",
            "cpu_shares": 0,
            "destroy_grace_seconds": null,
            "devices": [],
            "dns": null,
            "dns_opts": null,
            "dns_search": null,
            "domainname": "",
            "entrypoint": [
              "docker-entrypoint.sh"
            ],
            "env": [],
            "exit_code": null,
            "gateway": "172.18.0.1",
            "group_add": null,
            "healthcheck": [
              {
                "interval": "0s",
                "retries": 0,
                "start_period": "0s",
                "test": [
                  "CMD",
                  "/usr/local/bin/docker-healthcheck.sh"
                ],
                "timeout": "0s"
              }
            ],
            "host": [],
            "hostname": "5e1b894e97dd",
            "id": "5e1b894e97dd984dd1fd13cb8f716f291e50cd3f3d98118169d77cea16a982f6",
            "image": "sha256:8c7e1d287856ec812667ffb046d78b2250b35c1c2119e9e3fddb09633bcd4982",
            "init": false,
            "ip_address": "172.18.0.2",
            "ip_prefix_length": 16,
            "ipc_mode": "private",
            "labels": [],
            "links": null,
            "log_driver": "json-file",
            "log_opts": null,
            "logs": false,
            "max_retry_count": 0,
            "memory": 0,
            "memory_swap": 0,
            "mounts": [],
            "must_run": true,
            "name": "mongo-dev",
            "network_alias": null,
            "network_data": [
              {
                "gateway": "172.18.0.1",
                "global_ipv6_address": "",
                "global_ipv6_prefix_length": 0,
                "ip_address": "172.18.0.2",
                "ip_prefix_length": 16,
                "ipv6_gateway": "",
                "network_name": "services-dev"
              }
            ],
            "network_mode": "default",
            "networks": null,
            "networks_advanced": [
              {
                "aliases": [
                  "mongo"
                ],
                "ipv4_address": "",
                "ipv6_address": "",
                "name": "services-dev"
              }
            ],
            "pid_mode": "",
            "ports": [
              {
                "external": 27017,
                "internal": 27017,
                "ip": "0.0.0.0",
                "protocol": "tcp"
              }
            ],
            "privileged": false,
            "publish_all_ports": false,
            "read_only": false,
            "remove_volumes": true,
            "restart": "no",
            "rm": false,
            "security_opts": [],
            "shm_size": 64,
            "start": true,
            "stdin_open": false,
            "sysctls": null,
            "tmpfs": null,
            "tty": false,
            "ulimit": [],
            "upload": [],
            "user": "",
            "userns_mode": "",
            "volumes": [],
            "working_dir": ""
          },
          "sensitive_attributes": [],
          "private": "eyJzY2hlbWFfdmVyc2lvbiI6IjIifQ==",
          "dependencies": [
            "docker_image.mongo"
          ]
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_image",
      "name": "backend",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "build": [],
            "force_remove": null,
            "id": "sha256:bbf5d2ba61771bdbb5208366d85e7fec004082826069f26376ebd1f8b850d2a2pulumi/tutorial-pulumi-fundamentals-backend:latest",
            "keep_locally": false,
            "latest": "sha256:bbf5d2ba61771bdbb5208366d85e7fec004082826069f26376ebd1f8b850d2a2",
            "name": "pulumi/tutorial-pulumi-fundamentals-backend:latest",
            "output": null,
            "pull_trigger": null,
            "pull_triggers": null,
            "repo_digest": "pulumi/tutorial-pulumi-fundamentals-backend@sha256:98747818a6fcb4e3c62970e3ec6160908f88bc0dc8452c61bcdf2bdc5adf4fa3"
          },
          "sensitive_attributes": [],
          "private": "bnVsbA=="
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_image",
      "name": "frontend",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "build": [],
            "force_remove": null,
            "id": "sha256:f62880b6243361e97fc9dd5ee4def8a1bc4fd0e44b1b93660157b24b628dbe23pulumi/tutorial-pulumi-fundamentals-frontend:latest",
            "keep_locally": false,
            "latest": "sha256:f62880b6243361e97fc9dd5ee4def8a1bc4fd0e44b1b93660157b24b628dbe23",
            "name": "pulumi/tutorial-pulumi-fundamentals-frontend:latest",
            "output": null,
            "pull_trigger": null,
            "pull_triggers": null,
            "repo_digest": "pulumi/tutorial-pulumi-fundamentals-frontend@sha256:743bcc868c2e3c02e03ee26f5e153584a8b0db4bcd5a402e20d2432accf98037"
          },
          "sensitive_attributes": [],
          "private": "bnVsbA=="
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_image",
      "name": "mongo",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "build": [],
            "force_remove": null,
            "id": "sha256:8c7e1d287856ec812667ffb046d78b2250b35c1c2119e9e3fddb09633bcd4982pulumi/tutorial-pulumi-fundamentals-database-local:latest",
            "keep_locally": false,
            "latest": "sha256:8c7e1d287856ec812667ffb046d78b2250b35c1c2119e9e3fddb09633bcd4982",
            "name": "pulumi/tutorial-pulumi-fundamentals-database-local:latest",
            "output": null,
            "pull_trigger": null,
            "pull_triggers": null,
            "repo_digest": "pulumi/tutorial-pulumi-fundamentals-database-local@sha256:d3eea2da3166fe5246f54ce0563f6fd34f719968cb290d887960bc0182468ea3"
          },
          "sensitive_attributes": [],
          "private": "bnVsbA=="
        }
      ]
    },
    {
      "mode": "managed",
      "type": "docker_network",
      "name": "network",
      "provider": "provider[\"registry.terraform.io/kreuzwerker/docker\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            "attachable": false,
            "check_duplicate": null,
            "driver": "bridge",
            "id": "7880eb8bceccb2081a93dd4cb0facba0641e0a7ecff360135c6eadc91dfabb9a",
            "ingress": false,
            "internal": false,
            "ipam_config": [
              {
                "aux_address": {},
                "gateway": "172.18.0.1",
                "ip_range": "",
                "subnet": "172.18.0.0/16"
              }
            ],
            "ipam_driver": "default",
            "ipv6": false,
            "labels": [],
            "name": "services-dev",
            "options": {},
            "scope": "local"
          },
          "sensitive_attributes": [],
          "private": "eyJzY2hlbWFfdmVyc2lvbiI6IjEifQ=="
        }
      ]
    }
  ]
}
```

We're going to use this snippet as a basic starting point for translating code. Let's go explore what we can do.
