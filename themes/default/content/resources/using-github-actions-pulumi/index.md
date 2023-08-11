---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Using GitHub Actions | Pulumi"
title: "Using GitHub Actions | Pulumi"
meta_desc: |
    "Learn how GitHub Actions and Pulumi enable seamless cloud deployment in this repo. Experience continuous deployment with ease. Try it now!"
url_slug: using-github-actions-pulumi
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
  title: "Using GitHub Actions | Pulumi"
  description: |
    Using GitHub Actions with Pulumi: Universe Demo From the GitHub Universe Day 2 Keynote, see Pulumi GitHub Actions deploying a Dockerized Ruby on Rails app to Kubernetes!  Learn more about Pulumi GitHub Actions  * Our announcement blog post: https://blog.pulumi.com/continuous-delivery-to-any-cloud-using-github-actions-and-pulumi  * Documentation on using them: http://pulumi.io/github
  sortable_date: 2018-10-16T20:16:44Z
  youtube_url: https://www.youtube.com/embed/59SxB2uY9E0
transcript: |
    Today, we'll see how github actions and Pulumi enable continues deployment to your cloud of choice in this repo. We've got a Docker Eye Ruby on Rails application published at the Docker hub that runs into Kubernetes cluster and uses a hosted post for sequel database. In the app directory, we have our Ruby On Rails app and the Docker file for it. And in the info directory, we have our Pulumi program with configuration for all of our environments and the definitions of our infrastructure. Here, we have our GKE cluster. We also have our post database and finally, our application itself which includes the Docker image to be published, the Curtis deployment and the Curtis service object. Here, we see our applications already up and running. We'll just make a small edit to the Ruby on Rails, application code itself to add an image to the home page. As soon as we've committed our changes, we'll see that the github action is already running. And if we click on over to the Pulumi Cloud console, we'll also see the deployment has begun. We can click in here to see live logs and updates as our application is being deployed and we have a resources tab here or we can actually see the current state of the deployed resource including the Kurtis uh service itself. The deployment is well underway. So let's head back to the github actions tab. And indeed, it's just completed. We can click the log link to see full output including docker build, output, Curti status updates. And now we can go back to our app and reload and see that our changes are now live today. We've seen how github actions plus Pulumi enables continuous deployment to your cloud of choice. Head on over to Pulumi dot IO to download and give it a try.

---
