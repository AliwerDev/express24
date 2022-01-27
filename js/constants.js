let userUid;

const loginPage = document.querySelector(".login-page")
const adminPage = document.querySelector(".user-page");
const productsBlock = document.querySelector(".products-block")
const timesLogin = loginPage.querySelector(".timesLogin");
timesLogin.addEventListener("click", ()=> {
	loginPage.classList.add("d-none")
})

const korzinkaBox = document.querySelector(".korzinka")

const categoriesContainer = document.querySelector(".categories-container");
const productsContainer = document.querySelector(".products-container");

const minUser = document.querySelector(".minUser")
console.log(minUser)



