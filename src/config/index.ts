export const enableDevTools = import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === 'true';

export const APIConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL
}

// Here you can add your own APIs configurations for your application

// Below is an example to add a Google Maps API configuration:

// export const GoogleConfig = {
//     authClientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
//     mapsKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
//     mapID: import.meta.env.VITE_GOOGLE_MAP_ID
//   }
