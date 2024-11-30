---
date: "06-05-2023"
title: "Quote"
description: "Facebook functions replica"
image: "/images/project/01.jpg"
color: "#67A94C"
category: "WebApp"

projectInfo:
  - title: "Client"
    data: "World wide"
  - title: "Release date"
    data: "06-05-2023"
  - title: "Tehnology"
    data: |
      - React
      - SASS
      - FireBase
      - Redux  
live:
  - link: "https://quote.gabrielchiorcea.tech/"
---



## Arhitecture.

This project is a standalone frontend application built with React, focusing on delivering a streamlined user experience. It does not have a dedicated backend; instead, it relies on Firebase as a Backend-as-a-Service (BaaS) for data storage and real-time functionality. Designed with a mobile-first approach, the application prioritizes optimization for mobile devices, providing core features inspired by Facebook, such as sharing posts and liking them.

<div class="image columns-1 sm:columns-2 gap-8">


![Southpole 02.](/images/project/01.jpg)
![Southpole 04.](/images/project/01-01.jpg)

</div>

For data storage, the application uses a NoSQL Firebase database. User data, such as account creation information, is temporarily stored in the local session (e.g., localStorage or sessionStorage) and then sent to Firebase for permanent storage. Posts and other content-related data are retrieved from Firebase through API calls, often referred to as "gates." These are then integrated into the app's state, which is managed using Redux, ensuring a consistent and efficient flow of information between components.

The application incorporates modern technologies to achieve its functionality. While React serves as the framework for building the user interface, Sass is used for styling, offering modular and reusable designs. Redux is at the core of the app’s state management, enabling smooth synchronization of data such as posts, likes, and shares. Middleware like Redux Thunk facilitates handling asynchronous API calls to Firebase, ensuring organized and efficient state updates.

The user interactions within the app are intuitive and align with familiar patterns from social media platforms. For instance, users can share posts or like them, with these actions updating both the local state and Firebase in real-time. Account creation is straightforward, with user details initially stored locally before being validated and saved in Firebase. Posts and related interactions, once fetched, are synchronized with the Redux Store, making them readily accessible across various parts of the application.


## Redux Role in the Application
Redux manages the global state of the application, ensuring synchronization between Firebase and the user interface. Upon initialization, all posts are fetched from Firebase and stored in posts, an array that holds all existing posts.

The Redux state structure also includes oldPosts for older posts and newpost for newly created ones. When a user adds a new post, it's first stored in newpost, then added to both posts and jokes to keep the UI up-to-date. This allows real-time updates and ensures smooth content management across the application.

```javascript
 name: 'post',
  initialState: {
    posts: [],
    newPost: [],
    topTen: [],
    oldPost: [],
    wellcomeState: 'empty',
    writtenPost: false,
    existUser: false,
    cookieConsent: false,
    deleteAccount: false,
    error: {
      errorMainArr: false,
      errorMajorArr: false,
      formError: false,
      registration: false,
    },
```


## Custom Hook for Post Updates (Like/Dislike)

In this application, posts are categorized into two types: those containing obscene words and those that are normal. The like/dislike functionality relies on three key parameters: id, type, and url. The id uniquely identifies a post, type specifies whether it's a like or a dislike, and url determines which division the post belongs to (either containing obscene content or not). This url corresponds to different sections in the database, as the posts are stored separately to simplify analysis of the content.

To implement this functionality, a custom hook is designed to handle post updates based on user interaction. The process can be broken down as follows:


1. Item 1 URL Fetching from env: Based on the provided url (indicating the division), the custom hook retrieves the corresponding URL stored in the environment file (.env). This URL points to the specific division of posts, allowing for clear separation of content that contains obscene words from normal content.

2. Item 2 Like/Dislike Action: Once the hook receives the type (either "like" or "dislike"), it triggers an API call to the appropriate division (using the URL retrieved from env). The post’s unique id is used to fetch the relevant post data for processing.

3. Item 3 Post Comparison and State Update: After fetching the post, the custom hook compares it to the corresponding entry in the oldPosts array (which holds previously fetched post data). If the post has changed—such as when the like/dislike count has been updated—the hook will update the Redux state with the new data. If the post differs from its previous state, it will be added to the posts array in Redux for UI reactivity.

4. Item 4 Database Synchronization: Once the UI state is updated with the new like/dislike data, the hook ensures the changes are reflected in the Firebase database by sending an update request, ensuring consistency between the frontend and the backend.


```javascript
import { postActions } from '../store/post-slice';
import { useDispatch } from 'react-redux';
const useUpdate = () => {
  const dispatch = useDispatch();

  const mapPutVote = async (id, type, url) => {
    const sendId = id;
    const URL = url;

    let response;
    let comeFrom;
    if (URL === process.env.REACT_APP_URL_POST) {
      comeFrom = 'AllPosts';
      response = await fetch(
        process.env.REACT_APP_PrefixNormalDB + sendId + '.json'
      );
    } else {
      comeFrom = 'MajorPosts';
      response = await fetch(
        process.env.REACT_APP_PrefixMajorDB + sendId + '.json'
      );
    }
    const data = await response.json();
    let notIncremented = data.vote;
    
    let isIncrmented;

    if (type === 'increment') {
      isIncrmented = ++notIncremented;
    } else if (type === 'decrease' && notIncremented <= 0) {
      isIncrmented = notIncremented;
    } else {
      isIncrmented = --notIncremented;
    }

    const sendVote = { vote: isIncrmented };
    const newVote = sendVote.vote;
    const sendPayload = {
      comeFrom: comeFrom,
      id: sendId,
      vote: sendVote.vote,
    };

    let switchedUrl;

    if (URL === process.env.REACT_APP_URL_BANC) {
      switchedUrl = process.env.REACT_APP_PrefixNormalDB + sendId + '.json';
    } else if (URL === process.env.REACT_APP_URL_MAJOR) {
      switchedUrl = process.env.REACT_APP_PrefixMajorDB + sendId + '.json';
    }
    if (notIncremented > 0) {
      setTimeout(() => {
        fetch(switchedUrl, {
          method: 'PATCH',
          body: JSON.stringify({ vote: newVote }),
        });
      }, 700);
    }

    dispatch(postActions.upDateOldPosts(sendPayload));

  };
  return { mapPutVote };
};

export default useUpdate;

```


## More

<div class="image columns-1 sm:columns-2 gap-8">

![Southpole 03.](/images/project/01-02.jpg)
![Southpole 03.](/images/project/01-03.jpg)
<!-- ![Southpole 03.](/images/project/01-03.jpg)
![Southpole 04.](/images/project/01-04.jpg) -->
</div>


