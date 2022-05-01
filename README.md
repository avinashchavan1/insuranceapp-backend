# Insurance App - Backend

The Insurance App backend is built using REST Framework. The backend will serve the user requests for viewing, upadting and policy analytics.

## Technologies used
- NodeJs
- ExpressJs
- MongoDB 

## Features
- Get All policies 
- Get Policy by Policy ID
- Get Policies by user ID
- Update the Policy details.
- Serve endpoint for Analytics
- Enforcing the constraints given.

## Endpoints
### GET
- /policy/userId/:id
- /policy/policyId/:id
- /policy//policies/:region

### Post
- /policy//update

Request Body Example 

```
{
    "_id": "626cbd6e39d56f5474e42d62",
    "id": 12345,
    "date_of_purchase": "1/16/2018",
    "customer_id": {
        "_id": "626cbd5639d56f5474e427c9",
        "id": "400",
        "gender": "Male",
        "income": "0- $25K",
        "region": "North",
        "marital_status": "0",
        "__v": 0
    },
    "vechile_segment": "A",
    "fuel": "Disesl",
    "premium": 960,
    "bodily_injury_liability": 0,
    "personal_injury_protection": 0,
    "property_damage_liability": 0,
    "collision": 1,
    "comprehensive": 1,
    "__v": 0
}
```


## Prerequisite to run the project
- Have Nodejs installed 
- Also add all the connection details for database in `index.js` file.


## Steps to run this project:

1. Run `npm install` command
3. Run `npm start` command
