# Library Management System

##Routes and Endpoints 

###/users
POST: Create a new user
GET: get all list of users

###/users/{id}
GET:Get a user by ID
PUT: Update a user by ID
DELETE: Delete a user by ID (Check if user has any issued books) & (check if user has any fine to be paid)

SUBSCRIPTIONS
>>3 months
>>6 months
>>12 months

### /users/subscription-details/{id}
GET: Get user subscription details
    >> Date of subscription
    >> Till when its valid
    >>Fine if any exists

### /books
GET:Get all books
POST:Create/add a new book

### /books/{id}
GET:Get a book by ID
PUT: Update a book by ID

### /books/issued
GET:Get all issued books with fine

#Subscription Types
    >>Basic (3 months)
    >>Standard(6 months)
    >>Premium(12 months)

MVC Architecture
    >>Model (Sturcture of MongoDb Collection/Schema)
    >>View (React)
    >>Controllers (Brain of our routes)

    >>>>Thank you