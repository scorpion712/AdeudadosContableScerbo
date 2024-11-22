# Initial Template Dashboard Template



## 📌Table of contents 
* [Technologies](#technologies) 
* [Setup](#setup) 
* [Usage](#usage)
* [Key Features](#key features)
* [Used Libraries](#used libraries)
* [License](#license)

## 🪛Technologies
This project was created using:
* [Vite](#https://vitejs.dev/)
* [React 18 with Typescript](#https://react.dev/)

## 🚀Setup
To run this project, install it locally using yarn:

```
$ cd ../initial-template
$ yarn install
$ yarn dev
```
**_NOTE:_** Make sure that you have already installed yarn or you can follow [this guide](https://classic.yarnpkg.com/en/docs/install#windows-stable).

## Usage
Once the development server is running, you can access the dashboard by navigating to `http://localhost:5173` (or whatever port Vite is using) in your web browser.

## Key Features
This section highlights key features and technical aspects of the project:

### 🛡️ Helmet
Utilizes the `Helmet library` for managing changes to the document head, optimizing SEO. The `SEO` reusable component allows you to handle all changes efficiently.

### 🌐 Axios interceptor
Implement Axios interceptors to manage requests and responses globally, enhancing error handling and adding custom headers when necessary.

### 🔒 Guards
Employ route guards to protect specific routes based on user authentication or roles, ensuring secure access to sensitive areas of the application.

### 🎨 Theme
This file consists of palette colors, components overrides, typography, shadows and other theme specific utilities, such as spacing, radius, etc.

Feel free to follow the [official guidelines](https://mui.com/material-ui/customization/how-to-customize/) of `Material UI` to customize it.

### 🪝 Custom Hooks
We creted two useful and essentials custom hooks: `useService` and `useAsync`.

The `useService` is a hook that facilitates API calls using `Axios`. It supports request cancellation through an `AbortController`, preventing memory leaks when components unmount. This AbortController signal creates a kind of communication channel that will be interrupted when an event or signal occurs. So, using this we can control that all our request should be cancelled if an event happens, for example the component is unmounted.

To use it, we created an interface `AxiosCall`, where the call should be the `Promise` and the controller should be the `AbortController`. So the service will return a type of `AxiosCall<T>` where T is the API response type.

Using the custom hook `useService` we are going to send the controlled request and this will have a loading property to control when the request is on execution. This is useful when you are fetching data from API and want to show a loading progress, skeleton or something you want.

The `useAsync` hook manages asynchronous operations with safety, ensuring that the callback functions only execute if the component is mounted. It will receive this params: 
- `asynFunction`: this is an async function to be executed.
- `successFunction`: this function should be executed after the asyncFn was succeed and only if the component is mounted.
- `returnFunction`: is the function to be executed when the component is unmounted, by default it do nothing and is an optional param.
- `dependencies`: this is and array of useEffect dependencies and will notify changes to the useEffect and perform the asyncFn when any dependency change. 

This hook is very important because using it you will prevent a memory leak, imagine you are trying to update a state in a component that was unmounted when the request was done.

You can use them by this way:
`myService.ts`
```
  const fetchData = () => {
    const controller = new AbortController();
    return {
      call: axios.get<YourAPIResponse>('https://your.api/endpoint', { signal: controller.signal }),
      controller
    } as AxiosCall<YourAPIResponse>;
  }
```
`myComponent.tsx` 
```
  const MyComponent = () => {
    const { loading, callEndpoint } = useService<YourAPIResponse>();

    const getAPIData = async () => await callEndpoint(fetchData());

    const doSomething = (data: YourAPIResponse) => {
      // do something with the data
    }

    useAsync(getAPIData, doSomething);

    if (loading) return <div>Loading...</div>;

    // rest of your code 
  }
```

### Utility functions
- `SnackbarManager`: Manage various types of Snackbars (error, success, warning, info) for user notifications.
- `axiosErrorParse`: Parse Axios error codes into user-friendly messages.
- `localStorageUtility`: Functions to facilitate interactions with local storage.

## Used Libraries
- [MaterialUI](https://mui.com/material-ui)
- [Formik](https://formik.org/)
- [Axios](https://axios-http.com/es/docs/intro)
- [Notistack](https://notistack.com/getting-started)
- [Simplebar-react](https://grsmto.github.io/simplebar/)
- [Yup](https://www.npmjs.com/package/yup)
- [React-Helmet](https://www.npmjs.com/package/react-helmet)
- [React-router-dom](https://reactrouter.com/en/main)

## 📝License
