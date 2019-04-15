[![Build Status](https://travis-ci.org/Japhethca/sms-manager.svg?branch=master)](https://travis-ci.org/Japhethca/sms-manager)
[![Coverage Status](https://coveralls.io/repos/github/Japhethca/sms-manager/badge.svg?branch=master)](https://coveralls.io/github/Japhethca/sms-manager?branch=master)
## SMS Managment Application
This is an SMS management API.

### Setup
- clone repository: https://github.com/Japhethca/sms-manager.git
- change directory to clone reposition `cd sms-manager`
- run `yarn install` to installed dependencies
- setup `.env` using template in `.env_sample` file
- run database migrations with `yarn db:migrate`
- run `yarn dev` to start developement server or `yarn start` to start production server
- test api endpoints on `http://localhost:3300/api/v1/`

### Test
Ensure you have setup your local `.env` file before continuing with test.
To start test,
- run `yarn test` or `yarn test:watch` to run test in watch mode.
- run `yarn test:coverage` to display test coverage


### API Documentation
[Go to Documentation]()
