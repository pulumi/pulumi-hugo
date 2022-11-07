---
title: Pulumi - Universal Infrastructure as Code
meta_desc: Pulumi's open source infrastructure as code SDK enables you to create, deploy, and manage infrastructure on any cloud, using your favorite languages.

hero:
  title: [ "Ship", "Infrastructure", "Faster" ]
  description: |
    Deliver infrastructure with high velocity and scale through software engineering.
  cta_text: Get Started

overview:
  title: [ "Universal", "Infrastructure as Code" ]
  description: |
    Every cloud, every language, every architecture, every builder.
  logos:
    languages:
      - /logos/tech/typescript.svg
      - /logos/tech/dotnet.svg
      - /logos/tech/go.svg
      - /logos/tech/java.svg
      - /logos/tech/yaml.svg
      - /logos/tech/python.svg
      - /logos/tech/javascript.svg
      - /logos/tech/fsharp.svg
    clouds:
      - /logos/tech/aws.svg
      - /logos/tech/azure-logo.svg
      - /logos/tech/gcp-logo.svg
      - /logos/tech/kubernetes.svg
      - /logos/tech/digitalocean.svg
      - /logos/tech/alibaba.svg
    identity:
      - /logos/tech/github.svg
      - /logos/tech/atlassian.svg
      - /logos/tech/ci-cd/gitlab-ci.svg
      - /logos/tech/ci-cd/circleci.svg
      - /logos/tech/ci-cd/jenkins.svg
      - /logos/tech/ci-cd/spinnaker.svg
      - /logos/tech/ci-cd/teamcity.svg
      - /logos/tech/ci-cd/travis-ci.svg

