# reign aplication test

## Prerequisites
Before running, node.js, npm and git should be installed, then clone this repository and run the next command in both folders *reign* and *reignApi*:
```
npm install
```

## Running the app
To run the back-end, run the next command into the *reignApi* folder:
```
node server.js
```
The backend app is going to check the api every 3600000 miliseconds (1 hour) and insert the news into the DataBase.

To run the front-end, run the next command into the *reign* folder:
```
npm start
```
## MongoDB
The MongoDB is running into the cloud:
* [MongoDB](https://www.mongodb.com/cloud/atlas) - An on-demand fully managed service. MongoDB Atlas runs on AWS, Microsoft Azure, and Google Cloud Platform.

## Built With
* React wth Typescript
* Express
* Node.js
* Material-ui
* Mongoose
* Axios
* Moment
* MongoDB
