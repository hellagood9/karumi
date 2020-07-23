This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![CI](https://github.com/hellagood9/karumi/workflows/CI/badge.svg)

# Karumi Code Challenge

by Maximiliano A. Sussini

## Stack

  - React: JS Library
  - Context / Hooks APIs: State (data) managment
  - React-router-dom: Routing
  - Sass: Styling
  - Github actions: Continuous Integration (CI)
  - Github pages / Netlify: Deploy
  - Netlify functions: Serverless functions
  - ESLint, Prettier, Stylelint: Quality code
  - Jest / Enzyme: Testing
  
## Scope of the project

- Login page (serverless function endpoint)
- Login form
- Form validation (required fields)
- Error management (in case the endpoint fails)
- Save a token (jwt) to some browser storage
- Protected page (redirects the user after logging in)
- Access to a browser storage and get the user jwt and validate it against an endpoint (serverless function)
- Redirect to login form if user is not authenticated

### Installation

Requires [Node.js](https://nodejs.org/) v11+ to run.

Install the dependencies and and start the react-app.

```sh
$ git clone https://github.com/hellagood9/karumi.git
$ cd karumi
$ yarn && yarn add netlify-cli -g
$ netlify dev
```

### URL
http://localhost:8888

### Credentials to Login

| Field | Value |
| ------ | ------ |
| username | doe@test.com
| password | 123456

### Routes

Instructions on how to use them in your own application are linked below.

| Route | Info |
| ------ | ------ |
| / | Homepage for authenticated users
| /login | Login page 

### Dependencies

### /client
- classnames
- node-sass
- prop-types
- react-helmet
- react-router-dom
- netlify-lambda

### Todo
- Improve the design/layout
- Toast or similiar to provide a better feedback to the user
- More testings
- CI for PRs
- Rollbar (or similar)

License
----

MIT

:muscle:
**Free Software, Hell Yeah!**
