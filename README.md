# OTOT-C

## Testing REST API through Postman
This application demonstrates authentication and authorisation of user accounts created through this REST API.

### 1. Register an account
#### Ordinary Account
- Path: `/register`
- This will associate this account with role "user"

#### Admin Account
- Path: `/register/admin`
- This will associate this account with role "admin"

Request Method: `POST`

Body: 
```
{
    "username": [enter username],
    "email": [enter email],
    "password": [enter password],
}
```


### 2. Login to account
Path: `/login`

Request Method: `POST`

Body: 
```
{
    "email": [enter email - all lowercase],
    "password": [enter password],
}
```

- This will generate a JWT associated with your account in order to authenticate and give your account access.
- Successful login will return user details, take note of "token", will be used in following step.


### 3. Check if user is authenticated
Path: `/welcome`

Request Method: `GET`

Body: 
```
{
    "token": [paste token returned from /login],
}
```


### 4. Check if user is authorised
Path: `/admin`

Request Method: `GET`

Body: 
```
{
    "token": [paste token returned from /login],
}
```

- User can only access this page if authenticated (possess token) and authorised (have account role "admin").