Installation : -  npm install

Routes:- 


1. Register User:- 

    Request Type :  POST - "http://localhost:6000/api/auth/register" 
    Input Body :- {
        "username":"admin@123",
        "password":"admin@123" 
    } 

    Expected Output:- {
        "message": "User registered successfully.",
        "userId": "64c0f8b4a4d6e071467d422b"
        }

2. Login User:- 

    Request Type :  POST - "http://localhost:6000/api/auth/login" 
    Input Body :- {
        "username":"admin@123",
        "password":"admin@123" 
    } 

    Expected Output:-{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQDEyMyIsInVzZXJJZCI6IjY0YzBmOGI0YTRkNmUwNzE0NjdkNDIyYiIsImlhdCI6MTY5MDM2ODUzNywiZXhwIjoxNjkwMzcyMTM3fQ.IUh0J_nsx9pKLAS9MO7l9RfaXn01cMUp9sjFoqCBfmk",
    "userId": "64c0f8b4a4d6e071467d422b"
}


3. Add Category:- 

    Request Type :  POST - "http://localhost:6000/api/category/create" 
    Input Body :- {
    "categoryType":"electronic",
    "categoryName":"mobile"
}

    Expected Output:-{
    "categoryName": "mobile",
    "categoryType": "electronic",
    "createdAt": "2023-07-26T10:50:09.336Z",
    "_id": "64c0fa61a4d6e071467d422e",
    "__v": 0
}

4. Get Category:- 

    Request Type :  GET - "http://localhost:6000/api/category/get" 
    Input Body :- 

    Expected Output:-{
    "categoryName": "mobile",
    "categoryType": "electronic",
    "createdAt": "2023-07-26T10:50:09.336Z",
    "_id": "64c0fa61a4d6e071467d422e",
    "__v": 0
}
5. . Add Product:- 

    Request Type :  POST - "http://localhost:6000/api/product/create" 
    Input Body :- {
    "title":"Vivo",
    "description":"This is a Mobile",
    "price":"33232",
    "categoryId":"64c0fa61a4d6e071467d422e"
    
}

    Expected Output:-{
    "title": "Vivo",
    "price": "33232",
    "description": "This is a Mobile",
    "availability": true,
    "categoryId": "64c0fa61a4d6e071467d422e",
    "_id": "64c0fb2ba4d6e071467d4232",
    "__v": 0
}
6. get Product:- 

    Request Type :  POST - "http://localhost:6000/api/product/get" 
    Input Body :- 

    Expected Output:-{
    "title": "Vivo",
    "price": "33232",
    "description": "This is a Mobile",
    "availability": true,
    "categoryId": "64c0fa61a4d6e071467d422e",
    "_id": "64c0fb2ba4d6e071467d4232",
    "__v": 0
}
7. Add to Cart:- 

    Request Type :  POST - "http://localhost:6000/api/cart/addCart" 
    Input Body :- {
    "userId":"64c0f8b4a4d6e071467d422b",

    "productId":"64c0fb2ba4d6e071467d4232"
}

    Expected Output:-{
    "checkOutFlag": false,
    "productId": "64c0fb2ba4d6e071467d4232",
    "createdAt": "2023-07-26T10:56:14.589Z",
    "userId": "64c0f8b4a4d6e071467d422b",
    "quantity": 0,
    "_id": "64c0fbcea4d6e071467d4234",
    "__v": 0
}
8. View Cart:- 

    Request Type :  GET - "http://localhost:6000/api/cart/viewallcart" 
    Input Body :- 

    Expected Output:-{
    "checkOutFlag": false,
    "productId": "64c0fb2ba4d6e071467d4232",
    "createdAt": "2023-07-26T10:56:14.589Z",
    "userId": "64c0f8b4a4d6e071467d422b",
    "quantity": 0,
    "_id": "64c0fbcea4d6e071467d4234",
    "__v": 0
}

9. View Order History by id:- 

    Request Type :  GET - "http://localhost:6000/api/order/get/:id" 
    Input Body :- 

    Expected Output:-{
    "_id": "64c0fd21a4d6e071467d423a",
    "cartId": "64c0fbcea4d6e071467d4234",
    "orderId": "f38732ac-ca18-4dc6-931a-fdeab446ce9d",
    "userId": "64c0f8b4a4d6e071467d422b",
    "createdAt": "2023-07-26T11:01:53.683Z",
    "__v": 0,
    "cart": [
        {
            "_id": "64c0fbcea4d6e071467d4234",
            "checkOutFlag": true,
            "productId": "64c0fb2ba4d6e071467d4232",
            "createdAt": "2023-07-26T10:56:14.589Z",
            "userId": "64c0f8b4a4d6e071467d422b",
            "quantity": 0,
            "__v": 0
        }
    ]
}
