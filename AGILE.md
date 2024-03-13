# **Creature Feature - Agile Development**

## **Agile Overview**

For this project, I adopted an agile approach in order to better organise the workload, and prioritise work to be completed in increments. To do this, I looked at my User Stories and divided them up into 4 main sprints, which are detailed in this document.

## **Table of Contents (Agile Development):**

1. [**Agile Overview**](#agile-overview)
1. [**Sprints**](#sprints)
   - [**First Sprint**](#first-sprint)
   - [**Second Sprint**](#second-sprint)
   - [**Third Sprint**](#third-sprint)
   - [**Fourth Sprint**](#fourth-sprint)
   - [**Fifth Sprint**](#fifth-sprint)
1. [**User Story Notes**](#user-story-notes)
   - [**User Stories Still To Do**](#user-stories-still-in-process)

## **Sprints**

### **First Sprint**

#### **26th Jan - 2nd Feb 2024**

The first sprint was spent on project planning. As I felt I had absorbed a lot of information in a short space of time, I was quite overwhelmed by this project and resisted trying to just get stuck in without an appropriate level of planning. This took longer than I would have hoped, but as this was only my second time using agile methodology it took me a while to really get things figured out.

I used the time to develop my overall idea, decide on the epics that would lead to my user stories, and begin thinking about the functionality I would need from the back-end API, as well as the sorts of features I would like to work towards in the front-end. This is when I decided on this app's USP, the post reactions.

### **Second Sprint**

#### **3rd - 16th Feb 2024**

This sprint was almost entirely dedicated to building the API. Although I knew that I would need to come back and make amendments as I developed the front-end, I felt that it would be in my best interest to get a database put together and working so that I could find my footing with it. I followed along with Code Institute's Django REST Framwork walkthrough whilst initially setting it up, using it as a template of sorts to help solidify my understanding of how the REST Framework works, and to get me thinking about how I could implement my own custom models that would become features in the front-end.

I haven't linked any User Stories to this sprint, as although I had most of them, I was still building on them whilst putting the API together. Doing this helped me consider what I needed, things I might have missed, or areas in which I was in danger of letting scope creep work its way in.

I also used this time to perform a lot of the early testing on the back-end, using each model, serializer and view as an opportunity to use things like print statements to understand the flow of the code and how everything was interacting with each other.

### **Third Sprint**

#### **16th - 26th Feb 2024**

Once I was happy with where I was at with the API, I began working on the front-end using Create React App. Similarly to the back-end, I initially followed along with the Code Institute 'Moments' walkthrough to get the basics established, as despite having followed it once before I felt extremely unconfident with React and found it much harder to get to grips with it at first, especially as it had been some time since I had last done a project that included JavaScript. Despite this, I decided I would use the most recent version of Create React App, as well as the newest versions of React Bootstrap and React Router Dom, and wanted to spend time learning best practice for these newer versions. As my commit history will show, I started with a project that very heavily resembles the 'Moments' walkthrough, but I began to move away from this bit by bit, starting with things such as creating .jsx component files and moving away from the 'pages' structure into an app where most functionality exists on a single page instead wherever possible. This was a great struggle to begin with but I was determined to make it work!

The User Stories I covered in this sprint are listed below:

**Navigation & Authentication:**

- Navigation: As a user I can view the navbar from every page so that I can easily navigate between pages
  - Navbar is visible on every page and every button works as expected on every page.
- Navigation/Routing: As a user I can navigate through pages quickly so that I can view content seamlessly without page refresh
  - Clicking on navbar buttons/clicking on user profile renders new page below navbar quickly & without refresh
  - Switching between filters/categories refreshed list of posts without refreshing page or interfering with any other component on the page
  - Clicking the logo or the home button on the navbar remove filters/searches without page refresh and without interfering with any other component on the page
- Authentication - Sign up: As a user I can create a new account so that I can access all the features for signed up users
  - Sign up icon is clear on navbar for logged out users
  - Sign up form is clean and simple, users can enter a username and password to create an account
  - Invalid data (ie passwords not matching, username already exists) notifies user with appropriate error message
  - Upon successfully creating an account with valid data, user is redirected to sign in page
- Authentication - Sign in: As a user I can sign in to the app so that I can access functionality for logged in users
  - Sign in icon is clear on navbar for logged out users
  - Sign in form is clean and simple
  - Invalid data (ie invalid username, incorrect password) notifies user with appropriate error message
  - Upon successful sign in, user is navigated to homepage
- Authentication - Logged in status: As a user I can clearly see if I am logged in or not so that I can log in if I need to, or log out if I want to
  - When signed in, user profile name displays in top right of navbar, and otherwise hidden elements of the homepage are displayed (such as create post)
  - Many components are not accessible when not logged in (ie create post)
  - If a logged out user attempts to react to a post or comment, they are notified that only logged in users can do this
- Authentication - Refreshing access tokens: As a user I can maintain my logged-in status until I choose to log out so that my user experience is not compromised
  - JWTs manage logged in state - users do not get logged out after 5 minutes
- Conditional rendering: As a logged out user I can see sign in and sign up options so that I can sign in/sign up
  - Icons in navbar change depending on whether a user is logged in or not
  - Logged in users clearly see ‘sign out’ and their profile details
  - Logged out users clearly see ‘sign in’ and ‘sign up’ icons

**Creating & Editing Posts:**

- Create post button: As a logged in user I can clearly see the button to add a post at all times so that I can create a post no matter how far I’ve scrolled (_note that this User Story was completed, but I did end up changing the UI so that the 'Create Post' button was no longer in the NavBar_)
  - The create post button appears clearly at the top of the Posts section for logged in users
  - The create post form opens above the post list so it doesn’t redirect users to a different page, making for a smoother experience
- Create posts: As a logged in user I can create posts so that I can feature my creatures!
  - Create Post button only visible to logged in users, not accessible to logged out users
  - Form is simple with clear indication of fields. Invalid data (ie no image, no title) gives feedback to users
- Categories: As a logged in user, I can choose a category for my post so that users know which kind of creature I’m featuring!
  - Categories available to select in Create Post form with handy tooltip to describe which each one means (owing to the use of a couple of archaic words)

**Viewing Posts:**

- View most recent posts: As a user I can view all the most recent posts, ordered by most recently created first so that I am up to date with the newest content
  - post list always shows newest first, regardless of search/filter/query - with the exception of “my faves” which shows posts in the order they were reacted to (newest reaction_id first)
- Search for posts: As a user, I can search for posts with keywords, so that I can find the posts and user profiles I am interested in
  - typing a keyword into the search bar returns posts that contain that keyword in the post owner’s username or post title
  - typing a user’s username into the search bar returns posts made by that user/posts that contain that username in the title
  - debounce prevents the list of posts re-rendering with every key press for a more user-friendly experience
  - if no posts can be found containing the entered keyword/phrase/etc, a message displays that clearly explains this
  - useSearchParams adds the query to the URL which means users can return to their search if they want to, by pressing ‘back’ after navigating away from the page

**Reactions:**

- View post reactions: As a user, I can clearly see the reaction choices for posts with the number of each reaction next to them, so that I can see what other users think about posts
  - the reactions bar is clearly displayed under every post for both logged in and logged out users, as well as the individual counts for each reaction type beneath them
  - post owners see the default reactions and will get a tooltip telling them they can’t react to their own posts if they attempt to do so (_note this was later disabled, and users no longer get a prompt at all to suggest they can even react to their own posts - no pointer cursor, no button transformation, etc_)
  - the reactions counts for each reaction update when one is chosen

**Profiles:**

- Avatar: As a user I can view user's avatars so that I can easily identify users of the application and their posts
  - Avatars are displayed next to the respective user’s username in every instance they appear - navbar, post, comment, profile page

### **Fourth Sprint**

#### **27th Feb - 7th Mar 2024**

During this sprint, I spent a considerable amouont of time trying to learn about best practices in React, and researching ways in which I could make my code cleaner, more efficient, and more up to standard with what might be expected of React developers in real-world scenarios. Although the app was still very much under construction, I asked one friend if they would be willing to help me about by creating an account, adding a couple of posts, and feeding back their experience. It was during this sprint that I went back to my API to bring back the LikeComment model (which I initially removed for fear of overcomplication), and made the tweaks to the post categories and reactions mentioned in my [**_back-end TESTING.md document_**](https://github.com/emmacadavra/creature-feature-drf-api/blob/main/TESTING.md). At this point I also decided to move all of my .module.css files out of the 'styles' folder, and into the same folder as their respective component. I did this after learning that this is good practice, since developers are able to instantly find the css module relating to the component if things need to be changed.

These are the User Stories I covered in this sprint:

**Creating & Editing Posts:**

- Edit post: As a logged in post owner I can edit my post title and description so that I can make corrections or update my post after it was created
  - the ability to edit a post is only displayed to the owner of that post
  - when a user chooses to edit a post, the individual post component they want to edit is replaced with the edit post form, for a seamless experience
  - when a user submits their edited post, the individual post component re-renders with the updated post information right away

**Viewing Posts:**

- Category filter: As a user, I can filter posts by category so that I can view posts featuring specific types of creature
  - category filters are clearly displayed above the list of posts to logged in users
  - users can navigate between filters seamlessly without page refresh
  - users can add search queries to the category filters to search for posts by specific users/containing specific keywords in that category
- View favourite posts: As a logged in user, I can view the posts I have reacted to so that I can revisit the posts I enjoy the most
  - “my faves” post filter option is clearly displayed above the list of posts to logged in users
  - list of posts updates to show only posts that the current logged in user has reacted to, listed in order of most recent reaction first
  - search bar works with filter so users can search for specific posts they have reacted to
- View posts of followed users: As a logged in user I can view content filtered by users I follow so that I can keep up to date with what they are posting about
  - “my feed” post filter option is clearly displayed above the list of posts to logged in users
  - list of posts updates to show only posts by users that the currently logged in user is following
  - search bar works with filter so users can search for specific posts they have reacted to
- Infinite scroll: As a user I can keep scrolling through the images on the site, that are loaded for me automatically so that I don't have to click on "next page" etc
  - when more than 10 posts appear in the list of posts, infinite scroll loads the next 10 posts in the list (tested using all filters)

**Reactions:**

- Reacting to post: As a logged in user, I can react to a post with clear visual feedback that I have done so (the other options being greyed out, and the chosen reaction count increasing by 1), so that I know how I have reacted and understand I can only pick one
  - when a user has not reacted to a post, the default reaction stickers show with the number of each reaction for this post showing beneath them (clearly)
  - when a user chooses a reaction, that reaction changes to a slightly more vibrant variant, and the other two reaction choices grey out to indicate they cannot be selected in addition to the reaction the user has chosen
  - when a user chooses a reaction, the count below that specific reaction increases by 1, as an additional indicator that they have selected this reaction

**Comments:**

- Post comments: As a logged in user, I can click to expand and read the comments under posts so that I can read what other users think about the posts
  - the comments button that shows/hides the comments component appears under every post along with the number of comments
  - the comments for each post load in with newest comments on top
  - if there are no comments, a message shows to logged in users to suggest they leave a comment
  - if there are no comments, a message shows to logged out users that says there are no comments
- Create a comment: As a logged in user I can add comments to a post so that I can share my thoughts about the post
  - create comment form appears only for logged in users
  - creating a comment adds the comment to the array instantly so users can see they have successfully commented
  - the ‘post comment’ button is disabled if the comment text box is empty
- Comment date: As a user I can see how long ago a comment was made so that I know how old a comment is
  - each comment clearly displays how long ago it was posted, and updates when a user edits their comment
- Edit a comment: As a logged in owner of a comment I can edit my comment so that I can fix or update my existing comment
  - the option to edit a comment only appears to the comment’s owner
  - when choosing to edit a comment, the individual comment component is replaced by the edit comment form for a seamless experience
  - when a user posts their edited comment, the form is replaced with the new, updated comment so that the user can see they have successfully edited the comment
- Delete comments: As a logged in owner of a comment I can delete my comment so that I can control removal of my comment from the application
  - the option to delete a comment only appears to the owner of that comment
  - when a comment is deleted, it is immediately removed from the list of comments so users can see they have successfully deleted it

### **Fifth Sprint**

#### **7th - 13th Mar 2024**

This was the last sprint of the project - just shy of a week - during which I added the remaining functionality (profiles, and liking comments). Unfortunately, despite being the shortest sprint, I found that I came up against the largest amount of frustration during this sprint as I realised there were some core concepts I hadn't really understood. In particular, I struggled immensely with the context needed for the profiles, and wish I had anticipated this. However, I was able to get this done eventually and it turned into something I am very proud of, despite it resulting in me fitting in a huge amount of work in a very short time.

The User Stories I covered in this sprint are:

**Reactions:**

- Changing a reaction: As a logged in user, I can click/tap again on a reaction to undo it, with clear visual feedback that I have done so (all options return to colour, and the previously chosen reaction count decreasing by 1), so that I can choose a different reaction if I change my mind
  - when a user reacts to a post, but decides they would like to undo the reaction, selecting the same reaction again removes the reaction, and reverts the choices back to their default state
  - if a user has reacted to a post, but decides they want to choose a different reaction, they can simply select the new reaction and the UI will seamlessly update to reflect this, as well as it being recorded correctly on the back-end

**Comments:**

- Like comments: As a logged in user I can like the comments of other users so that I can show support or agreement as to what other users have to say
  - each comment has a 'like' button that users can see, with the number of comment likes displayed next to it
  - similarly to reactions, when a user likes a comment, the image is changed to reflect this and the count increased by 1
  - if a user changes their mind and wants to unlike the comment, the image reverts back to the default and the count decreases by 1

**Profiles:**

- Popular profiles: As a user I can see a list of the most followed profiles so that I can see which profiles are popular
- Profile page: As a user I can view other users profiles so that I can see their posts and learn more about them
- User profile - user stats: As a user I can view statistics about a specific user: bio, number of posts, follows and users followed so that I can learn more about them
- Follow/Unfollow a user: As a logged in user I can follow and unfollow other users so that I can see and remove posts by specific users in my posts feed
- View all posts by a specific user: As a user I can view all the posts by a specific user so that I can catch up on their latest posts, or decide I want to follow them
- Edit profile: As a logged in user I can edit my profile so that I can change my profile picture and bio

## **User Story Notes**

### **User Stories Still To Do**

**Reactions:**

- Reactions filter (viewing posts): As a logged in user, I can filter my favourite posts by reaction type so that I can revisit the posts I enjoyed with each reaction

**Profiles:**

- Update username and password: As a logged in user I can update my username and password so that I can change my display name and keep my profile secure
