---
title: "Fullstack Pulumi: Deploying a MERN Stack App on DigitalOcean"
date: 2022-02-06
meta_desc: Here be a whole bunch of infrastructural interestingness.
meta_image: meta.png
authors:
    - christian-nunciato
tags:
    - digitalocean
    - fullstack
    - typescript
    - web-apps
---

As a developer, I get a lot of ideas for web applications --- little things, mostly: clever ways to keep track of my kids' allowances, managing workout routines or shopping lists --- and to be honest, the vast majority never see the light of day. But once in a while, an idea will hang around long enough to convince me to do something about it, and I'll be forced to confront the dreaded decision of what to use for the technology stack.

As a JavaScript developer, of course, I have options --- too many, in fact. Thanks to the massive and ever-expanding JavaScript community and ecosystem, I've got roughly a hundred and fifty million front-end and back-end libraries and frameworks to choose from, and since keeping up with all of them is basically impossible, I often reach for a familiar combo of tools known as [the MERN stack](https://www.mongodb.com/mern-stack).

MERN-stack apps are three-tier web applications built with [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), and [Node.js](https://nodejs.org/). You can read all about them (and their variations) [in the MongoDB docs](https://www.mongodb.com/mern-stack), but the gist is that they let you use one language --- JavaScript (or TypeScript, if you like) --- to manage all three layers of the application stack: the front end, as a single-page app built statically with React; the back end, as a REST API managed with Express; and the database, as a collection of JSON-like documents with MongoDB. MERN might not always be the right tool for the job, but for the kinds of apps I often find myself building, it usually works out pretty well.

![stuff](./meta.png)

## Into the cloud

Of course, once I'm finished _building_ my MERN app, I'm faced with a whole other problem: figuring out how to get it off of my laptop and onto the web.

The cloud, for all its awesomeness, hasn't made this very easy for developers. If all you want is to deploy a web app into the cloud, the process of choosing a provider, translating the components of the app into the right set of provider-specific cloud products and resources, figuring out networking and permissions, grokking billing, and so on, can be dizzying --- and the truth is that as a developer, I'd really rather not to have to deal any of it. What I want is to focus on what I care about --- my app --- and when I'm ready to deploy it, push my code to a repository and wait patiently for a URL to emerge that I can paste into a browser and have everything _just work_.

Which is why I was so delighted to discover the [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform).

If you've used DigitalOcean before, you know one of their goals is to make infrastructure approachable for developers. But what you may not know (or at least I didn't myself until recently) is that you can do a lot more with DigitalOcean than just virtual machines. App Platform, for example, which is [relatively new](https://www.digitalocean.com/blog/introducing-digitalocean-app-platform-reimagining-paas-to-make-it-simpler-for-you-to-build-deploy-and-scale-apps) is a fully-managed platform service that offers a handful of high-level abstractions that map especially well to the components of a typical web app. If you're looking for an easy way to deploy and manage a MERN-stack application (or just about any web applicationsfor that matter), App Platform can be an excellent choice --- and as you'll see, with Pulumi and a little bit of code, you can drive the whole process without ever having to leave the comfort of your IDE.

So let's build ourselves a MERN-stack app and deploy it on DigitalOcean with Pulumi. The app you'll deploy is a simple one --- just a web-based grocery list --- and since the aim is to focus on the infrastructure and how to code it, we'll start with a working app, map the layers of that app to App Platform constructs, and wire it all up with Pulumi.

Let's get to it!

## First steps: setting up {#setting-up}

The code for this walkthrough is [available as a template repository on GitHub](https://github.com/cnunciato/fullstack-pulumi-mern-digitalocean), so if you want to follow along (and you should!), you should [grab a copy of your own](https://github.com/cnunciato/fullstack-pulumi-mern-digitalocean/generate) to work with, either by forking it or creating it from a template, and then once you've done that:

* [Clone the repository](https://github.com/cnunciato/fullstack-pulumi-mern-digitalocean) to your local machine
* [Install and configure Pulumi and Node.js](https://www.pulumi.com/docs/get-started/aws/begin/?language=nodejs) (we'll use TypeScript)
* [Install and configure MongoDB Community Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
* [Sign into DigitalOcean](cloud.digitalocean.com/) and obtain a [personal access token](https://cloud.digitalocean.com/account/api/tokens) with read-write permissions

One thing to note: since we'll be creating real DigitalOcean resources, there's a chance you'll incur a slight cost for the resources you use (for DigitalOcean, not Pulumi). However, we'll be using the least expensive plan settings available, and tearing everything down when we're through, so that cost shouldn't amount to more than a penny or two.

## Cloning and inspecting the repository

Once you've cloned your copy of the template repository and navigated to the root, you'll see a couple of folders and files that look something like this:

```bash
├── frontend
├── backend
├── Makefile
└── package.json
```

The `frontend` folder contains the React application, and its job is to render the list of groceries and give us something to interact with (adding items, checking them off, deleting them, and so on). The application was generated using a tool called [Vite](https://vitejs.dev/), and all of its logic --- form fields, click handlers, API calls, etc. --- is contained in `src/App.tsx`.

The `backend` folder contains the Express application that defines the REST API. It sets up four API routes to handle the set of [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations you'd expect to find in an app like this one:

* `GET /api/items` fetches all items from the database and returns them as a JSON array
* `POST /api/items` takes a new item and writes it to the database
* `PUT /api/items/:id` updates an existing item (e.g., to toggle its checked/unchecked status)
* `DELETE /api/items/:id` deletes an item

The back end supports three configurable properties, all of which are exposed as optional environment variables:

* `BACKEND_SERVICE_PORT`, which defaults to `8000`
* `BACKEND_ROUTE_PREFIX`, which defaults to `/api`
* `DATABASE_URL`, which defaults to `mongodb://127.0.0.1` to facilitate local development

## Running the application locally

I'm a big fan of using [Makefiles](https://www.gnu.org/software/make/manual/html_node/Introduction.html) for dev tasks, so I've included one here as well. Once you've [installed MongoDB locally and started the service](https://docs.mongodb.com/manual/administration/install-community/) (which should be listening on port `27107`), you can install all front-end and back-end dependencies and start the development server:

```bash
$ make ensure   # installs all front-end, back-end, and development dependencies.
$ make dev      # starts the front-end and back-end development servers.
```

With the development server running, you can browse to [http://localhost:3000](http://localhost:3000) and see the app:

![things](./localhost.png)

The front-end and back-end development servers are configured to recompile your TypeScript to JavaScript automatically, and the front-end server is set up to proxy the back-end service (which runs at `http://localhost:8000`) at the root-relative path of `/api`. That's convenient not only in development (as it means not having to wrestle with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)-related issues), but also in production, as you'll see when we deploy these two components to App Platform.

Try adding a few items and marking them off, just to make sure everything's working properly. If you've got a MongoDB client installed as well --- I generally like [MongoDB Compass](https://www.mongodb.com/products/compass) --- then you should also be able to see the `grocery-list` database, and the `items` collection filling up with delicious foods:

![whatnot](./localhost-db.png)

Now let's have a look at how to go about deploying this stuff.

## Charting a course

Earlier I mentioned that every cloud provider handles web-app deployment a little differently, sometimes in multiple ways, and that's true of DigitalOcean as well. You _could_ deploy the front end as a [DigitalOcean Space](https://www.digitalocean.com/products/spaces), or both front end and back end (and even the database) using a single [DigitalOcean Droplet](https://www.digitalocean.com/products/droplets). But given the shape of this application, the best fit is definitely [App Platform](https://docs.digitalocean.com/products/app-platform/concepts/), for several reasons.

One is that because App Platform apps, as I mentioned, are comprised of high-level [_components_](https://docs.digitalocean.com/products/app-platform/concepts/) --- abstractions like [static site](https://docs.digitalocean.com/products/app-platform/concepts/static-site/), [service](https://docs.digitalocean.com/products/app-platform/concepts/service/), and [database](https://docs.digitalocean.com/products/app-platform/concepts/database/) --- they're pretty much purpose-built for an application like this one.  DigitalOcean customizes the deployment for you based on the kind of component you're deploying, with static websites distributed and cached on its own CDN, services packaged and delivered as containers (using its own [Kubernetes](https://www.digitalocean.com/products/kubernetes) platform), and databases as easily configurable managed services. All of this means you're not only able to stay focused on the application itself, but you can scale each of these services up, down, and out as needed, and even delegate your front-end and back-end build processes to DigitalOcean by having them watch for commits on one or more external source-code repositories.

App Platform apps can be configured in a couple of ways --- either manually, by defining components individually in the DigitalOcean web console, or programmatically, in the form of an [_App Spec_](https://docs.digitalocean.com/products/app-platform/concepts/app-spec/), a JSON document that can be submitted over the DigitalOcean REST API. Since our plan is to use Pulumi and the [DigitalOcean provider package]({{< relref "/registry/packages/digitalocean" >}}), we'll be going the programmatic route, setting up an app that deploys automatically on every GitHub commit. And it'll consist of three components:

* A `staticSite` mapped to the `frontend` folder
* A `service` mapped to the `backend` folder (again exposed at a root-relative path of `/api`)
* A `database` pointing to a managed MongoDB cluster (and whose access will be restricted to only the `service` component)

And once deployed, it'll all be running at a single URL, just as we'd hoped.

Let's start by creating new Pulumi project.

## Creating the project

In the root of the repository, make a new folder called `infra`, change to it, then run `pulumi new` using the `digitalocean-typescript` [project template](https://github.com/pulumi/templates):

```bash
$ mkdir infra && cd infra
$ pulumi new digitalocean-typescript
```

At the prompts, use the following values:

* For project name, use `grocery-list`
* For the description, use `Deploying a MERN-stack app on DigitalOcean`
* For stack name, use `dev` (the default)

When the command completes, you'll have a new [Pulumi stack]({{< relref "/intro/concepts/stack" >}}), but you'll still have a few things to configure. The Pulumi DigitalOcean provider, for one, needs to be [configured]({{< relref "/registry/packages/digitalocean/installation-configuration" >}}) to communicate with DigitalOcean on your behalf (to provision your app and its various resources). For this, you can use the access token you obtained [earlier](#setting-up) from the DigitalOcean console, and you can apply it by setting a single environment variable:

```bash
$ export DIGITALOCEAN_TOKEN="your-access-token"
```

Also, since the goal is to have App Platform deploy our app automatically on every GitHub commit, we'll need to tell it where to find the source code for our front-end and back-end components. We could bake these settings right into the Pulumi program itself, but it'd be better to apply them as stack-specific configuration, as that'd let us deploy to different stacks (say, in CI) depending on the branch of the commit. Everyone does this a little differently, so for now, let's configure the currently selected stack (which should be `dev`) to use the default branch of your GitHub repository:

```bash
$ pulumi config set repo "your-github-org/your-github-repo" # e.g., cnunciato/fullstack-pulumi-mern-digitalocean
$ pulumi config set branch "your-main-branch"               # e.g., main
```

With these values in place, you're ready to start writing the program.

## Writing the program

In your IDE of choice, open {{< langfile >}} and replace the sample code with the following lines to import the Pulumi SDKs you'll need to make this work and the configuration values you just set, along with a line to specify the [DigitalOcean region](https://docs.digitalocean.com/products/platform/availability-matrix/) to deploy into:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// Our stack-specific configuration.
const config = new pulumi.Config();
const repo = config.require("repo");
const branch = config.require("branch");

// The DigitalOcean region to deploy into.
const region = digitalocean.Region.SFO3;
```

Next, add a few lines to [declare the app's MongoDB cluster](https://docs.digitalocean.com/products/databases/mongodb/how-to/create/). We'll use just one node for now --- additional replica nodes can be provisioned just by increasing the `nodeCount` property --- and the most affordable [performance settings](https://www.digitalocean.com/pricing#managed-databases):

```typescript
// ...

// Our MongoDB cluster (currently just one node).
const cluster = new digitalocean.DatabaseCluster("cluster", {
    engine: "mongodb",
    version: "4",
    region,
    size: digitalocean.DatabaseSlug.DB_1VPCU1GB,
    nodeCount: 1,
});

// The database we'll use for our grocery list.
const db = new digitalocean.DatabaseDb("db", {
    name: "grocery-list",
    clusterId: cluster.id,
});
```

Now for the App Platform spec itself. Notice the `digitalocean.App` resource takes just one argument, `spec`, which defines all three of the components of our application: static site, service, and database. Both the static site and the service are configured to use the same GitHub repository (the `sourceDir` properties indicate their folders within the repository), and both are configured (with the `deployOnPush` flag) to be rebuilt and redeployed by DigitalOcean on every commit.

The service has a few additional settings that you can use to manage its runtime behavior and deployment topology. As in development, we'll configure it to listen on port 8000 and be available at `/api` --- the entire app will ultimately be proxied transparently by an [App Platform load balancer](https://docs.digitalocean.com/products/app-platform/concepts/load-balancer/) --- and it'll be powered by just one container instance, again using the most affordable [performance tier](https://docs.digitalocean.com/products/app-platform/).

```typescript
// ...

// The App Platform spec that defines our grocery list.
const app = new digitalocean.App("app", {
    spec: {
        name: "grocery-list",
        region: region,

        // The React front end.
        staticSites: [
            {
                name: "frontend",
                github: {
                    repo,
                    branch,
                    deployOnPush: true,
                },
                sourceDir: "/frontend",
                buildCommand: "npm install && npm run build",
                outputDir: "/dist",
            }
        ],

        // The Express back end.
        services: [
            {
                name: "backend",
                github: {
                    repo,
                    branch,
                    deployOnPush: true,
                },
                sourceDir: "/backend",
                buildCommand: "npm install && npm run build",
                runCommand: "npm start",
                httpPort: 8000,
                routes: [
                    {
                        path: "/api",
                        preservePathPrefix: true,
                    },
                ],
                instanceSizeSlug: "basic-xxs",
                instanceCount: 1,

                // To connect to MongoDB, the service needs a DATABASE_URL, which
                // is conveniently exposed as an environment variable because the
                // database belongs to the app (see below). The CA_CERT allows for
                // a secure connection between API service and database.
                envs: [
                    {
                        key: "DATABASE_URL",
                        scope: "RUN_AND_BUILD_TIME",
                        value: "${db.DATABASE_URL}",
                    },
                    {
                        key: "CA_CERT",
                        scope: "RUN_AND_BUILD_TIME",
                        value: "${db.CA_CERT}",
                    },
                ],
            },
        ],

        // Include the MongoDB cluster as an integrated App Platform component.
        databases: [
            {
                // The `db` name defines the prefix of the tokens used (above) to
                // read the environment variables exposed by the database cluster.
                name: "db",

                // MongoDB clusters are only available in "production" mode.
                // https://docs.digitalocean.com/products/app-platform/concepts/database/
                production: true,

                // A reference to the managed cluster we declared above.
                clusterName: cluster.name,

                // The engine value must be uppercase, so we transform it with JS.
                engine: cluster.engine.apply(engine => engine.toUpperCase()),
            }
        ]
    },
});
```

Technically that's all we need to configure the application, but it wouldn't be a bad idea to add one last thing.

By default, managed MongoDB clusters are configured to be publicly accessible --- which comes in handy when you need to connect to a database yourself, but isn't a great strategy for preventing internet miscreants from doing the same. You can fix this easily, though, by adding a `DatabaseFirewall` resource to declare the app as a [_trusted source_](https://docs.digitalocean.com/products/app-platform/how-to/manage-databases/), thereby rejecting all inbound traffic originating from elsewhere:

```typescript
// ...

// Adding a database firewall setting restricts access solely to our app.
const trustedSource = new digitalocean.DatabaseFirewall("trusted-source", {
    clusterId: cluster.id,
    rules: [
        {
            type: "app",
            value: app.id,
        },
    ],
});
```

And finally, we can add one last line to export the app URL (to be generated by DigitalOcean) as a Pulumi [stack output]({{< relref "/docs/intro/concepts/inputs-outputs" >}}):

```typescript
// ...

// The DigitalOcean-assigned URL for our app.
export const { liveUrl } = app;
```

And with that, we're ready to deploy.

## Deploying

Quickly recapping, here's what we've done:

* We began with a simple MERN-stack app configured to run on `localhost`.
* We mapped each tier of that app --- front end, back end, database --- to a DigitalOcean App Platform component.
* We wrote a Pulumi program to declare a managed MongoDB cluster and an App Platform spec to tie everything together.

When we deploy this app,

```bash
$ pulumi up

```

## Tidying up

## Conclusion
