# Assignment Submission Portal

This Assignment Submission Portal allows **users** to upload assignments and **admins** to review and manage these submissions. The application is built with **React** for the frontend and **Node.js/Express** for the backend, with MongoDB as the database to store user and assignment data.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features
- **Users** can register, login, and upload assignments.
- **Admins** can register, login, view assignments tagged to them, and accept or reject assignments.
- Secure authentication for both users and admins using JWT.

## Technologies Used
- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Environment Variables**: `.env` file to store sensitive keys


## Project Setup

### Backend Setup
1. Clone the repository:
```bash
https://github.com/Divesh1207/growthx-assignment.git

cd growthx-assignment/backend
```


 
2.  Install the required dependencies:

```bash

npm install
```

3.Create a .env file in the Backend directory with the following content:

```bash

MONGODB_URL=your_mongodb_connection_string
PORT=5000
SECRET_KEY=your_secret_key



```

4. Start the backend server:

```bash

npm run dev


```
This will start the backend server on http://localhost:5000.

### Frontend Setup

1. Navigate to  Frontend directory:

```bash

cd growthx-assignment/frontend


```


 
2.  Install the required dependencies:

```bash

npm install
```



3. Start the frontend server:

```bash

npm run dev

```
## Environment Variables

## Backend Environment Variables

- **PORT**="Your backen port number"
- **MONGO_URI**="your mongo uri"
- **JWT_SECRET**=your random jwt secret
- **FRONTEND_URL**=your frontend FRONTEND_URL
 
## Usage

### User Actions

1. **Register**:  
   Register as a new user by sending a POST request to `/register`.  
   Once registered, you can start uploading assignments.

2. **Login**:  
   Log in with your credentials to get a JWT token by sending a POST request to `/login`.  
   After logging in, you will be able to upload assignments.

3. **Upload Assignments**:  
   As a logged-in user, you can upload assignments by sending a POST request to `/upload`.  
   The assignment details should be included in the request body.

### Admin Actions

1. **Admin Registration**:  
   Admins can register by sending a POST request to `/admin/register`.  
   Provide the necessary details in the request body.

2. **Admin Login**:  
   Admins can log in by sending a POST request to `/admin/login`.  
   After successful login, admins will receive a JWT token for authentication.

3. **View Assignments**:  
   Admins can view all assignments tagged to them by making a GET request to `/assignments`.  
   This will return a list of assignments that are pending or assigned to the admin.

4. **Accept/Reject Assignments**:  
   Admins can either accept or reject assignments by sending a POST request to `/assignments/:id/accept` or `/assignments/:id/reject`.  
   - To accept: `POST /assignments/:id/accept`
   - To reject: `POST /assignments/:id/reject`

   Replace `:id` with the assignment ID you wish to manage.


 
## License

This project is licensed under the MIT License. See the LICENSE file for more details.

[MIT](https://choosealicense.com/licenses/mit/)
