# SQLatch
SQLatch is an educational project made to give the ability to students to learn how to code in the SQL Language. Using intuitive blocks, students can construct their own queries to create tables, insert data, select data, etc.

Moreover, SQLatch is enriched with included Lessons, Exercises, and Scenarios that are meant to excite the learner in a playful manner, making him solve problems and keeping him engaged.

Finally, Users can save/load their Block workspace, making SQLatch the perfect candidate to be utilized in a classroom environment. Teachers can share scenarios that they have prepared, and students can save 
their progress and forward it to the teacher.


## Project Structure
![SQLatch Diagram - light](https://github.com/BillisC/SQLatch/assets/26091373/9e0e4319-4575-44b2-8f6a-0f1c376efffe)


## How to Run
To run SQLatch you will need to install nodeJS along with the required packages that are a part of the project. To do that you shall run:
```
npm install .
npm run build
```
This will build a static version of the site that can then be hosted using any serving software such as Apache or Nginx etc.

To run the development version with debugging enabled you should run:
```
npm install .
npm run dev
```
This will open a webserver that runs locally and the website will update dynamically every time you change something in the source code. <DISCLAIMER:> This is not recommended for hosting a production server!


## Scenario/Lesson Creation
Scenarios are loaded from Markdown files that are server-hosted and converted to HTML using Showdown dynamically. To create your own scenario you must first compose the markdown file that includes your text, images, styling etc. and then upload it to the server. For more information about Markdown File Syntax [click here](https://showdownjs.com/docs/markdown-syntax/).

The filepaths for the hosted .md files are: ```public/MDGuides/Lessons``` or ```public/MDGuides/Scenarios``` or ```public/MDGuides/Tasks``` depending on the type of content you are creating.

Combining this with the importation of a pre-made block can result in a full lesson that students can interact with and experiment on.
