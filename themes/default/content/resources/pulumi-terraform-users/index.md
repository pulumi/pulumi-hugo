---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Pulumi for Terraform Users"
title: "Pulumi for Terraform Users"
meta_desc: |
    Have you ever wondered what the similarities and differences are between Pulumi and Terraform? Know Terraform really well, but want a Pulumi primer...
url_slug: pulumi-terraform-users
featured: false
pre_recorded: true
pulumi_tv: false
unlisted: false
gated: false
type: webinars
external: false
no_getting_started: true
block_external_search_index: false
main:
  title: "Pulumi for Terraform Users"
  description: |
    Have you ever wondered what the similarities and differences are between Pulumi and Terraform? Know Terraform really well, but want a Pulumi primer? Lee Briggs gives us a swift overview of what you need to know. Here's what you need to know: Pulumi vs Terraform: https://pulumip.us/PulumiVsTerraform Adopting from Terraform: https://pulumip.us/TerraformWithPulumi  Learn more about Pulumi at https://pulumip.us/home  Watch more of our content: - Modern Infrastructure series: https://pulumip.us/modern-infra - Quick Bites series: https://pulumip.us/quick-bites
  sortable_date: 2022-06-02T17:22:37Z
  youtube_url: https://www.youtube.com/embed/PqAP4BunQZU
transcript: |
    Hi, my name is Lee. And if you're a telephone user who's curious about Pulumi, here's some things that you need to know. Terraform. If you've used terraform, you probably use the HCL two configuration language which allows you to define the infrastructure in A DS L in a domain specific language. Pulumi uses languages that you're already using in your application life cycle. So you can write code in Python, you can write code in typescript, you can write code in Java in dot net and in go and you can also use YAML as a mechanism to offer those infrastructures code programs. What that means is it's more familiar you're already using these languages elsewhere, whether it's in your C I pipelines or whether it's in your application code. Pulumi brings this familiarity to your infrastructure. Something else that's really important to know about Pulumi is that it is decorative. So you use an imperative language to offer the code and Plume's engine turns that code into a decorative graph that is executed. So you can always be sure when you run a Pulumi program over and over and over again that it is going to have the same result and the same effect, this is very similar to Terraform, but the authoring experience is different. Meaning you get a more improved experience. The next one thing to know about Pulumi is how you execute that infrastructures code. So with terraform, you use the Terraform command line tool and it creates that infrastructure. So you wouldn't usually do that from your laptop or from a CCD pipeline. Pulumi also supports this workflow. However, with Pulumi automation API because you're using those familiar programming languages, you can embed Pulumi into any workflow you choose. So common, common use cases here are like creating Heroku and platform, the service like experiences or embedding. Pulumi directly into our web page. If you want to create a platform that provisions infrastructure, Pulumi will allow you to do that very, very easily. So the authoring and the execution experience are the two main differentiators when it comes to Pulumi. But there's also some, some other great differentiators that you might be familiar with. One thing that our users tell us they love is the fact that Pulumi encrypts all secrets in transit. And at rest, it is not possible for you to look at a secret value without the encryption key. This gives you an amazing peace of mind because you can know things like database passwords and private keys, you can store them in your state, but they are encrypted. They are not viewable in plain text. So anybody who gets access to the state will not be able to view those secrets. Another key differentiator is the way that you would write policy in Pulumi. Pulumi supports policy as code. So you can define the policy again. In familiar languages. You can write policies in javascript, you can write policies in Python and you can also use open policy agents rego language to define those policies. Again, this gives you the familiarity of using tools and mechanisms that you already have at your disposal. Another key differentiator with Pulumi is the support for native providers. Native providers are generated directly from a cloud provider's API which means when a cloud provider adds support for a new feature or a new result, Pulumi gets access to that feature extremely quickly with Terraform cloud provider. API S are often supported by the community and can take a little bit of time to become available in Terra farm. One of my favorite features of Pulumi is the ability to adopt existing infrastructure into infrastructures code. Terraform supports importing infrastructure like Pulumi. But the differentiator is that Pulumi also generates the code that matches the resource that you have. There are many more awesome features in Pulumi. But the final one that I want to talk about is the ability to manage state. Terraform will often require you to manipulate state in order to move resources around in your code. Pulumi allows you to use aliases which means that you do not need to manually modify state in order to move a resource, this can save a lot of time and be very, very productive.

---
