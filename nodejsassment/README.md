Node.js Assessment Project

step 1 : - Install  run in cmd 
    "npm install"

step 2 : - Run
    "npm start"

APIs

1. register
        POST /api/auth/register routes with body
        {
            "name": "Abhishek Doe",
            "email": "john@example.com",
            "password": "123456",
            "role": "admin",
            "phone": "9999999999",
            "city": "Mumbai",
            "country": "India"
        }
2. login
        POST /api/auth/login
        {
        "email": "abhi@gmail.com",
        "password": "123456"
        }

3. get api of all users
    GET /api/auth/users  (Admin only)
    In headers [
        {"key":"Authorization","value":"Bearer <generated token after login>}]

4. get by id
    GET /api/auth/users/:id (Admin is access any user, Staff access only own profile)
    In headers [
        {"key":"Authorization","value":"Bearer <generated token after login>}]
