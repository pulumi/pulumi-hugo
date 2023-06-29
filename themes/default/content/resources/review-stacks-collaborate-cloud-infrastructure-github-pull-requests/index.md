---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Review Stacks - Collaborate on Cloud Infrastructure in GitHub Pull Requests"
title: "Review Stacks - Collaborate on Cloud Infrastructure in Gi..."
meta_desc: |
    Pulumi Review Stacks - the first tool for pull request environments that deploys infrastructure and application code.
url_slug: review-stacks-collaborate-cloud-infrastructure-github-pull-requests
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
  title: "Review Stacks - Collaborate on Cloud Infrastructure in GitHub Pull Requests"
  description: |
    Pulumi Review Stacks - the first tool for pull request environments that deploys infrastructure and application code.  Review Stacks are dedicated cloud environments that get created automatically every time a pull request is opened, all powered by Pulumi Deployments. Open a pull request, and Pulumi Deployments will stand up a stack with your changes and will add a PR comment with the outputs from your deployment. Merge the PR and Pulumi Deployments will destroy the stack and free up the associated resources.   It has never been simpler to pick up an unfamiliar codebase, make changes to both application and infrastructure code, and share a live environment for review with your teammates. Learn more 👉  https://www.pulumi.com/blog/review-stacks/   
  sortable_date: 2023-06-28T17:25:06Z
  youtube_url: https://www.youtube.com/embed/VvQcx51YL4g
transcript: |
    At Pulumi, we have hundreds of repos managing hundreds of Pulumi programs, stacks and tens of thousands of cloud resources. It's a real challenge with having that much code that we need to develop and manage on a daily basis. Often I find myself stumbling upon an application such as the Pulumi pet shop that we have right here and needing to make a change first things first, I need to find the code. Let's use Pulumi insights to search for pet shop and see if we can find the stack here. We're able to pull up all the related resources using resource search and we can open up the stacks page to find more info here. We have a link directly to the main branch on github. Let's pull this up and see if we can find the code that we need to change. We're going to open this up inside of github code spaces. Great. We've got our code opened in github code spaces and here's the Typo that we need to fix change. Flu to Pulumi. All right, we've made our code change, but that's often the easy part. Now, we need to figure out how to test our changes how to run a development environment. And all this is typically very challenging because read me get out of date. Sometimes these things aren't even documented at all. Let's start by opening a pull request. We use github, pull request, create and here we go pull request open in the browser without me having to download any code or get my local environment set up. Luckily, this stack is using Pulumi deployments. Pulumi deployments will automatically deploy a single use development environment in the cloud that allow us to test these changes every time I push a commit into this pull request. Pulumi deployments will take that change, deploy it to the temporary environment which we call a review stack and automatically deploy those changes into the cloud so that I can share them with my coworkers, collaborate more easily and make changes safely. The review stack has finished deploying and we now have a dedicated development environment for this pr there's even a comment with the link to the website that I can open up, share with my product manager and the rest of my development team for verification. Let's go ahead and open it up. Awesome. These changes look great. Let's go ahead and merge the pr A review stack is scoped to the lifetime of the pull request. So every time I push a new commit into the pr that review stack and environment gets updated automatically. So the latest changes are always deployed without me having to do anything. As soon as the pull request is merged, the review stack gets cleaned up automatically by Pulumi deployments so that cloud infrastructure doesn't leak and continue to cost us money. Pulumi deployments also takes care of rolling that change out to my other environments here. We can see it's kicked off a deployment in my primary environment and these changes are now gonna get rolled out to the other website. Plumy deployments and review stacks are pretty unique in that they allow you to develop not just application code changes but infrastructure code changes as well. With review stacks, anyone on your team can pick up a code base, make changes with confidence and collaborate with others. The main stack is finished deploying and my changes have been updated in our production environment. Looks great. Pulumi deployments and review stacks can be configured through the cloud console, the API and via Pulumi code. Just a couple of lines within my Pulumi program. Allow me to specify the repo name the GIT branch and the directory. That's it. Now, I've got get push to deploy and review stacks enabled on every repository within my organization. Whether you're working on a team of five or enterprise of thousands plume deployments, makes it easy to deliver a workflow that is fast, collaborative and safe to your entire team.

---
