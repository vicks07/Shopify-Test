** Test Shopify App **

> [Shopify link](https://viktest.myshopify.com/)
> [Application Link](https://vik-shopify.herokuapp.com/)

> Tasks -
1. API's
    - [x] Store New Order : 
        POST - /order
    - [x] List All Orders :
        GET - /orders
    - [x] List A Specific Order :
        GET - /order/:id
    - [x] Update an Order :
        PATCH - /order
        Body: {
            id: (Unique Id),
            phone: (Phone Number),
            email: (Email)
        }