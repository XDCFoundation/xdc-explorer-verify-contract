# XDC Explorer Verify Contract #

### Usage ###

This microservice basically handle Contract related services like -
* Verify contracts

### Steps for local setup ###

* Clone the repository in your local system
* Run `npm install` : To install the dependencies
* For run the microservice use SSH tunneling 
* Run `npm start` : It will start your server on your local machine
* Configuration : `config/env` directory contains files to define environment specific variables
* Dependencies : Defined under `package.json` 
* Database configuration : Defined under `config/dbConnection` 
* Deployment instructions : Docker based deployment, Dockerfile is there in parent directory

### About env folder ###

This folder is having different type of variable like DB url, PORT, microservice url etc.
* **development** : it have all variable which is use in apothem environment.
* **local** : it have all variable which is use for local system.
* **production** : it have all variable which is use for production environment.
* **test** : it have all variable which is use for testing purpose.
