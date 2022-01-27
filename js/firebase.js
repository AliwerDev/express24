// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";

import {get,update, getDatabase, onValue, ref, set, push, remove} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import {isHaveUser} from "./profile.js";

const firebaseConfig = {
	apiKey: "AIzaSyA8YkIkFpV-vH20QkLMxYxIvgJ1ifAcV7g",
	authDomain: "express24-19258.firebaseapp.com",
	databaseURL: "https://express24-19258-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "express24-19258",
	storageBucket: "express24-19258.appspot.com",
	messagingSenderId: "1085505569658",
	appId: "1:1085505569658:web:e2b3967fba56d429f1ccc3",
	measurementId: "G-7KWYXX39J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth();

//Auth
function createUser (userData, password) {
	console.log(userData)
	createUserWithEmailAndPassword(auth, userData.email, password)
		.then((cred) => {
			console.log(cred)
			alert("Saytga muvaffaqqiyatli kirdingiz!")
			const userData2 = userData;
			userData2.uid = cred.user.uid;
			isHaveUser(cred.user.uid);
			userUid = cred.user.uid;
			addUser(userData2)
		})
		.catch(e => {
		})
}
function signOutUser (callback = () => {}) {
	signOut(auth)
		.then(() => {
			callback(true);
			console.log("user Chiqib ketti")
		})
		.catch(() => {
			callback(false);
			console.log("user chiqib keta olmadi")
		});
}

function signIn(dataUser) {
	signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
		.then((cred) => {
			isHaveUser(cred.user.uid);
			userUid = cred.user.uid;
		})
		.catch(() => {
			alert("parol yoki email xato");
		});
}
const isSignIn = (callback = () => {}) => {
	console.log("sign in boshlandi")
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			console.log("sign in bulgan")
			callback(uid);
		} else {
			console.warn("no sign in");
		}
	});
};
isSignIn((uid) => {
	isHaveUser(uid);
	userUid = uid;
	console.log(userUid)
});


//User Functions
function addUser(userData){
	set(ref(db, 'users/' + userData.uid), userData)
		.then(() => {
		})
		.catch(err => console.log(err));
}
function updateUserData(data) {
	set(ref(db, 'users/' + data.uid), data)
		.then(() => {
		})
		.catch(err => console.log(err));
}

function getUserData(uid, callback){
	onValue(ref(db, `users/${uid}`), (data) => {
		callback(data.val() || {});
	})
}

function getAllProducts(callback){
	onValue(ref(db, `products`), (data) => {
		callback(data.val() || {});
	})
}
function getOneCategory(category, callback) {
	onValue(ref(db, `products/` + category), (data) => {
		console.log(data.val())
		callback(data.val() || {}, category );
	})
}



//Products
const addCategory = (category, form) => {
	set(ref(db, `categories/` + category.toLowerCase()), category.toLowerCase())
		.then(() => {
			alert("Category qo`shildi")
			form.reset();
		})
		.catch(err => console.log(err));
}
const addProduct = (category, data, form) => {
	push(ref(db, `products/` + category.toLowerCase()), data)
		.then(() => {
			form.reset();
			alert("Product Qo`shildi")
		})
		.catch(err => console.log(err));
}

const getCategories = (father, callback) => {
	onValue(ref(db, `categories`), (data) => {
		console.log(data.val())
		callback(father, data.val() || {});
	})
}

const addProductToKorzina = (uid, obj) => {
	set(ref(db, `users/` + uid + "/korzinka/" + obj.productId), obj)
		.then(() => {
			alert("Product Qo`shildi")
		})
		.catch(err => console.log(err));
}
const getKorzina = (father, uid, callback) => {
	console.log(uid)
	onValue(ref(db, `users/${uid}/korzinka`), (data) => {
		console.log(data.val())
		callback(father, data.val() || {});
	})
}


export {getKorzina,signOutUser, addProductToKorzina, getUserData, signIn, addProduct, createUser, addCategory, getCategories,getOneCategory, updateUserData, getAllProducts}

