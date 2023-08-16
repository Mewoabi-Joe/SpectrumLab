// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCrEpdem4I6IXgfUTtIAAngiLw3mZkEwuI",
	authDomain: "clinic-d45d7.firebaseapp.com",
	projectId: "clinic-d45d7",
	storageBucket: "clinic-d45d7.appspot.com",
	messagingSenderId: "36537519528",
	appId: "1:36537519528:web:3d5cc244462a0252ee219d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
