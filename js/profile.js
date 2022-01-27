import {getCategories, getUserData, updateUserData} from "./firebase.js";
import {myCreateElement} from "./functions.js";
import {creatSignInForm} from "./logIn.js";
import {productAddFromRender, renderAddCategory} from "./mainSections.js";

const qushishPageBtn = document.querySelector("#qushishPageBtn")
const arizalarPageBtn = document.querySelector("#arizalarPageBtn")
const foydalanuvchilarPageBtn = document.querySelector("#foydalanuvchilarPageBtn")
const statistikaPageBtn = document.querySelector("#statistikaPageBtn")
const yetkazilganPageBtn = document.querySelector("#yetkazilganPageBtn");

const qushishPage = document.querySelector(".qushishPage")
const arizalarPage = document.querySelector(".arizalarPage")
const foydalanuvchilarPage = document.querySelector(".foydalanuvchilarPage")
const statistikaPage = document.querySelector(".statistikaPage")
const yetkazilganPage = document.querySelector(".yetkazilganPage");

const productAddBtn = qushishPage.querySelector('.productAddBtn')
const categoryAddBtn = qushishPage.querySelector('.categoryAddBtn')


categoryAddBtn.addEventListener('click', () => {
	productAddBtn.classList.remove("active");
	categoryAddBtn.classList.add("active");
	renderAddCategory(qushishPage.querySelector(".content"))
})

productAddBtn.addEventListener('click', () => {
	categoryAddBtn.classList.remove("active");
	productAddBtn.classList.add("active");
	getCategories(qushishPage.querySelector(".content"), productAddFromRender)
})

function allDNone(){
	console.log("hello")
	qushishPage.classList.add("d-none");
	arizalarPage.classList.add("d-none");
	foydalanuvchilarPage.classList.add("d-none");
	statistikaPage.classList.add("d-none");
	yetkazilganPage.classList.add("d-none");
}

qushishPageBtn.addEventListener('click', () => {
	allDNone();
	qushishPage.classList.remove("d-none")
})

arizalarPageBtn.addEventListener('click', () => {
	allDNone();
	arizalarPage.classList.remove("d-none")
})
foydalanuvchilarPageBtn.addEventListener('click', () => {
	allDNone();
	foydalanuvchilarPage.classList.remove("d-none")
})
statistikaPageBtn.addEventListener('click', () => {
	allDNone();
	statistikaPage.classList.remove("d-none")
})
yetkazilganPageBtn.addEventListener('click', () => {
	allDNone();
	yetkazilganPage.classList.remove("d-none")
})

if(!userUid){
	minUser.innerHTML = "";
	const login = myCreateElement('button', {className: "btn", innerHTML: "Log In"}, minUser)
	login.addEventListener('click', () => {
		loginPage.classList.remove("d-none")
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
	// getUserData(id, renderProfile);
}

function renderProfile(obj) {
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