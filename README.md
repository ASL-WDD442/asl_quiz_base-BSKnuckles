# Branding

This branch holds the branding for your application and will be used to create a brand guide

The goal of this branch is to decide on your marketing and design some of the major pages your site will use. Doing this work up front makes your future assignments easier as you will not have to design and create.

Get creative about your topic and make sure you do research to back up your target market.


## Setting up gh-pages

1. Go to "Settings" tab in your github repository
2. Scroll to the "GitHub Pages" section
3. Select "gh-pages branch" from source dropdown


## Creating your Brand Guide

1. Developing:
   1. Clone your repo down
   2. Switch to gh-pages branch
   3. `npm install`
   4. `npm start` (will spin up a server and you can see the changes happening in your settings file)
1. Update the .css and .html files in the styles, pages and brand folders to match the style you want to create for your brand (see below for descriptions of each of the pages)
1. **DO NOT** change the index.html in the root folder, or the brand-guide.css files
1. Get creative with your ideas and content. You do not have to keep all the content on the page but you do need to keep the elements. Feel free to change the design a lot and change all the text.
1. Push changes to git repo gh-pages branch


## Brand
1. **Brand Details** (brand/index.html) - This holds the overview of your brand and the research about your target market.
1. **Colors** (brand/colors.html) - Show the colors that your brand will be using. Make sure you are picking colors that would appeal to your tarket market. Make sure you are changing the text on the page to match your css changes.
1. **Components** (brand/components.html) - Style some of the basic elements of your site, forms and lists to match your brand. Get creative and make changes from my default look.
1. **Typography** (brand/typography.html) - Decide on the fonts and colors you want to represent your site as well as your button styles. Make sure you are changing the text on the page to match your css changes.

## Pages
1. **Home Page** (pages/home.html)- This is where users will see quizzes created by other users and should have marketing material
1. **Quiz Detail** (pages/quiz-detail.html) - This page holds the information about the quiz and a list of questions belonging to that quiz. Users have links to edit and delete the quiz, and add, view (question-detail) and delete questions
1. **Question Detail** (pages/question-detail.html) - this page holds the details of the question and shows all the choices belonging to that question. Uses should have links to edit and delete the question and add, edit and delete choices.
1. **Create Quiz Form** (pages/quiz-form.html)  - This page should hold a form for creating a new quiz with inputs for a name and type *(public or private)*
1. **Create Question Form** (pages/question-form.html)- This page should hold a form for creating a new question with an input for a title
1. **Create Choice Form** (pages/choice-form.html) - This page should hold a form for creating new choices for a question with inputs for values and types *(incorrect, correct)*

**Note**: This branch will never get merged into your main project, but will always exist on this branch and your live site for you to refer back to.
