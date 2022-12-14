# Crunchyscroll
 ### [Crunchyscroll](https://crunchyscroll.herokuapp.com/) is a full-stack Crunchyroll clone with a focus on stories instead of videos.


#### Join a community of short story lovers! Read, post, and save stories to your own crunchylists. Drop reviews on your favorite pieces and vote on which reviews are the most helpful. 
 >Reviews are sorted by their "helpfulness" so users can gain insight into what the community thinks about a story at a glance.
 
## Frontend technologies used:
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 

## Backend technologies used:
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />   ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) 

## How to run app locally
* Run "git clone" with the copy/pasted repo link in whatever directory you want the clone to live.
* Open the repo locally on the IDE of your choice and cd into the root directory.
* Run `pipenv install -r requirements.txt` to install dependencies.
* Run `pipenv shell`.
* Run `flask db upgrade`.
* Run `flask seed all`.
* Run ` flask run` to start the backend.
* In a new terminal, cd into the "react-app" directory and run `npm install`
* Then run `npm start` to start the frontend.
* Congrats! The app should now be running locally (Chrome works best).

## WikiLinks
* [Core User Stories](https://github.com/benwaldee/crunchyscroll/wiki/Core-User-Stories)
* [Database Schema](https://github.com/benwaldee/crunchyscroll/wiki/Database-Schema)
* [Features](https://github.com/benwaldee/crunchyscroll/wiki/Features)
* [Wireframes](https://github.com/benwaldee/crunchyscroll/wiki/Wireframes)

## Feature Walkthrough

### Splash Page / Home Page
* Here you can view the short stories that users have posted on the site! 
* In order to gain more access to the features, click the profile button in the top right, and click "Log in" in the drop down.

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318484432064634/unknown.png)
![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318559606587453/unknown.png)

### Log in / Sign up Page
* Click the "demo" button in order to log in as a demo user. You will be redirected back to the splash page.

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318679702097970/unknown.png)

### My Stories Page
* Click the "Add" button to begin creating a story! Enter the proper information (including a valid image url) and click "add story" to create the story.
* The new story will appear at the top of the page, click on it in order to navigate to the story-specific page and review it.

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318783192350760/unknown.png)
![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318818613239839/unknown.png)

### Story-by-id Page
* Here you can click the "Add a review" button in order to make a new review for this story. Enter the proper information and click "Add" to save it!
* Now, you can vote on this review to indicate to others that it is helpful, or vote no if you are your own worst critic. Your own review will always sort to the top, but feel free to log out to see how reviews are sorted by positive votes.
* Also on this page, you can add or remove the story to/from your watchlist, as well as add the new story into any one of your custom crunchylists. 
* When you are finished, click the flag/bookmark icon in the top right to navigate to the list page.

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027318943733530624/unknown.png)
![image](https://cdn.discordapp.com/attachments/586690728751661146/1027319002332143636/unknown.png)

### Lists Page
* If you added the new story to your watchlist, it should be there!
* Click on the crunchylist tab to render your custom lists. Click on the "Create new list" button to add your own list!
* There wont be any items in it yet, but feel free to add stories to it from the story-by-id page or click on a list with stories to navigate to the list-by-id-page.

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027319078551048304/unknown.png)
![image](https://cdn.discordapp.com/attachments/586690728751661146/1027319121819484283/unknown.png)

### List-by-id Page
* If you added the new story to your new crunchylist, it should be there!
* Click on each story to navigate to the specic story page, or delete some of them to watch them disappear from your list!
* Congrats! You have now finished a basic walkthrough of some of the features on the site. Feel free to click around to explore more features, click on the sun for light mode, or just to try to break it :)

![image](https://cdn.discordapp.com/attachments/586690728751661146/1027319265235320932/unknown.png)

## Future Plans

* A search bar would be a neat component to add functionality to the site. I would also like to switch from image URLs to AWS.
