# AppSumo Survey
An awesome survey management app that showcases my skills as a JavaScript Developer.
[Live Demo Here](http://sumo.downingdevelopmentllc.com/)

Using express framework, leveraging SequelizeJS MySQL.
## Installation Locally
1. Clone the repo: `git clone git@github.com:Dustin-Downing/AppSumo.git`
2. Install dependancies: `npm install`
3. Launch: `npm start`
4. Done! [Local App](http://localhost:8081/)

## Usage

###Login Page
Select New User and enter a username to create a new user.
Select Returning User and enter your username to login as that user.
  I decided not to protect the user's login since there is not way for a user to lookup or edit already answers surveys.

To login to admin dashboard click the line "Click here for admin login" under the login panel.
**NOTE: admin passport is 'HireDustin'**

###Welcome Page
After logging in as a user you will find yourself on the welcome page where you can answer surveys until there are no more in the system

###Admin dashboard
There are two pages here, one for creating new surveys and one for viewing the reports of old surveys
To create a new survey, fill out title, questions, and answers fields.

## Nice To Have's
I would like to keep working on this app to make it more flashy and cleaner so that I can better show you what I am capable of, but I'd rather hand it off now so that you can look at it this week.  I'd also like to point out that I've been working on this in my off time so this took me longer than it would if I was working for y'all full-time.

Here's a list of things I would change if I worked on it another day
1. Remove page turns by implementing ng-route
2. Create angular factory for each model
3. Error messaging for problems creating records
4. Database seeding for root admin on fresh install
5. Admin dashboard page for managing users and adding more admin
6. Use a Sequelize sanitizer to protect against SQL-injection
7. Clean up how the answers look when creating a survey
8. Clean up the way survey reports look
9. Login error messaging 

## Thanks
I would like to thank you for considering me as a future sumo!  I know that I would make a great addition to the team, and I look forward to talking with you soon about the position.
