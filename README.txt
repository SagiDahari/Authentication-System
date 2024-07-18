# Authentication-System

This project is a secure authentication and authorization system built with Angular, NestJS, and MySQL. This project's main folder contains two separate projects, one is a secure version and the other is a vulnerable version.
This project aims to provide a robust and scalable solution for managing user authentication and password reset functionalities in a secured manner, and showcase vulnerabilities and how to take care of them.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Features

- User registration and login
- Password reset functionality
- JWT-based authentication
- Secure password storage with bcrypt
- Vulnerable version of the system to attacks like XSS and SQL injection.

## Technologies

- Angular
- NestJS
- MySQL

## Prerequisites

- Node.js (version 21.7.1)
- MySQL

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/SagiDahari/Authentication-System.git
    cd Authentication-System
    ```

2. **Backend setup: (the same applies for the vulnerable version in the folder "project-vulnerable")**

    ```sh
    cd project-secured/nest-auth
    npm install
    ```

3. **Frontend setup:**

    ```sh
    cd ../angular-auth
    npm install
    ```

## Usage

### Backend

To start the NestJS backend:

```sh
cd nest-auth
npm run start:dev
```
In the nest-auth/src/app.module.ts file, change your username and password to your username and password, in order for the DB to run.

### Frontend

To start the Angular frontend:

```sh
../angular-auth
ng serve
``` 
### Access the application:

 - Frontend: http://localhost:4200
 - Backend: http://localhost:3000

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.