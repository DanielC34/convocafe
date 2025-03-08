# Convo Cafe

## Description

Convo Cafe is a social media application that allows users to create an account, and chat with other users.

## Tech stack used

- MongoDB - NoSQL database to store the user data (user passwords, chat information etc...)
- Express.js
- Node.js - Both Express.js and Node.js used for the server
- Javascript websockets for communcation between users
- React.js for the UI components
- Zustand for state management

## Screenshots

### Login Page
![image](https://github.com/user-attachments/assets/d8552cd7-669d-48c5-9055-9a10bd56ee88)

### Sign-up page
![image](https://github.com/user-attachments/assets/838e7bec-fceb-464f-a0b6-2c7340dff365)

### User search

![image](https://github.com/user-attachments/assets/34ca7267-f9bd-4eef-a27a-8350a70f2f37)

### One to one communication
![image](https://github.com/user-attachments/assets/213d4646-81de-4198-8612-c8d1e79a3fce)

More features to be impelmented as improvements such as group chats, multimedia integration etc...


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

### Requirements

1. Install docker and docker-compose on your local machine. Then run the following command to start the application:

```
docker-compose up
```

Install project dependencies, to install necessary dependencies, run the following command:

```
npm install
```

### Setup environment variables

- Create a `.env` file in the root directory of the application
- update the `.env` by adding the same variables keys as the `.env.example` file

## Usage

### Run the application

To use the application, run the following command:

```
npm start
```
