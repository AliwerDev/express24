import {getUserData, updateUserData} from "./firebase.js";
import {myCreateElement} from "./functions.js";
import {creatSignInForm} from "./logIn.js";

if(!userUid){
	minUser.innerHTML = "";
	const login = myCreateElement('button', {className: "btn", innerHTML: "Log In"}, minUser)
	login.addEventListener('click', () => {
		creatSignInForm(document.querySelector("body"))
	})
}

function isHaveUser(id) {
	if(id){
		minUser.innerHTML = "";
		const user = myCreateElement("div", {className: "user", innerHTML: `<i class="fas fa-user"></i>`}, minUser);
		user.addEventListener('click', () => {
			console.log("user Profile")
		})
	}
	getUserData(id, renderProfile);
}

function renderProfile(obj) {
	console.log(obj);
	const mainSection = myCreateElement(
		"section",
		{ className: "mx-auto text-center", id: "profileSection" },
		document.querySelector("body")
	);

	const container = myCreateElement(
		"div",
		{ className: "container mt-5" },
		mainSection
	);

	const row = myCreateElement("div", { className: "row" }, container);
	const infoColLeft = myCreateElement(
		"div",
		{ className: "col-md-4 col-left" },
		row
	);
	const infoColRight = myCreateElement("div", { className: "col-md-8" }, row);

	const profileTitle = myCreateElement(
		"h2",
		{ className: "profileTitle", innerHTML: "Account" },
		infoColLeft
	);

	const informationDiv = myCreateElement(
		"form",
		{ className: "informationDiv" },
		infoColLeft
	);

	const infoTitle = myCreateElement(
		"h3",
		{ className: "infoTitle" },
		informationDiv
	);

	const infoForm = myCreateElement("div", {}, informationDiv);

	const phoneNumber = myCreateElement(
		"input",
		{required: true, className: "phoneNumber", value: obj.phone || "" },
		infoForm
	);

	const userNameBlock = myCreateElement(
		"div",
		{ className: "input-icon" },
		infoForm
	);
	const userName = myCreateElement(
		"input",
		{
			required: true,
			type: "text",
			value: obj.userName,
		},
		userNameBlock
	);
	const userNameIcon = myCreateElement(
		"i",
		{ innerHTML: `<i class="far fa-user-circle"></i>` },
		userNameBlock
	);

	const surNameBlock = myCreateElement(
		"div",
		{ className: "input-icon" },
		infoForm
	);
	const surName = myCreateElement(
		"input",
		{value: obj.fullName || "", placeholder: "Familya", type: "text" },
		surNameBlock
	);
	const surNameIcon = myCreateElement(
		"i",
		{ innerHTML: `<i class="far fa-user-circle"></i>` },
		surNameBlock
	);

	const birthDayBlock = myCreateElement(
		"div",
		{ className: "input-icon d-flex" },
		infoForm
	);

	const birthDay = myCreateElement(
		"input",
		{
			placeholder: "Tug'ilgan sanasi",
			type: "date",
			value: obj.birthDay || "",
			className: "w-100",
		},
		birthDayBlock
	);

	const emailBlock = myCreateElement(
		"div",
		{ className: "input-icon d-flex" },
		infoForm
	);

	const email = myCreateElement(
		"input",
		{
			innerHTML: "no-mail@express24.uz",
			placeholder: "Email",
			type: "email",
			value: obj.email,
			readOnly: true,
		},
		emailBlock
	);
	const emailIcon = myCreateElement(
		"i",
		{ innerHTML: `<i class="far fa-envelope"></i>` },
		emailBlock
	);

	const updateBtn = myCreateElement(
		"button",
		{ className: "btn btn-warning p-2  w-100", innerHTML: "Yangilash" },
		infoForm
	);


	informationDiv.addEventListener('click', () => {
		const resObject = {
			userName: userName.value,
			fullName: surName.value,
			phone: phoneNumber.value,
			birthDay: birthDay.value,
			email: obj.email,
			uid: obj.uid,
		}
		updateUserData(resObject);
	})


}

export { isHaveUser }