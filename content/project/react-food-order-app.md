---
date: "2024-10-10"
title: "Meals"
lang: "Build with React" 
description: "This app use the core functionalities of a food ordering application, including menu navigation, cart management, order placement, and administrative controls. It provides a fully functional and attractive interface for users to interact with."
image: "/images/project/07.jpg"
color: "#67A94C"
category: "Frontend"

projectInfo:
  - title: "Client"
    data: "World wide"
  - title: "Release date"
    data: "Steel in development, but ready for tests"
  - title: "Tehnology"
    data: |
      - React
      - SASS
      - FireBase
      - Redux
      - Router
      - Material-UI
  - title: "Functions"
    data: |
      - Authentication and Authorization
      - Data Fetching and API Integration
      - Oder state managemnet
      - Admin/User UI 
 
live:
  - link: "https://meals.gabrielchiorcea.tech/"
---



## Arhitecture. 


<div className="image columns-1 sm:columns-2 gap-8">


![React 02.](/images/project/07.jpg)
![React 04.](/images/project/07-01.jpg)

</div>




## Description

React Meals is a web-based food ordering application developed using React and Firebase. This application allows users to browse a menu of available meals, add items to their cart, and place orders. It also includes administrative features for managing product availability.

### Key Features
1. Menu Navigation and Viewing:
- Users can view a list of available meals, each with a description, price, and availability status.

2. Add to Cart:
- Users can add meals to their shopping cart by specifying the desired quantity.
- The shopping cart is updated in real-time and can be viewed through a dedicated button.

3. Place Orders:
- Users can place orders by filling out a form with personal and delivery details.
- Orders are saved in Firebase Realtime Database for further management.

### Administrative Features:

Admins can manage products, updating their availability directly from the application interface. Administrative features are protected and accessible only to authorized users.

<div className="image columns-1 sm:columns-2 gap-8">

![React 03.](/images/project/07-02.jpg)
![React 03.](/images/project/07-03.jpg)
![React 03.](/images/project/07-04.jpg)

</div>

## Technologies Used
1. React: The main library used for building the user interface.
2. Redux: State management to ensure a smooth and consistent user experience.
3. Firebase: Used for authentication and real-time data storage.
4. React Router: Manages routing and navigation within the application.
5. Styled Components: Styles React components to create a modern and attractive interface.
6. Material-UI: A UI component library to accelerate development and ensure design consistency.

## Project Structure
Components: Contains all reusable components of the application, such as buttons, forms, and lists.
Pages: Contains the main pages of the application, such as the menu page, cart page, and admin page.
Store: Contains the Redux configuration and reducers for managing the application's state.
Firebase: Configuration for Firebase authentication and data storage.

## Redux :


```javascript

import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  meals: [],
  totalAmount: 0,
  isAdmin: false,
  stockButton: false,
  productButton: false,
  orderButton: true

};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalAmount += newItem.price * newItem.amount;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          amount: newItem.amount,
          price: newItem.price,
        });
      } else {
        existingItem.amount += newItem.amount;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalAmount -= existingItem.price;
      if (existingItem.amount === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
    addMeal(state, action) {
      const newMeal = action.payload;
      const existingMeal = state.meals.find(meal => meal.id === newMeal.id);
      if (!existingMeal) {
        state.meals.push({
          id: newMeal.id,
          name: newMeal.name,
          description: newMeal.description,
          price: newMeal.price,
          availability: newMeal.availability,
        });
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    loginAdmin(state, action) {
      state.isAdmin = action.payload;
    },

    setStockButton(state, action) {
      state.stockButton = action.payload;
    },

    setProductButton(state, action) {
      state.productButton = action.payload;
    },

    setOrderButton(state, action) {
      state.orderButton = action.payload;
    }
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;

```

1. The order-slice.js file defines the initial state and the reducers for managing the cart state.
2. The createSlice function from Redux Toolkit is used to create a slice of the state, which includes actions and reducers.
3. The initial state includes properties like items, meals, totalAmount, isAdmin, stockButton, productButton, and orderButton.
4. The reducers define how the state should be updated in response to actions. For example, the addItem reducer adds a new item to the cart, and the removeItem reducer removes an item from the cart.

## Configuring the Redux Store:

The index.js file in the store directory configures the Redux store using the configureStore function from Redux Toolkit. The store is configured with the orderReducer created in the order-slice.js file.

Providing the Redux Store to the Application:
The index.js file in the root directory wraps the App component with the Provider component from react-redux and passes the store to it.
This makes the Redux store available to all components in the application.

By using Redux for state management, the React Meals application ensures a predictable and efficient way to manage the application state. Redux helps in maintaining a single source of truth for the state, making it easier to debug and test the application. The use of Redux Toolkit simplifies the setup and reduces boilerplate code, allowing for a more streamlined development process.




