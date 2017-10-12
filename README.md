#Party Lemur v1.0
A SPA that gives users the ability to login, create party invitations using their own artwork, and save them for future use in email or print.

Overview:
The main goal of the application was to build a tool that users can easily utilize to create their own invitations.  My main focus started with planning and the UI/UX thought process to pin down the full level of functionality I would need.  

```
User Story Goals:
[x] As a user, I want to be able to log in and create an invitation for my party
[x] As a user, I want to be able to upload my own artwork or photographs to add to my invitation
[x] As a user, I want to be able to add the saved artwork or photographs
	[x] I want to be able to move each added piece
	[x] I want to be able to scale each added piece
	[x] I want to be able to layer each added piece
[x] As a user, I want to be able to add text to my invitation
	[x] I want to be able to move the text
	[x] I want to be able to change font color
	[x] I want to be able to change font size
	[x] I want to be able to layer the texts
[x] As a user, I want to be able to save my progress
[x] As a user, I want to edit my past invitations
[x] As a user, I want to save my invite to my desktop
[x] As a user, I need the saved image to be print quality
[x] As a user, I want to organize my invites by party and date
[x] As a user, I want to be able to edit my parties’ information and add multiple invites
```

To Achieve the above goals I utilized many technologies listed below:
- Javascript
- AngularJS 1.6
    - Angular libraries:  naif.base64, ngFileSave, ui.bootstrap, ngRoute
- JQuery
- Bootstrap grid system
- HTML5 -> utilized the canvas element functionality for the tool
- CSS3/Sass
- GruntJS
- Firebase

Description of process for the tool:
In order to achieve the UI/UX I wanted the user to have, I chose to utilize HTML5’s canvas element.  This gave me an extensive amount of control that I could give to the user through ‘buttons’ and ‘tools’.  It renders blob data types and base64 image encoding with scaleable and controllable resolutions.  The biggest hurtles I ran across were with storage and the very obvious functionality of canvas.  Canvas doesn’t layer naturally, it ‘draws’ or renders each pixel which means it immediately flattens the result.  There is no way to remove the pixel data underneath, so manipulating the canvas meant manipulating the whole image as a brand new image.  To overcome this issue I knew I needed to store a memory of movements dictated by the user.  The layering effect is achieved by adding each image or text type in order dictated by the user.  This allowed me to script the logic in such a way that the user could manipulate each layer.  After each manipulation the entire array of objects with their updated placement and manipulation [scale, location, existence] is re-rendered into canvas.  Building this layer system allowed me to give maximum usability to the user.

Resources for knowledge and morale
Links-> resources to some research

After the logic was created, I was able to use a combination of CSS and Angular to give the user a ‘live update’ view of their invitation.  I dynamically print all layers in order that they are created into the user’s view to the left so they can delete layers they no longer want.
[v2 will allow for drag and drop and changing a layer’s z-index on the canvas]
SCREENSHOT - website

The user has a location for creating a layer that allows them to chose if it’s a text or image from their full library of saved images.
SCREENSHOT - website
```
CODE SNIPPET -> show angular code
```

The user can then utilize the manipulation buttons on each layer that will manipulate each object’s data that tells my canvas drawing function how to render or re-render the new graphic.
SCREENSHOT -> website
```
CODE SNIPPET -> show draw function and a button function
```

For added organization for the user, I wanted to give them a dashboard that allows them to view their invites, uploaded photos, and their list of parties.
SCREENSHOT OF DASHBOARD

The user can view their invitations that are saved to a party as well as view parties and add an invitation that hasn’t been created yet.
SCREENSHOT

Solving the storage problem:
Per the requirements of the course, I was required to utilize Firebase as my storage system.  Firebase had poor image storage capabilities at the time and limited my ability to mass upload the layers of data that became highly complex in a timely and efficient manner.  In order to side-step some of this, I reduced the amount of processing from Firebase and optimized the end-user’s browser functionality by converting and encoding all processed images into base64 strings.  This worked because canvas renders as base64 encoded images for final production, as well as reads incoming images as base64 BUT in future renditions of this tool I will be converting this system to a more robust storage facility with faster image rendering as well as updating the code to read and process blob data.
```
CODE SNIPPET
```

HOW TO RUN CODE
```
Global installs: npm install http-server -g & npm install grunt-cli -g

$ git clone https://github.com/morecallan/sass-boilerplate.git
$ cd sass-boilerplate
$ cd lib
$ bower install
$ npm install
$ cd ..
$ hs -c-1 (this will run http-server without caching issues)
This should show in your browser at localhost:8080

For developers [to lint the JS files, or update the styles]:
Open a new tab from the root project file.
$ cd lib
$ grunt

```
