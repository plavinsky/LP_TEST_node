# LP_TEST_node
Test task:  
https://docs.google.com/document/d/1vzJRwW8dwly9qYt-X-I0F-luObA3D_pAvawvIrLTm0w/edit?usp=sharing

## Stack: 
- node.js
- firebase

## Overview
The task took me a little longer, because I usually use the framework (Express, Next),  
but I decided to complete this task on the proposed stack, i.e. pure node without dependencies.

## Settings:
firebaseConfig initializes from env variables,   
to start the project u need to set it  
https://github.com/plavinsky/LP_TEST_node/blob/main/database/FireBase.js

## Examples:
GET http://localhost:3002/requestUser/1234567
- returns user with ID 1234567

POST 'http://localhost:3002/updateUser/' \
--header 'Content-Type: text/plain' \
--data-raw '{ "id": 12345,
"somefield": "something",
"foo": 1,
"bar": "foo",
"points": 5 }
'
- creates or updates user with id 12345



