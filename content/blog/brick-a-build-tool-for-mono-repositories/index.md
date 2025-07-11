---
title: "Brick: a build tool for mono-repositories"
date: "2020-03-23T12:00:00.000Z"
image: cover.png
author: Olivier Corradi
tags: []
---

![cover.png](cover.png)

More and more organisations are embracing mono-repositories as it makes dependency management simpler (read more [here](https://danluu.com/monorepo/)). However, implementing and maintaining a mono-repository at scale has its challenges. This is due to the fact that building and testing a large repository is no simple feat. At the core is a question of performance: at each commit, we need to re-build and re-test the whole repository. That sounds very expensive, and therefore, a caching mechanism should be introduced. The question then becomes: how do we find out which parts we need to rebuild and retest?

Larger organisations such as Google, Facebook and Twitter have adopted the mono-repository approach as they have the means to maintain such an infrastructure, but unfortunately solutions for smaller organisations are limited. At Electricity Maps, we wanted to embrace the mono-repository structure. This post explains why we built [brick](https://github.com/electricitymaps/brick), our home-made build tool for mono-repositories.

## A small example

One of our products is Electricity Maps. It shows in real-time the origin of electricity used across the world, alongside its carbon footprint. We have a paid API which provides forecasts enabling anyone to optimise their electricity usage to reduce cost and emissions. Electricity Maps is divided into geographical zones that are defined in a definition file called zones.json. This definition file contains bounding boxes, data acquisition parameters and much more (I encourage you to take a look at it here).

In our mono-repository, we have a multitude of micro-services, that are represented as folders in our repository. Here are some of them:

* `api`: The backend which hosts our backend API
* `api/www`: The paid API website
* `contrib`: A [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) which points to the [open-source Electricity Maps frontend](https://github.com/electricitymaps/electricitymaps-contrib)
* `forecasting`: The forecasting pipeline used by the API
* `weather`: The weather forecast fetching service used by the forecasting pipeline

We use continuous deployment, which means that each pull request that changes the zones.json definition will update several systems in one go:

* the public [Electricity Maps app](https://app.electricitymaps.com/) frontend is updated with the new geometries
* our weather forecast fetching service is updated to aggregate weather data over that new geometry using the bounding boxes provided
* our forecasting pipeline (part of our paid API) is updated
* our [API website](https://electricitymaps.com/) is updated to show availability of data (see figure)

![Morty](figure1.png)

This map on our [API website](https://electricitymaps.com/) is automatically updated each time we change the zones definition. The reason is that the map component is re-used between our [API website](https://electricitymaps.com/) and the [Electricity Maps frontend](https://app.electricitymaps.com/).

This is in stark contrast with a multi-repository setting, where one would first update and release a new version of the zones.json definition, then, for each dependent service, submit a pull request to update the zones.json dependency. This is quite cumbersome and doesn’t scale well. Having a single repository enables us to submit a pull request representing a single atomic change. It enables us to move faster, keep a very modular codebase and increase the amount of code shared.

## Build performance

The issue faced by mono-repositories is that building and testing takes time as all build steps and tests need to be run, caused by the fact that it is not known which changes affect which builds and/or tests. Several tools address this need, like [Bazel](https://bazel.build/) used at Google, [Buck](https://buck.build/) at Facebook or [Pants](https://www.pantsbuild.org/) at Twitter (see a longer list [here](https://github.com/korfuri/awesome-monorepo)). The problem is that those tools require a steep learning curve for new developers. We wanted to simplify that drastically.

## Requirements

When designing and assessing existing build tools, we looked at the following requirements:

* Any developer should be able to write a build definition with minimal learning
* The builds should be hermetic (missing a build input should trigger an error)
* The builds should be reproducible (triggering the same build on two machines should give the same output)
* The builds should be fast (changing only a few files should only rebuild and retest the relevant parts)

Bazel came the closest, but after trying it out for a few weeks, we discovered that support for the Javascript toolkit was limited, and that writing build definitions was too complicated for our needs. We were afraid that it would limit its adoption inside our team: we wanted something much simpler.

## Enters [brick](https://github.com/electricitymaps/brick), based on Docker

It turns out that [buildkit](https://github.com/moby/buildkit), the system building Docker images, already fulfills a lot of these requirements:

* Builds are hermetic, as they run in an isolated container
* Builds are deterministic as long as the same base image is used
* Incremental builds are possible as Docker caches steps already executed

A small CLI called [brick](https://github.com/electricitymaps/brick) was then built in Python. It searches for a BUILD.yaml build definition file and then passes all relevant flags to the buildkit build engine.

As an example, here’s the BUILD.yaml file we use to build and deploy our API website from the `./api` folder of our monorepo:

```yaml
name: www

steps:
 prepare:
   # This is the docker image that will be used (optional)
   image: node:10.3
   # These are the commands that will be run
   commands:
     - yarn
   # Failing to declare those inputs will cause the `yarn`
   # command to fail due to missing files
   inputs:
     - package.json
     - yarn.lock

 build:
   commands:
     - yarn lint
     - yarn build
   inputs:
     - static/
     - src/
     - gatsby-*.js
     - .eslintrc.js
   # Outputs will be copied from the image to the host
   outputs:
     - public
```

Running the build is as easy as running brick build from that folder. For each stage, if the commands have not changed and the inputs have not changed, then the build results are read from cache (this is done by the docker engine itself, which will cache ADD and RUN steps). Under the hood, what actually happens is that brick generates a temporary Dockerfile that it builds.

Once the build is done, brick reads the outputs array defined in the BUILD.yaml and copies the files from the image to the host machine. Voilà!

## Speed
A no-op build with ~15 targets (i.e. micro-services) runs in 30seconds on our CI server (n1-standard-2 on Google Cloud Compute Engine).

## Dependencies
As inputs and outputs are clearly defined, dependencies can automatically be detected: if an input intersects the output of another build, then that other build will automatically be triggered.

## Development
Starting to work on a new target is as simple as running brick develop, given that the right configuration is added to BUILD.yaml:

```yaml
develop:
 command: yarn develop -H 0.0.0.0
 ports:
   - 8000
```

What happens under the hood is that a docker run command is issued, re-using the prepare step to make sure every developer has the same dependencies. Using our API website as an example, if a new dependency is added to the package.json file, then brick develop will automatically re-run the prepare step. This avoids the problem of developers having to remember to run yarn if dependencies have changed. Furthermore, it guarantees that developers are always working on a consistent system.

brick develop runs in an isolated container, and automatically mounts volumes to the host filesystem based on the inputs declarations. This ensures that watching file changes works, while still keeping the guarantee that missing inputs will cause errors, forcing the developer to declare them all.

## Tests
Tests can also be defined in a similar fashion:

```yaml
test:
 commands:
   - yarn test
```

## Deployment

Deployments can also be cached. In this example, we define a deployment configuration which copies the output of our build step (the public folder) to a Google Cloud Bucket. Secrets are also defined, which will be mounted during the deployment stage.

```yaml
deploy:
 commands:
   - gsutil -m cp -a public-read -r public/* gs://static.electricitymaps.com/api
 secrets:
   gcloud:
     src: ~/.config/gcloud
     target: /root/.config/gcloud
```

## Final words
brick is still very experimental, and the documentation sparse. However it is already used internally for all of our builds and tests. If you feel like you want to help us out make it more robust, please reach out!
