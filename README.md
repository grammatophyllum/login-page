# Login Page Demo

Slides: https://docs.google.com/presentation/d/1lBpW_37gSuSrXi7FX3nEjZhd-RsjX_4t0onq0-tEfAY/edit?usp=sharing
A basic HTML/CSS/JavaScript login and signup form that connects to a remote server (Google Apps Script) to handle authentication.

## Description

- Switch between **Login** and **Signup**
- Simple **input validation** (alphanumeric, minimum 4 characters)
- Connects to server via `fetch()`:
  - **GET** request for login
  - **POST** request for signup
- Displays a welcome message on successful login
- Includes basic UI feedback (error messages, loading spinner)
