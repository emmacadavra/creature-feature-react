# Creature Feature

## **Project Overview**

Creature Feature is a quirky and fun interactive photo-sharing app dedicated to our often smaller - but by no means lesser - animal companions. Although it shares its name with the famous horror/sci-fi genre of films known as 'Creature Features', the creatures featured on this platform are anything but spooky… Unless they want to be, of course! That said, despite the cutesy aesthetic this app employs, the spirit of the genre is subtly kept alive through the unusual names of the [**_post categories_**](#categories) users must pick from to let the world know what type of creature it is they’re featuring! The thematic combining of the _’creepy & kooky’_ with the charming & adorable provides a truly distinctive, engaging platform for users to _sink their claws into_.

The primary intention of this app is to provide a smooth, user-friendly platform on which registered users can create posts containing pictures of their beloved pets, and engage with posts created by other users. They can view and follow the [**_profiles_**](#profile-page) of other users whose posts they enjoy, control what they see by utilising a variety of [**_post filters_**](#post-filters), and - most importantly - interact with and comment on the posts they can see. What makes this app stand out against others of its kind are the three [**_adorable post reactions_**](#reactions) that replace ‘likes’ or the more traditional kinds of post reactions found on other social media platforms.

![Am I responsive screenshot]()

This is the front-end repository for this project. To go to the back-end repository, [**_please follow this link_**](https://github.com/emmacadavra/creature-feature-drf-api).

## **Table of Contents:**

1. [**Project Overview**](#project-overview)
1. [**Project Planning**](#project-planning)
   - [**Project Goals**](#project-goals)
   - [**User Stories**](#user-stories)
   - [**Design**](#design)
     - [**_Typography_**](#typography)
     - [**_Colour Scheme_**](#colour-scheme)
     - [**_Motifs_**](#motifs)
1. [**Current Features**](#current-features)
   - [**Header and Navigation**](#header-and-navigation)
   - [**Home Page**](#home-page)
   - [**Post Filters**](#post-filters)
     - [**_My Feed_**](#my-feed)
     - [**_My Faves_**](#my-faves)
     - [**_Category Search_**](#category-search)
     - [**_Search Bar_**](#search-bar)
   - [**Reactions**](#reactions)
   - [**Categories**](#categories)
   - [**Infinite Scroll**](#infinite-scroll)
   - [**Create and Edit Content**](#create-and-edit-content)
   - [**Delete Content**](#delete-content)
   - [**Comments**](#comments)
     - [**_Like and Reply to Comments_**](#like-and-reply-to-comments)
   - [**Profile Page**](#profile-page)
     - [**_Follow Counts_**](#follow-counts)
   - [**Edit Profile**](#edit-profile)
   - [**Popular Profiles**](#popular-profiles)
   - [**Authentication Pages**](#authentication-pages)
     - [**_Register_**](#register)
     - [**_Log In_**](#log-in)
     - [**_Log Out_**](#log-out)
1. [**Resuable Components**](#reusable-components)
   - [**Asset**](#asset)
   - [**Avatar**](#avatar)
   - [**Post**](#post)
   - [**PostFilters**](#postfilters)
   - [**PostList**](#postlist)
   - [**ReactionsBar**](#reactionsbar)
1. [**Technologies and Dependencies**](#technologies-and-dependencies)
   - [**Frameworks**](#frameworks)
   - [**Libraries**](#libraries)
1. [**Testing**](#testing)
1. [**Deployment**](#deployment)
1. [**Credits**](#credits)
   - [**Honourable Mentions**](#honourable-mentions)
   - [**Code and Content References**](#code-and-content-references)
     - [**_Code_**](#code)
     - [**_Content and Media_**](#content-and-media)

## **Project Planning**

### **Project Goals**

### **User Stories**

My User Stories can be found by following this link to [**_this repository’s project board_**](https://github.com/users/emmacadavra/projects/5). I started with the following six Epics that were then broken down into several User Stories per Epic:

- Navigation & Authentication
- Creating & Editing Posts
- Viewing Posts
- Reactions
- Comments
- Profiles

Although these User Stories relate directly to the front-end of this app, I wrote them very early on as part of the planning stages before starting work on the back-end (which, for the most part, was completed before any work began on the front-end itself). As shown by the tags on the project board, I separated these into three main categories: ‘Must Have’, ‘Should Have’ and ‘Could Have’. This helped steer the work that was completed in each sprint to make sure that the MVP was delivered first and foremost through the must-haves, after which came the should-haves, and lastly the nice-to-haves (or could-haves). During development of the project, some of the User Stories went through changes when it comes to these labels, based on completion of the must-haves, and in an attempt to avoid scope creep.

Further information on the agile development process for this project can be found in the separate [**_AGILE.md_**](AGILE.md) document found in this repository.

### **Design**

#### **Typography**

#### **Colour Scheme**

#### **Motifs**

## **Current Features**

### **Header and Navigation**

### **Home Page**

### **Post Filters**

#### **My Feed**

#### **My Faves**

#### **Category Search**

#### **Search Bar**

### **Reactions**

### **Categories**

### **Infinite Scroll**

### **Create and Edit Content**

### **Delete Content**

### **Comments**

#### **Like and Reply to Comments**

### **Profile Page**

#### **Follow Counts**

### **Edit Profile**

### **Popular Profiles**

### **Authentication Pages**

#### **Register**

#### **Log In**

#### **Log Out**

## **Reusable Components**

### **Asset**

### **Avatar**

### **Post**

### **PostFilters**

### **PostList**

### **ReactionsBar**

## **Technologies and Dependencies**

### **Frameworks**

### **Libraries**

## **Testing**

## **Deployment**

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## **Credits**

### **Honourable Mentions**

- [**_Damon Kreft_**](https://github.com/damon-kreft)

- [**_Richard Wells_**](https://github.com/D0nni387)

- All my wonderful friends that helped me populate the app with posts, and enriched my life with pictures of their adorable pets!

### **Code and Content References**

#### **Code**

- CI walkthrough

#### **Content and Media**

- Logo and brand text generated by [**_TextStudio Editor_**](https://www.textstudio.com/editor)
- Favicon files generated from TextStudio Logo using [**_Real Favicon Generator_**](https://realfavicongenerator.net/)
- PNG Stickers edited using [**_Pixlr_**](https://pixlr.com/)

##### **Icons:**

_Please note the unique URLs linked for each icon._

- [**_Home icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/cat_2571964)
- [**_Sign In icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/log-in_2161403)
- [**_Sign Out icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/log-out_2161487)
- [**_Sign Up icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/new-post_7420707)
- [**_Create Post icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/add-photo_5808163)
- [**_My Feed icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/social-media_5976347)
- [**_My Faves icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/social-media_5976335)
- [**_Upload Image icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/upload_2161444)
- [**_Change Image icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/camera_8719664)
- [**_No Results icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/search_7409412)
- [**_Search icon by Freepik on Flaticon_**](https://www.flaticon.com/free-icon/magnifying-glass_9406832)

##### **Stickers:**

_Please note the unique URLS linked for each sticker._

- [**_Love sticker by barnstudio on Flaticon_**](https://www.flaticon.com/free-sticker/heart_6426857)
- [**_Good sticker by barnstudio on Flaticon_**](https://www.flaticon.com/free-sticker/dog_6426758)
- [**_Crown sticker by barnstudio on Flaticon_**](https://www.flaticon.com/free-sticker/crown_6426909)
- [**Comment sticker by barnstudio on Flaticon\_**](https://www.flaticon.com/free-sticker/symbol_6426862)

##### **Images:**

- [**_Ghost cat image_**](https://imagitory.tumblr.com/post/151766195042/my-ghostcat) by williamcrisafi on Tumblr (found on imagitory.tumblr.com)
- [**_Parrots Perched on Brown Wooden Surface_**](https://www.pexels.com/photo/parrots-perched-on-brown-wooden-surface-1599452/) by Magda Ehlers from Pexels
- [**_White Duckling on Grass_**](https://www.pexels.com/photo/white-duckling-on-grass-55834/) by Pixabay
- [**_Beige Python on Brown Branch of Tree_**](https://www.pexels.com/photo/beige-python-on-brown-branch-of-tree-1108192/) by Worldspectrum
