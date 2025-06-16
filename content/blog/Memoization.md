---
title: "How to Optimize React Performance with Memoization"
description: "React apps can become slow and unresponsive as they grow larger and more complex. One powerful way to boost performance is by using **memoization** — a technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again."
image: "/images/blog/react.png"
date: "2025-06-16"
category: "Server"
---


   

# How to Optimize React Performance with Memoization 🚀

  

React apps can become slow and unresponsive as they grow larger and more complex. One powerful way to boost performance is by using **memoization** — a technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again.

  

In this post, I’ll walk you through how to use memoization effectively in React, focusing on the built-in hooks and components that help you avoid unnecessary re-renders.

  

---

  

## What is Memoization?

  

Memoization is an optimization technique that stores ("memoizes") the result of a function call based on its inputs. If the function is called again with the same inputs, the cached result is returned instead of recomputing.

  

In React, this helps prevent unnecessary rendering and computation, which can improve app responsiveness and reduce CPU usage.

  

---

  

## React Memoization Tools

  

React provides several tools to help with memoization:

  

- `React.memo` — memoizes functional components, preventing re-render if props don’t change.

- `useMemo` — memoizes the result of a calculation between renders.

- `useCallback` — memoizes a callback function reference, preventing unnecessary re-creations.

  

---

  

## When to Use `React.memo`

  

Use `React.memo` to wrap functional components that receive props and only need to re-render when those props change.

  

```jsx

import React from  'react';

  

const  ExpensiveComponent  = React.memo(({ data }) => {

console.log('Rendering ExpensiveComponent');

// expensive calculations or rendering here

return <div>{data}</div>;

});
```

## Using useMemo for Expensive Calculations

If you have heavy computations inside your component, use useMemo to cache the results:

  

```jsx
import React, { useMemo } from  'react';

  

function  Fibonacci({ n }) {

// useMemo will recompute the value only when `n` changes

const  fib  =  useMemo(() => {

function  calcFib(num) {

if (num <=  1) return  1;

return  calcFib(num -  1) +  calcFib(num -  2);

}
return  calcFib(n);

}, [n]); // dependency array: recalc only if `n` changes

return <div>Fibonacci number: {fib}</div>;

}
```
  

## Why use useMemo here?

Without useMemo, the calcFib function  would  be  called  on  every  render, which  can  be  very  expensive  especially  for  large  n.

With  useMemo, React  caches  the  result  of  the  calculation  and  only  recomputes  it  if  n  changes, saving  CPU  time  and  improving  performance.


# Using  useCallback  to  Memoize  Functions

Passing  inline  functions  as  props  causes  child  components  to  re-render  unnecessarily  because  every  render  creates  a  new  function  reference.


useCallback  returns  a  memoized  version  of  the  function  that  only  changes  if  its  dependencies  change.

  

```jsx

import  React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, children }) => {

console.log('Button rendered');

return <button  onClick={onClick}>{children}</button>;

});


function  Parent() {

const [count, setCount] =  useState(0);

  

// Memoize increment function to prevent new function creation on every render

const  increment  =  useCallback(() => {

setCount(c  => c +  1);

}, []); // empty dependency array means function stays the same

  

return (

<div>

<p>Count: {count}</p>

<Button  onClick={increment}>Increment</Button>

</div>

);

}
```

## Why use useCallback?

Without useCallback, the increment function  would  be  recreated  on  every  render.

  

This  causes  Button  to  re-render  even  if  its  props  appear  unchanged.

  

With  useCallback, the  function  reference  stays  the  same  between  renders  unless  dependencies  change, so  Button  only  re-renders  when  needed.

  

Summary

1. Use  React.memo  to  memoize  entire  functional  components  to  avoid  unnecessary  re-renders  when  props  are  unchanged.

  

2. Use  useMemo  to  memoize  expensive  calculations  inside  components.

  

3. Use  useCallback  to  memoize  functions  passed  as  props  to  prevent  unnecessary  re-creation  of  functions  and  child  re-renders.

  

Proper  use  of  these  memoization  techniques  can  help  your  React  apps  run  faster  and  more  efficiently.