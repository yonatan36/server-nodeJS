# Server nodejs

The project aims to create a requst API to server application using Node.js that incorporates various technologies and libraries for enhanced functionality.

## The project was built using the following technologies:

- Express Server
- morgan
- cors
- http
- joi
- bcryptjs
- mongoose
- jwt-decode
- logger
- chalk

## Running the Project

To run the project, follow these steps:

1. Extract the folder from the provided zip file and navigate to the extracted project folder.
2. Open the project in your preferred code editor.
3. Install the required packages by running the command `npm install`.
4. Make sure that the database was created in MongoDB.
5. In VSCode, you can run the project in two environments: development and production.

   - For the development environment, start the server using the command `npm run dev`.
   - For the production environment, start the server using the command `npm start`.

6. Welcome! access the server now you can use poostman to checked the requests you can find all the requests in folder routs/api .

## card object

```json
{
  "title": "card1",
  "subTitle": "sub card 1",
  "description": "save the card pls",
  "phone": "0500000000",
  "email": "admin1@gmail.com",
  "image": {
    "url": "https://www.google.com/",
    "alt": "search your img in google"
  },
  "address": {
    "country": "Israel",
    "city": "Ashkeluna",
    "street": "jump street",
    "houseNumber": "23"
  }
}
```

## user object

```json
{
  "name": {
    "firstName": "kenny",
    "lastName": "jonson"
  },
  "phone": "0500000000",
  "email": "kenny@gmail.com",
  "password": "Aa123456!",
  "address": {
    "country": "Israel",
    "city": "Ashkeluna",
    "street": "nof ha hof",
    "houseNumber": 255
  },
  "isBusiness": true
}
```

## login object

```json
{
  "email": "admin@gmail.com",
  "password": "Aa123456!"
}
```

## API Documentation

The following API endpoints are available in this project:

### GET /users

- **REST Method:** GET
- **URL Request:** /users
- **Authentication:** admin only
- **Request:**
  - must provide token

Retrieves a list of all users in the system.

### GET /users/:id

- **REST Method:** GET
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Retrieves a specific user by their ID.

### POST /users

- **REST Method:** POST
- **URL Request:** /users
- **Authentication:** No
- **Request:**
  - body:
    - `name`: The name of the user. [object]
      - `first`: The first name of the user. [string]
        - Required.
      - `middle`: The middle name of the user. [string]
      - `last`: The last name of the user. [string]
        - Required.
    - `phone`: The phone number of the user. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 050-0000000)
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `password`: The password for the user account. [string]
      - Required.
      - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).
    - `image`: The image of the user. [object]
      - `url`: The URL of the image. [string]
        - Format: valid URL.
        - Required.
      - `alt`: The alt text for the image. [string]
        - Required.
    - `address`: The address of the user. [object]
      - `state`: The state of the user's address. [string]
      - `country`: The country of the user's address. [string]
        - Required.
      - `city`: The city of the user's address. [string]
        - Required.
      - `street`: The street of the user's address. [string]
        - Required.
      - `houseNumber`: The house number of the user's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the user's address. [number]
        - Minimum length: 4.

Registers a new user in the system.

### POST /users/login

- **REST Method:** POST
- **URL Request:** /users/login
- **Authentication:** None
- **Request:**
  - body:
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
    - `password`: The password for the user account. [string]
      - Required.
      - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).

Logs in a user with the provided email and password.

### PATCH /users/:id

- **REST Method:** PATCH
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Updates the user role to a business user

### PUT /users/:id

- **REST Method:** PUT
- **URL Request:** /users/:id
- **Authentication:** the registered user only
- **Request:**
  - must provide token
  - body:
    - `name`: The name of the user. [object]
      - `first`: The first name of the user. [string]
        - Required.
      - `middle`: The middle name of the user. [string]
      - `last`: The last name of the user. [string]
        - Required.
    - `phone`: The phone number of the user. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 050-0000000)
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `image`: The image of the user. [object]
      - `url`: The URL of the image. [string]
        - Format: valid URL.
        - Required.
      - `alt`: The alt text for the image. [string]
        - Required.
    - `address`: The address of the user. [object]
      - `state`: The state of the user's address. [string]
      - `country`: The country of the user's address. [string]
        - Required.
      - `city`: The city of the user's address. [string]
        - Required.
      - `street`: The street of the user's address. [string]
        - Required.
      - `houseNumber`: The house number of the user's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the user's address. [number]
        - Minimum length: 4.

Updates a specific user by their ID.

### DELETE /users/:id

- **REST Method:** DELETE
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Deletes a specific user by their ID.

### GET /cards

- **REST Method:** GET
- **URL Request:** /cards
- **Authentication:** None
- **Request:** None

Retrieves a list of all cards.

### GET /cards/my-card

- **REST Method:** GET
- **URL Request:** /cards/my-card
- **Authentication Needed:** business user
- **Request:**
  - must provide token

Retrieves the card associated with the authenticated user.

### POST /cards

- **REST Method:** POST
- **URL Request:** /cards
- **Authentication:** business user
- **Request:**
  - must provide token
  - body: -`title`: The title of the card. [string]
    - Required.
    - `subTitle`: The subtitle of the card. [string]
      - Required.
    - `description`: The description of the card. [string]
      - Required.
      - Maximum length: 1024 characters.
    - `phone`: The phone number associated with the card. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 0502-0000000).
    - `email`: The email address associated with the card. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `web`: The website URL associated with the card. [string]
      - Format: valid URL.
    - `image`: The image associated with the card. [object]
      - `url`: The URL of the image. [string]
      - `alt`: The alt text for the image. [string]
    - `address`: The address associated with the card. [object]
      - `state`: The state of the card's address. [string]
      - `country`: The country of the card's address. [string]
        - Required.
      - `city`: The city of the card's address. [string]
        - Required.
      - `street`: The street of the card's address. [string]
        - Required.
      - `houseNumber`: The house number of the card's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the card's address. [number]
        - Minimum length: 4.

Creates a new card.

### PUT /cards/:id

- **REST Method:** PUT
- **URL Request:** /cards/:id
- **Authentication:** owner user only
- **Request:**
  - must provide token
  - body: -`title`: The title of the card. [string]
    - Required.
    - `subTitle`: The subtitle of the card. [string]
      - Required.
    - `description`: The description of the card. [string]
      - Required.
      - Maximum length: 1024 characters.
    - `phone`: The phone number associated with the card. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 0502-0000000).
    - `email`: The email address associated with the card. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `web`: The website URL associated with the card. [string]
      - Format: valid URL.
    - `image`: The image associated with the card. [object]
      - `url`: The URL of the image. [string]
      - `alt`: The alt text for the image. [string]
    - `address`: The address associated with the card. [object]
      - `state`: The state of the card's address. [string]
      - `country`: The country of the card's address. [string]
        - Required.
      - `city`: The city of the card's address. [string]
        - Required.
      - `street`: The street of the card's address. [string]
        - Required.
      - `houseNumber`: The house number of the card's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the card's address. [number]
        - Minimum length: 4.

Updates a specific card by its ID.

### PATCH /cards/:id

- **REST Method:** PATCH
- **URL Request:** /cards/:id
- **Authentication:** registered user
- **Request:**
  - must provide token

Add or remove like from the card's likes array

### DELETE /cards/:id

- **REST Method:** DELETE
- **URL Request:** /cards/:id
- **Authentication:** admin or owner user
- **Request:**
  - must provide token

Deletes a specific card by its ID.

## Contact

If you have a question about the project - I'd love to be in touch! my email: yonatantaub36@gmail.com
