# Paint
Simple Paint Application Developed using angular framework and springboot.

## Contents:
- [Contributers](#Contributers)
- [Frameworks and technology used](#Frameworks-and-technology-used)
- [How to run](#How-to-run)
- [Used design patterns](#used-design-patterns)
- [UML class diagram](#UML-class-diagram)
- [Snapshots of our UI and a user guide](#Snapshots-of-our-UI-and-a-user-guide)
- [Demo Video for using the app](Demo-Video-for-using-the-app)
---
## Contributers:
* [Adel Mahmoud](https://github.com/Adel-Mahmoud-Mohamed)
* [Mohamed Hassan](https://github.com/mohamedhassan279)
* [Mahmoud Attia](https://github.com/mahmoudattia12)
* [Mahmoud Ghlab](https://github.com/Mahmoudjobdis)
---

![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/A1.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/A2.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/A3.jpg?raw=true)
---
## Frameworks and technology used:
- For the frontend part (view part), we used HTML, CSS, and typescript through angular framework.
- For the backend (model and controller), we used Java language through spring framework.
---
## How to run:
- Note: Make sure you have downloaded NodeJs and Angular-CLI.
- extract the compressed project folder.
#### Back-end part:
- Open the paintBackend folder using IntelliJ IDE or any other IDE, run the PaintBackendApplication.java class on port 9090.
- you can change the port from the project resources → application.properties if the 9090 port was already used in your device but in this case, you will need to change it in all http requests in the app.components.ts file on the front-end folder.
#### Front-end part:
- Open the paint-frontend folder using visual studio IDE, then open the terminal of the IDE, and write npm install in the terminal.
- Then write “ng serve --open” in the terminal to open the project, on port “http://localhost:4200/”-. Note: if you needed to change port 4200 as it was already in use then you will need to change it in the paintBackend folder in the controller class.
- Then you can use the paint application and draw whatever you want.
---
## Used design patterns:
### 1- Factory design pattern:
- We have an interface called ‘IShape’ that’s implemented by the superclass ‘Shape’ which is inherited to all other shapes classes this interface is cloneable for the prototype DP.
- Then we have a super Class called ’Shape’ that have the common methods and attributes for the shapes with a purpose of inheritance and code reusability.
- Shapes classes (circle, triangle,.) extends the Shape class.
- The factory creates an instance of any shape by using a key string which is the name of the desired shape to be formed then the factory returns an object with the type of Shape.
### 2- Prototype design pattern:
- In order to Copy shapes in the app, we create the copy method by prototype design pattern.
- First, we create an instance of Shape class (which implements the interface IShape which extends Cloneable interface) to call the function “makeCopy(desired shape attributes copied)” with all attributes of the desired shape to be copied as arguments. 
- Then creates an instance of ‘SendCopied’ class to call ‘ConvertJson(shape)’ method that takes the shape as an argument to return a copy of the shape attributes as string then the frontend will draw the shape with these attributes.
---
## UML class diagram:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/Paint%20Class%20diagram.png?raw=true)
- [link to the uml class diagram](https://drive.google.com/file/d/1Vt4kMUUd6xGtHWJwzMH-7189OuPy9bO5/view?usp=share_link)
---
## Snapshots of our UI and a user guide:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/1.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/2.jpg?raw=true)
### Leads to:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/3.jpg?raw=true)
### How to use the Application:
1. The left red rectangle specifies the shapes, which the app supports.Click on the shape then click on the drawing field to draw the shape.
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/4.jpg?raw=true)
### For Example:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/5.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/6.jpg?raw=true)
---
2. The above red rectangle states all operations can be done through your session in the application in addition to saving your drawing and opening previously saved one:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/7.jpg?raw=true)
    - Save icon to save your painting, click on it then it will show you the different forms saving and you can choose any one of them and a pop up menu will appear to you to set the file name and path you want to save in:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/8.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/9.jpg?raw=true)
    - Open icon for opening loaded file in the saved folders:
#### This is the saved file:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/10.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/11.jpg?raw=true)
#### Loaded file you saved using the same path you used to save:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/12.jpg?raw=true)

    o Click Undo (Undo: ctrl + z) to back to the previous step/s if you want that:
    
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/13.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/14.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/15.jpg?raw=true)

    o Clicking Redo (Redo: ctrl + y) bring you the last change if you clicked undo before:
    
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/16.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/17.jpg?raw=true)
#### Clicking undo
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/18.jpg?raw=true)
#### Clicking redo
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/19.jpg?raw=true)

    o Clicking on delete element will delete the selected shape/s:
    
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/20.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/21.jpg?raw=true)

    o To delete all the painting:
    
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/22.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/23.jpg?raw=true)

    o Click on Copy will Copy the shape (Copy: ctrl + c) :
    
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/24.jpg?raw=true)
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/25.jpg?raw=true)

    o multiple selection:
#### the user can select more than one shape using the selection rectangle:
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/multiselection.jpg?raw=true) 
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/multiselection2.jpg?raw=true)
---
3. Then this last rectangle to color any selected shape. Color icon to specify the color that you want, fill to color inside the shape by this color after selecting the shape. And border icon to color the shape border after selecting the shape.
![image](https://github.com/mahmoudattia12/Paint/blob/main/screenshots/26.jpg?raw=true)       
---
## Demo Video for using the app:
https://user-images.githubusercontent.com/96317608/217935942-906b38ec-ee50-4140-b2fb-6e30cd85b8ba.mp4
