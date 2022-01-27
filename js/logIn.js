import { signIn, createUser } from "./firebase.js";
import {myCreateElement} from "./functions.js";


const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
	loginForm.style.marginLeft = "-50%";
	loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
	loginForm.style.marginLeft = "0%";
	loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
	signupBtn.click();
	return false;
};

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const userData = {
		email: loginForm.email.value,
		password: loginForm.password.value,
	}
	signIn(userData)
})
signupForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const userData = {
		email: signupForm.email.value,
		phone: signupForm.phone.value,
		userName: signupForm.userName.value,
	}
	alert(userData.phone)
	createUser(userData, signupForm.password.value);
})


function creatSignInForm(father) {
	father.innerHTML = "";
	const form = myCreateElement("form", {}, father);

	const forHeader = myCreateElement("div", {className: "form-header"}, form);
	const signInBtn = myCreateElement("button", {type: "button", className: "logBtn active", innerHTML: "Sign In"}, forHeader);
	const signUpBtn = myCreateElement("button", {type: "button", className: "logBtn", innerHTML: "Sign Up"}, forHeader);

	const email = myCreateElement("input", {type: "email", required: true , placeholder: "Email"}, form);
	const password = myCreateElement("input", {type: "password", required: true , placeholder: "Password"}, form);

	myCreateElement("button", {className: "saveBtn", type: "submit", innerHTML: "Submit"}, form);

	signUpBtn.addEventListener("click", () => {
		creatSignUpForm(father);
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const userData = {
			email: email.value,
			password: password.value,
		}
		signIn(userData)
	})
}
function creatSignUpForm (father) {
	father.innerHTML = "";
	const form = myCreateElement("form", {}, father);

	const forHeader = myCreateElement("div", {className: "form-header"}, form);
	const signInBtn = myCreateElement("button", {type: "button", className: "logBtn", innerHTML: "Sign In"}, forHeader);
	const signUpBtn = myCreateElement("button", {type: "button", className: "logBtn active", innerHTML: "Sign Up"}, forHeader);

	const userName = myCreateElement("input", {required: true, placeholder: "User name"}, form);
	const fullName = myCreateElement("input", {required: true, placeholder: "Full name"}, form);
	const email = myCreateElement("input", {type: "email", required: true, placeholder: "Email"}, form);
	const password = myCreateElement("input", {type: "password", required: true, placeholder: "Password"}, form);

	myCreateElement("button",  {className: "saveBtn", type: "submit", innerHTML: "Submit"}, form);

	signInBtn.addEventListener("click", () => {
		creatSignInForm(father);
	})
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("signUp")
		const userData = {
			email: email.value,
			fullName: fullName.value,
			userName: userName.value,
		}
		createUser(userData, password.value);
	})
}


export {creatSignUpForm, creatSignInForm};