build:
  title: Code faster
  description: |
    Pulumi gives you a faster inner dev loop for IaC by allowing you to use your existing IDE with Intellisense and unit tests working out the box. You also can tap into the power of programming languages to model your infrastructure.
  items:
    - title: Share and reuse
      description: |
        You can use Pulumi Packages to build best-practice abstractions available in all supported languages.

    - title: Be productive
      description: |
        Reduce the time spent switch between by docs in browser and code IDE with Intellisense supported
        out of the box.

    - title: Flexible and expressive
      description: Loops, conditionals, functions, classes, and more.
  code:
    - title: index.ts
      language: typescript
      code: |
        import * as pulumi from "@pulumi/pulumi";
        import * as awsx from "@pulumi/awsx";
        import * as eks from "@pulumi/eks";

        // Create a new VPC
        const eksVpc = new awsx.ec2.Vpc("eks-vpc", {
            enableDnsHostnames: true,
            cidrBlock: "10.0.0.0/16",
        });

        // Create the EKS cluster
        const eksCluster = new eks.Cluster("eks-cluster", {
            vpcId: eksVpc.vpcId,
            publicSubnetIds: eksVpc.publicSubnetIds,
            privateSubnetIds: eksVpc.privateSubnetIds,
            instanceType: "t2.medium",
            desiredCapacity: 3,
            minSize: 3,
            maxSize: 6,
            nodeAssociatePublicIpAddress: false,
        });

        // Export some values for use elsewhere
        export const kubeconfig = eksCluster.kubeconfig;
        export const vpcId = eksVpc.vpcId;
    - title: __main__.py
      language: python
      code: |
        import pulumi
        import pulumi_awsx as awsx
        import pulumi_eks as eks

        # Create a VPC for the EKS cluster
        eks_vpc = awsx.ec2.Vpc("eks-vpc",
            enable_dns_hostnames=True,
            cidr_block="10.0.0.0/16")

        # Create the EKS cluster
        eks_cluster = eks.Cluster("eks-cluster",
            vpc_id=eks_vpc.vpc_id,
            public_subnet_ids=eks_vpc.public_subnet_ids,
            private_subnet_ids=eks_vpc.private_subnet_ids,
            instance_type="t2.medium",
            desired_capacity=3,
            min_size=3,
            max_size=6,
            node_associate_public_ip_address=False)

        # Export values to use elsewhere
        pulumi.export("kubeconfig", eks_cluster.kubeconfig)
        pulumi.export("vpcId", eks_vpc.vpc_id)
    - title: main.go
      language: go
      code: |
            package main

            import (
              "github.com/pulumi/pulumi-awsx/sdk/go/awsx/ec2"
              "github.com/pulumi/pulumi-eks/sdk/go/eks"
              "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
              "github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
            )

            func main() {
              pulumi.Run(func(ctx *pulumi.Context) error {
                // Create a new VPC, subnets, and associated infrastructure
                vpcNetworkCidr := "10.0.0.0/16"
                eksVpc, err := ec2.NewVpc(ctx, "eks-vpc", &ec2.VpcArgs{
                  EnableDnsHostnames: pulumi.Bool(true),
                  CidrBlock:          &vpcNetworkCidr,
                })
                if err != nil {
                  return err
                }

                // Create a new EKS cluster
                eksCluster, err := eks.NewCluster(ctx, "eks-cluster", &eks.ClusterArgs{
                  VpcId:                        eksVpc.VpcId,
                  PublicSubnetIds:              eksVpc.PublicSubnetIds,
                  PrivateSubnetIds:             eksVpc.PrivateSubnetIds,
                  InstanceType:                 pulumi.String("t2.medium"),
                  DesiredCapacity:              pulumi.Int(3),
                  MinSize:                      pulumi.Int(3),
                  MaxSize:                      pulumi.Int(6),
                  NodeAssociatePublicIpAddress: pulumi.Bool(false),
                })
                if err != nil {
                  return err
                }

                // Export some values in case they are needed elsewhere
                ctx.Export("kubeconfig", eksCluster.Kubeconfig)
                ctx.Export("vpcId", eksVpc.VpcId)
                return nil
              })
            }
    - title: MyStack.cs
      language: csharp
      code: |
        using Pulumi;
        using Awsx = Pulumi.Awsx;
        using Eks = Pulumi.Eks;
        using System.Collections.Generic;

        return await Deployment.RunAsync(() =>
        {
            // Create a new VPC
            var eksVpc = new Awsx.Ec2.Vpc("eks-vpc", new()
            {
                EnableDnsHostnames = true,
                CidrBlock = "10.0.0.0/16",
            });

            // Create the EKS cluster
            var eksCluster = new Eks.Cluster("eks-cluster", new()
            {
                VpcId = eksVpc.VpcId,
                PublicSubnetIds = eksVpc.PublicSubnetIds,
                PrivateSubnetIds = eksVpc.PrivateSubnetIds,
                InstanceType = "t2.medium",
                DesiredCapacity = 3,
                MinSize = 3,
                MaxSize = 6,
                NodeAssociatePublicIpAddress = false,
            });

            // Export some values for use elsewhere
            return new Dictionary<string, object?>
            {
                ["kubeconfig"] = eksCluster.Kubeconfig,
                ["vpcId"] = eksVpc.VpcId,
            };
        });
    - title: Pulumi.yaml
      language: yaml
      code: |
        name: pulumi-eks
        description: A simple EKS cluster
        runtime: yaml
        resources:
          # Create a VPC for the EKS cluster
          eks-vpc:
            type: awsx:ec2:Vpc
            properties:
              enableDnsHostnames: true
              cidrBlock: "10.0.0.0/16"
          # Create the EKS cluster
          eks-cluster:
            type: eks:Cluster
            properties:
              vpcId: ${eks-vpc.vpcId}
              publicSubnetIds: ${eks-vpc.publicSubnetIds}
              privateSubnetIds: ${eks-vpc.privateSubnetIds}
              instanceType: "t2.medium"
              desiredCapacity: 3
              minSize: 3
              maxSize: 6
              nodeAssociatePublicIpAddress: false
        outputs:
          # Output the Kubeconfig for the cluster
          kubeconfig: ${eks-cluster.kubeconfig}
          vpcId: ${eks-vpc.vpcId}

use_cases:
  - title: Write your configuration quickly
    icon: code
    icon_color: purple
    description: |
      Speed up your inner dev loop with statement completion, real-time type checking, and interactive documentation directly in your IDE.

  - title: Ship your applications faster
    icon: guage
    icon_color: yellow
    description: |
      Integrate Pulumi directly with your CI/CD provider to deliver your applications and infrastructure with more confidence and transparency.

  - title: Doing more with less
    icon: rocketship
    icon_color: blue
    description: |
      You can use the [Automation API](/automation/) to create tooling that help you and your engineers manage **10x the amount of resources** versus traditional tooling.

