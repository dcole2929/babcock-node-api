# node-js-skeleton-service

## What is this?

`babcock-node-api` is a Node JS boilerplate for creating API projects with ExpressJS. 

## Major Dependencies

1. Express
2. ObjectionJs
3. [`swagger-jsdoc`](https://github.com/Surnet/swagger-jsdoc)
4. 

## Setup

## Application Layout 

### [`/src`](./src)

This folder contains all the application logic for the Express API.

### [`/src/swagger`](./src/swagger)

Contains the non path specific swagger definition objects. This defines, things like Open API version and package info. Additionally, contains a spec.yaml file which can be used to load resusable swagger referenceable objects for use in various input apis.

### [`/src/routes`](./src/routes)

Express routes for the api endpoints the app exposes. These routes are all decorated with Swagger annotations which are used to validate the incoming requests and resulting responses. Each set of sub-routes should be broken up into it's own file (e.g. routes beginning with `/auth/*` should go in a separate file called auth)


### [`/src/models`](./src/models)


## Code Style

This application follows the 

### Checking for lint

```
npm run lint
```

### Autofixing lint errors

```
npm run fix
```

Additionally, it's highly recommended that you use appropriate extensions so you can lint on the fly, like [prettier-vscode](https://github.com/prettier/prettier-vscode).

### Disabling ESLint

If you find you need to disable lint checking on a particular line of code, add an inline comment per [https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments]()

For example, you can disable the `no-alert` rule like so:

```
/* eslint-disable no-alert */

alert('foo');

/* eslint-enable no-alert */
```

## Commits

Please be as descriptive as possible with your commits. The more detail you give now, the more you'll have in the future when you're trying to remember why you or a teammate did a thing.

### Conventional Commits

Ideally, commits will follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) approach.

This eases the creation of release notes and helps ensure that your change is represented as accurately as possible.

We have added the `commitizen` package to this library and made it easy for you to start using `conventional commits`. When you are ready to commit, prep everything as usual, but instead of running `git commit` use the following instead:

```bash
yarn cz
```

This will run `commitizen` and give you a prompt to run through that builds your fully conventional commit message for you!

Alternatively, you can install it globally and use it on any project that has been set up for Conventional Commits:

```bash
// install globally
npm -g commitizen

// instead of git commit run commitizen
git-cz
```