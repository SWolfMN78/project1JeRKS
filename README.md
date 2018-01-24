# project1JeRKS
This is a demo web applciation built as a group project created for a Full Stack JavaScript Coding Boot

The actual Application name is called MyShindig. A demo of the application is deployed via GitHub Pages at [https://swolfmn78.github.io/project1JeRKS/](https://swolfmn78.github.io/project1JeRKS/)

MyShindig is a mult-user potluck/event organizing application, where the host sets up an event, invites guests, plans menus, and so forth.

The main technologies used are [Firebase](https://firebase.google.com/), [jQuery](https://jquery.com/
), and [Bootstrap](https://getbootstrap.com/). Additional technologies used are apis [Yummly](http://api.yummly.com/), [smtp2go](https://www.smtp2go.com/), and [iziModal](http://izimodal.marcelodolce.com/).


### Overview

The goal of the app is to be able to plan any type of event. For the initial development, we have focused on potluck events to demonstrate the app.

The application is lets an Event Host SignUp/Login, and create an event. The event could have a theme (different types of food, eventually would be expanded), a specific food-course, date/address, and guest email addresses associated with it.

It should also let users and guests view the menu's event and select what dishes they are bringing.

###


### Running the app yourself:
#### Clone the repository

```
git clone https://github.com/SWolfMN78/project1JeRKS
#or using SSH
git clone git@github.com:SWolfMN78/project1JeRKS.git
cd project1JeRKS
```

You need a Firebase database available. We are not able to provide instructions, but the database rules, you should be able to use the default coniguration:
```
{
  "rules": {
   ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
