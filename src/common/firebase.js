import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBjqj1Ge9e3lgX1q3MeZCm8UzjQLa9qCwI",
    authDomain: "voter-ccc7c.firebaseapp.com",
    databaseURL: "https://voter-ccc7c.firebaseio.com",
    projectId: "voter-ccc7c",
    storageBucket: "voter-ccc7c.appspot.com",
    messagingSenderId: "112218268129",
    appId: "1:112218268129:web:26e0a5cc6531ca010ef2a0",
    measurementId: "G-G0TSSSZ1GL"
};

Firebase.initializeApp(firebaseConfig);

export default Firebase;