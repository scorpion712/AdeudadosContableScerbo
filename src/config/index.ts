export const enableDevTools = import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === 'true';

export const APIConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL
}

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Here you can add your own APIs configurations for your application

// Below is an example to add a Google Maps API configuration:

// export const GoogleConfig = {
//     authClientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
//     mapsKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
//     mapID: import.meta.env.VITE_GOOGLE_MAP_ID
//   }
