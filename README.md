# restd
Api for the various services :fire::fire::fire:

### Prerequisites

#### Software

##### Optional

_(Windows)_
* Install [chocolatey](https://chocolatey.org/), this is a package manager which helps install the required software.

_(Mac OSX)_
* Install [homebrew](http://brew.sh/), this is a package manager which helps install the required software.

##### Required

* git (_...Duh_):
  * (Manually) Go to https://git-scm.com and download the latest version of git.
  * (homebrew) `brew install git`
  * (chocolatey) `choco install git`
* Nodejs:
  * (Manually) Go to www.nodejs.org and download the latest stable version. (At the moment it is LTS v10)
  * (homebrew) `brew install node`
  * (chocolatey) `choco install nodejs.install`
* gulp (requires Nodejs)
  * From the command line run: `npm install -g gulp`

### Getting Started


Clone the repo:
```
$ git clone https://github.com/alessandrocm/node-template.git
$ npm i
```

__Run__
```
$ npm start
```

Is it running? Good work, go ahead and pat yourself on the back. Well done sir or lady. :sunglasses:

### Tasks

__Test Tasks__

This task runs all the API tests in the `/test` directory.
```
$ npm test
```

### API Documentation
With the api running go to `http://localhost:3000/api-docs` to view swagger documentation.
