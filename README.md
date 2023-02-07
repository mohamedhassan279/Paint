# Paint 
## Contents:
- [Frameworks & technology used](#Frameworks-&-technology-used)
- [How to run](#How-to-run)
- [Used design patterns](#used-design-patterns)
    - [1- Factory design pattern](#Factory-design-pattern)
    - [2- Prototype design pattern](#Prototype-design-pattern)
- [UML class diagram](#UML-class-diagram)
- [Snapshots of our UI and a user guide](#Snapshots-of-our-UI-and-a-user-guide)
---
## Frameworks & technology used:
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
![Minion](https://octodex.github.com/images/minion.png)
- [link to the uml class diagram](https://www.google.com/search?q=%D9%85%D9%88%D8%B9%D8%AF+%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9+%D8%A7%D9%84%D8%A7%D9%87%D9%84%D9%89&rlz=1C1CHBD_arEG1014EG1014&oq=%D9%85%D9%88&aqs=chrome.1.69i57j35i39l2j0i131i433i512j46i433i512j0i131i433i512j0i512l4.1920j0j15&sourceid=chrome&ie=UTF-8)
## Snapshots of our UI and a user guide:
![image](https://drive.google.com/file/d/1Mrgn12lQMYSz4C-QNl93Zvh2dIfnH2iR/view?usp=sharing)



