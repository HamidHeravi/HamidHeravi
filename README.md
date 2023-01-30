## Hi there 👋

## Front Test Cases

#### Test Case ID : case_01
#### Test Case Description : Login and order the cheapest product by the standard user
#### Test Data : 
- username : standard_user
- password : secret_sauce

#### Test Steps	:
- Go to 'https://www.saucedemo.com/'.                             
- Enter username and password of standard user.                     
- Change the sort from 'Name(a-z)' to the 'Price(low to high)'.
- Add to card the first product.
- Go to your card page and click on checkout button.
- In the information page enter random information for the user.
- In the checkout: overview page check the order information and click on the finish button

#### Expected Result :
- The users must be able to register their orders after entering the correct information.

#### Actual Result :
- In the 'CHECKOUT: YOUR INFORMATION' page, for the zip/postal code users can enter any character and the system will not show them an error.

## Backend Test Cases

#### Test Case ID : case_02
#### Test Case Description : Create a new user and make sure it is added to the system.
#### Test Data : { "name": "morpheus", "job": "leader" }

#### Test Steps	:
- Send request and in the API response check the name and job.
- the 'CreatedAt' date and time should be now time.
- copy id from response and use it in the 'Single user' API

#### Expected Result : the user should be added in the system
#### Actual Result : The new user is not added to the system



