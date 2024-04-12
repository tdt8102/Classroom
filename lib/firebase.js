import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIh-tTN85CH4yoLjIYeapj-_05c2J634I",
    authDomain: "dt-classroom-clone.firebaseapp.com",
    projectId: "dt-classroom-clone",
    storageBucket: "dt-classroom-clone.appspot.com",
    messagingSenderId: "1049401174052",
    appId: "1:1049401174052:web:e018051808a3b56bbc10b1",
    measurementId: "G-GJXL6T8C2S"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const storage = getStorage(app);


export { db, auth, provider, storage };
export default db;