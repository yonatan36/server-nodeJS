# Server nodejs

The project aims to create a web application called "yoyo" that allows users to manage and share digital business cards.

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

1. Extract the folder from the provided zip file and after Navigate to the extracted project folder.
2. Open the project in your preferred code editor.
3. Install the required packages by running the command `npm install`.
4. Make sure that the data base was created in the mongodb.
5. In VSCode,you can run in two environments the first environment development start the server: using the command `npm run dev` the seconed is environment production using the command `npm start` .
6. Welcome! access the server now you can use poostman to checked the requests you can find all the requests in folder routs/api .

# card object

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

# user object

{
"name":{
"firstName":"kenny",
"lastName":"jonson"
},
,"phone":"0500000000",
"email":"kenny@gmail.com",
"password":"Aa123456!",
"address":{
"country":"Israel",
"city":"Ashkeluna",
"street":"nof ha hof",
"houseNumber":255
},
"isBusiness":true
}

# login object

{
"email": "admin@gmail.com",
"password": "Aa123456!"
}


## Contact

If you have a question about the project - I'd love to be in touch! my email: yonatantaub36@gmail.com
