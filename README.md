# RESTful API ![travis build status](https://travis-ci.com/tganyan/11-14-express-api.svg?branch=master)

This is a project to build a restful api with the ability to get, put, post, and delete json data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You must have NodeJS installed along with either NPM or Yarn.

### Installing

Copy the link from the github repository
In the command line, navigate to the parent directory where you want to store this project
In the command line, type:
```
git clone <repository url>
```
Once the project files are there, type:
```
npm install
```
or
```
yarn i
```

## Running the tests

1. Testing for valid post request on mountain 
2. Testing for valid post request on region
3. Testing for valid response on invalid post request on mountain
4. Testing for proper response on bad route request on mountain
5. Testing for proper response on valid route with no id on mountain
6. Testing for valid put request on mountain

##### To run individual tests (GET, PUT, POST, DELETE), use the below routes:
```
/api/mountains/
/api/regions/
```

##### To run all tests:
```
npm run test
```

## Built With

* [NodeJS](https://nodejs.org) - The javascript runtime used
* [Jest](https://jestjs.io/) - Testing platform used
* [Eslint](https://eslint.org/) - Coding style linter
* [Superagent](https://visionmedia.github.io/superagent/) - AJAX with less suck!
* [Httpie](https://httpie.org/) - A fantastic http client
* [Winston](https://www.npmjs.com/package/winston) - One seriously awesome logging tool
* [Express](https://www.npmjs.com/package/express) - A robust and versatile tool for creating servers
* [Faker](https://www.npmjs.com/package/faker) - A useful package for generating fake test data
* [Body Parser](https://www.npmjs.com/package/body-parser) - A middleware tool for parsing requests
* [MongoDB](https://www.mongodb.com/) - A dynamic database
* [Mongoosejs](https://www.npmjs.com/package/mongoose) - An asynchronous object modeling tool


## Authors

* [**Tyler Anyan**](http://tyleranyan.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
