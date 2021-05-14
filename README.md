## Description

User microservice for user having 

1. User Registration
2. User Auth 
3. Role / Permission 
4. Assign/Revoke Permission to/from Role
5. Assign/Revoke Role to/from User

## Rest endpoints (JSON)

1 : User 

    - [ POST ] Create User (secure sign up from Super-Admin)
    - [ GET ] Get All Users
    - [ GET ] Get User by User UUID (with Relation Role, Permission assigned)
    - [ PUT ] Update User Details by User UUID
    - [ DELETE ] Delete User by User UUID
    - [ POST ] Sign In (JWT / OAuth)
    - [ POST ] Sign Out (JWT / OAuth)

  2 : Role (Roles Model)

    - [ POST ] Create Role
    - [ GET ] Get All Roles
    - [ GET ] Get Role by Role UUID
    - [ PUT ] Update Role Detals by Role UUID
    - [ DELETE ] Delete Role by Role UUID
      
  3 : Permission (Permissions Model)
    
    - [ POST ] Create Permission
    - [ GET ] Get All Permissions
    - [ GET ] Get Permission by Permission UUID
    - [ PUT ] Update Permission Detals by Permission UUID
    - [ DELETE ] Delete Permission by Permission UUID

  4 : Access Control
    
    - [ POST ] Assign a Role to User (Only One Role for a ID)
    - [ POST ] Revoke a Role from User 
    - [ POST ] Assign Permissions to Role (Multiple Permissions to a Role)
    - [ POST ] Revoke Permissions from Role (Multiple Permissions from a Role)

  5 : Miscellaneous
    
    - [ GET ] Health Check (Auth Token Validation for Health Response)
    - [ POST ] Heart Beat (To Service Discovery Module)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Stay in touch

- Author - [Niraj Sharma](https://github.com/nirajshar67)