deploy:
  title: Get to production faster
  description: |
    Pulumi gives you a faster outer dev loop by making  CI/CD for your IaC seamless and the default experience. Pulumi has integrations with all the popular CI/CD platforms and testing frameworks.

  items:
    - title: Infrastructure and applications together
      description: Unify shipping your entire cloud software stack.

    - title: Deploy with confidence
      description: Validate every change with testing and built-in policies.

    - title: Automate worldwide delivery
      description: Scale up your delivery with [advanced automation](/automation/) as you grow.

manage:
  title: Get to market first
  description: |
    Pulumi gives you a faster dev loop across the entire organization by guaranteeing the infrastructure software supply chain. Standard software packaging allows sharing and reuse of code across the organization along with org-wide policy enforcements. Pulumi provides the industry’s only automation workflow capability that allows software engineering to be applied to solve and manage cloud infrastructure at scale.
  items:
    - title: Secure by default
      description: Automatic encryption for secrets and state.

    - title: Empower with guardrails
      description: Identity and Policy as Code ensure continuous compliance.

    - title: See who changed what and when
      description: Full change visibility and auditing across your entire organization.

benefits:
  title: The benefits of using Pulumi
  items:
    - title: Tame modern cloud complexity
      icon: code-window
      icon_color: salmon
      description: |
        Build with over 60 cloud providers using a consistent, cloud engineering approach that
        works for developers and infrastructure teams and eliminates accidental complexity.

    - title: Bring the cloud closer to application development
      icon: download-from-cloud
      icon_color: violet
      description: |
        Leverage a rich, programmable cloud interface and [reusable packages](/product/packages/) that abstract
        away complexity, bringing cloud concepts closer to application architectures.

    - title: Use engineering practices with infrastructure
      icon: exchange
      icon_color: blue
      description: |
        Do more with less. Combine Infrastructure as Code automation with tried-and-true software engineering
        practices &mdash; including modularity, testing, and CI/CD.
    - title: Foster collaboration and innovate faster
      icon: lightning
      icon_color: yellow
      description: |
        Unite developers, infrastructure teams, and security engineers around a common platform
        so that everyone can speak the same language and ship quickly and reliably.

customer_logos:
  title: Leading engineering organizations are building with Pulumi
  logos:
    - - name: mercedes-benz
        link: /case-studies/mercedes-benz
      - name: sans
        link: /case-studies/sans-institute
      - name: snowflake
        link: /case-studies/snowflake
    - - name: credijusto
        link: /case-studies/credijusto
      - name: skai
        link: /blog/kenshoo-migrates-to-aws-with-pulumi
      - name: lemonade
        link: /case-studies/lemonade
    - - name: panther-labs
        link: /case-studies/panther-labs
      - name: sourcegraph
        link: /case-studies/sourcegraph
      - name: whylabs
        link: /case-studies/whylabs
    - - name: webflow
      - name: cockroach-labs
      - name: washington-trust
    - - name: qi
      - name: univision
      - name: petcolove
    - - name: linktree
      - name: materialize
      - name: anitian
    - - name: clearsale
      - name: ware2go
      - name: meta
    - - name: angellist
      - name: bluenile
      - name: dutchie
    - - name: gusto
      - name: cisess
        link: /blog/managing-multi-cloud-open-data-noaa
      - name: altana


