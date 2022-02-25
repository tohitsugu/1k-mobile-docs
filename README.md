DevX-Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. This project uses git submodules.

### Prerequisities

NodeJS: v14 or higher
MongoDB: v4.2.1 or higher

### How to run project:

1.  Devx-Frontend:-

    a) Clone the main repository git clone https://github.com/1KBlockID/devx_frontend.git. Clone of main repository will not pull the submodules. You need to execute step 'b' as well.

         git clone https://github.com/1KBlockID/devx_frontend.git

    b) To pull a Git submodule, use the “git submodule update” command with the “–init” and the “–recursive” options. This command will register the git submodule directory path for 'docs' folder.

        git submodule update --init --recursive

    c) In order to update an existing Git submodule, you need to execute the “git submodule update” with the “–remote” and the “–merge” option.

        git submodule update --remote --merge

2.  Devx-Backend:-

    Devx Webserver GitHub: $ git clone https://github.com/1KBlockID/devx_backend.git # or clone your own fork.

3.  Due to strong CORS protection you have to run web server locally.

4.  Install dependencies in the both repositories (npm install)

        npm install

5.  Set up .env files in the both repositories:

    On Website use .env-example to create .env file
    On Webserver all the possible variables are in the README.md, the only required variable that should be set - NODE_ENV=local

6.  Install and run mongo DB
7.  Run Webserver with npm run start:local.
8.  Run Website with npm run start

- Website will run on localhost:3001/devportal/

- Webserver will run on localhost:3000

- Swagger you can find on localhost:3000/docs

Deployed website you can find on https://starkindustries-dev.1kosmos.net/devportal
