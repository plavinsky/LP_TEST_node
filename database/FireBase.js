// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY,//"AIzaSyCdZSDImZzaH7BHQ-GJcaefIBwT2VM3vdw",
    authDomain: "lp-test-3d563.firebaseapp.com",
    projectId: "lp-test-3d563",
    storageBucket: "lp-test-3d563.appspot.com",
    messagingSenderId: "796899654738",
    appId: "1:796899654738:web:26c58d86d3fad77851b38b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function updateUserFireStore(userId, user) {

    console.log('userId', userId);
    console.log('user', user);
    await setDoc(doc(db, "users", userId), user);
}

export async function getUserFireStore(id){

    const q = query(collection(db, "users"), where("id", "==", id));


    const querySnapshot = await getDocs(q);
    const users = {};
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        users[doc.id] = doc.data();
    });

    return users;
}