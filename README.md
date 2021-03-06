# Todo App Made Using React and Firebase

---

## See it live [**here**](https://ansellmaximilian.github.io/todo).

---

An very simple app for tracking activities you plan to do. You can mark activites as completed to remind you that it's done.

The app lists todo items which represent activities that you need to be reminded to do, and each todo item can be one of two types:
- daily

    Indicates activites that you want to do everyday. There's a button that you can press to reset the daily activites so they're all uncompleted.

- important

    Todo items of this type will be in bold.

You'll be able to filter the todo items by their type dan by its completed status.

This app was made using Firebase's auth and firestore so you can: 
- Sign up
- Sign In
- Log out
- Store todos in your account and load it again later.
- Delete todos, which will permanently remove it from your account. 
- Your todos will be protected by Firebase rules so that evey todo item can only be access by its respective authorized user.
- You also have to log in or sign up to store todos.
- Each todo may have an associated notes which will be invisible by default and can be revealed by clicking a button in the todo item element.