get_started:
  tweets:
    - username: matticala
      avatar: https://pbs.twimg.com/profile_images/1289826906024693766/LOdbjWdW_400x400.jpg
      link: https://twitter.com/matticala/status/1369038327341531140
      text: |
        With @PulumiCorp I said goodbye to #YAML and JSON supersets. I went back to what I love: #code. Code. End to end. Functional, even. #Kubernetes is pleasant again.

    - username: MartinDotNet
      avatar: https://pbs.twimg.com/profile_images/1142779028937596934/NsX3gdIU_400x400.png
      link: https://twitter.com/MartinDotNet/status/1367118630564020225
      text: |
        I'd like to congratulate @PulumiCorp on an AWESOME CLI experience... it's just beautiful

    - username: monde_
      avatar: https://pbs.twimg.com/profile_images/1478919095/converse_400x400.png
      link: https://twitter.com/monde_/status/1355031516934332418?s=20
      text: |
        I'm actually learning more about TS/JS with Pulumi. It really has been a joy to use. Kudos to the team for making such an awesome tool!

    - username: claudiordgz
      avatar: https://pbs.twimg.com/profile_images/985903897750507525/RH_psYD__400x400.jpg
      link: https://twitter.com/claudiordgz/status/1384692096729157635
      text: |
        Being able to build infrastructure in TypeScript brings tears of joy to my eyes

        thank you @PulumiCorp

    - username: JanDamaschke
      avatar: https://pbs.twimg.com/profile_images/1317179630638477314/592UdUFD_400x400.jpg
      link: https://twitter.com/JanDamaschke/status/1354861632082636805
      text: |
        I just spent a few hours getting used to @PulumiCorp SDK and I am already asking myself why I ever used #Terraform 😂  Real Infrastructure as Code all the way 💪 😍

    - username: eliostruyf
      avatar: https://pbs.twimg.com/profile_images/1271544070591168513/gnS95qjC_400x400.jpg
      link: https://twitter.com/eliostruyf/status/1379896780381372422?s=20
      text: |
       First, run of my new #dev environment. Love how easy it is with @PulumiCorp ❤️ 🚀 #InfrastructureAsCode

    - username: BrandonBloom
      avatar: https://pbs.twimg.com/profile_images/1007413949925548032/8FmwYujD_400x400.jpg
      link: https://twitter.com/BrandonBloom/status/1344398906617073664
      text: |
        Just Pulumi-ified a ton of random AWS resources & it feels so good.

    - username: sheeshee
      avatar: https://pbs.twimg.com/profile_images/458182231433826304/JQafPBkU_400x400.png
      link: https://twitter.com/sheeshee/status/1377562831948746756
      text: |
        I've been playing around with Pulumi a bit and I have to say this is really quite well done. The documentation is very polished and all tutorials I tried worked exactly copy paste out of the box.

    - username: TorstenVolk
      avatar: https://pbs.twimg.com/profile_images/1575782906/110930-ENMA-115240-web_400x400.jpg
      link: https://twitter.com/TorstenVolk/status/1381716012131876869
      text: |
        #Pulumi is the fast growing new kit on the block. Great convo with @PulumiCorp at what the (near) future holds in terms of platform capabilities. Very exciting. #cloudengineering #devops #gitops @ema_research

    - username: Frassle
      avatar: https://pbs.twimg.com/profile_images/1571260219/62070_434673459681_571169681_5323786_3642098_n_400x400.jpg
      link: https://twitter.com/Frassle/status/1355296248992038912
      text: |
        Save yourselves from the yaml, use pulumi


    - username: ItemLevel1
      avatar: https://pbs.twimg.com/profile_images/655703310545125376/7cI9yEyP_400x400.jpg
      link: https://twitter.com/ItemLevel1/status/1354888953166487555
      text: |
        Congratulations Joe. Loved the idea of pulumi since I did a talk with one of the first releases. I genuinely think this model is the future inside DevOps and out

    - username: hossambarakat_
      avatar: https://pbs.twimg.com/profile_images/731626626396520448/TDFYZwmH_400x400.jpg
      link: https://twitter.com/hossambarakat_/status/1357640859018162176
      text: |
        Give Pulumi a shot and you will never look back @PulumiCorp

    - username: randompunter
      avatar: https://pbs.twimg.com/profile_images/1355647898076250127/D9pez57M_400x400.jpg
      link: https://twitter.com/randompunter/status/1353040630121975808
      text: |
        Really liking Pulumi's .NET binary  support. Don't have to copy source code around environment pipelines and don't have to deal with runtime/sdk/re-compilation nonsense on deployment hosts / agents. Just native exe's ftw.

    - username: samcogan
      avatar: https://pbs.twimg.com/profile_images/970774602669412353/reTcugpM_400x400.jpg
      link: https://twitter.com/samcogan/status/1350392939755802627
      text: |
        Been using Pulumi to write C# IaC for a while now, very much prefer it to HCL.

    - username: omerlh
      avatar: https://pbs.twimg.com/profile_images/1021467583193796608/9odUKQCb_400x400.jpg
      link: https://twitter.com/omerlh/status/1369281453213769736
      text: |
        Pulumi ❤️❤️❤️❤️

  title: Get started today
  description: Pulumi is open source and free to get started. Deploy your first stack today.
  cta_text: Get Started
---
