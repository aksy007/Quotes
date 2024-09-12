# Crafto.app assignment
To create an user - use a unique username and pass OTP as 1234
curl --location 'https://assignment.stage.crafto.app/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sandy",
    "otp": "1234"
}'


To upload an image and get mediaUrl in return
curl --location 'https://crafto.app/crafto/v1.0/media/assignment/upload' \
--form 'file=@"/<PATH>/<NAME>.jpg"'


To create an quote - add some text and mediaUrl obtained from previous API
curl --location 'https://assignment.stage.crafto.app/postQuote' \
--header 'Authorization: <TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
    "text": "This is a quote",
    "mediaUrl": "https://media.crafto.app/home/900x900/4653c87a-83f8-4326-afa0-1a06086550ef?dimension=900x900"
}'


To get quotes - pass limit and offset as query params
curl --location 'https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0' \
--header 'Authorization: <TOKEN>'


Task:
Create a frontend application using the above APIs 
The application should have 3 pages

1. Login page - should have username and otp inputs and a submit button

2. Quote list page - show paginated list of quotes
Has a floating action button to create quotes
Display image stored in mediaUrl - overlay text over the image
Below image - show username and created_at
When API returns an empty response stop the pagination

3. Quote creation page - with quote text and image upload option
Use the media upload API to get mediaUrl. then submit this in create quote API along with text

Note: The exact UI and UX of the application is up to the candidate
The final application should be responsive and optimised for mobile devices


Submission:
The candidate needs to upload code in a git repository (github / alternatives), and add install + run instructions in README.md.
(Bonus points for hosting the project at a cloud provider of your choice)
