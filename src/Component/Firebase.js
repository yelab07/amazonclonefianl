// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig =
	{
		apiKey:
			"AIzaSyDcb0DHdMvgHAK5bUT-eGgo5lPm-GTJHBc",
		authDomain:
			"clone-dbc36.firebaseapp.com",
		projectId:
			"clone-dbc36",
		storageBucket:
			"clone-dbc36.appspot.com",
		messagingSenderId:
			"54885604515",
		appId:
			"1:54885604515:web:3a3ff02667e913fef1f316",
		measurementId:
			"G-L8STBQR6GF",
	};
const firebaseApp =
	firebase.initializeApp(
		firebaseConfig
	);

const db =
	firebaseApp.firestore();
const auth =
	firebase.auth();

export {
	db,
	auth,
};
