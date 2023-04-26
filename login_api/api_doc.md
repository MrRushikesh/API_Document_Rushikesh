# GetAllUser (GET)
> http://localhost:5000/api/auth/users

# Register Users (POST)
> http://localhost:5000/api/auth/register 

(body) => 
{"name":"Rushikesh", "email":"rushi@gmail.com","password":"12345678","phone":343432, role?":"user"}

# Login User (POST) 
> http://localhost:5000/api/auth/login 
(body) => 
{"email":"aa@gmail.com","password":"12345678"} (response)=> {auth:true,token:'12ursl34lsjdshfkjfl899ddsvg'}

# Get User Information (GET) 
> http://localhost:5000/api/auth/userinfo (Header) => {'x-access-token':'token value from login'}