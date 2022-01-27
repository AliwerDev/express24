import {myCreateElement} from "./functions.js";
import {addCategory, getCategories} from "./firebase.js";

const renderCategories = (data) => {
	categoriesContainer.innerHTML = "";
	const ul = myCreateElement("ul", {className: "ull px-3 d-flex", }, categoriesContainer);

	const dataArr = Object.values(data);
	dataArr.map((item, i) => {
		const li = myCreateElement("li", {className: "", innerHTML: item[0].toUpperCase() + item.slice(1).toLowerCase()}, ul);
		li.addEventListener('click', () => {
			console.log("hello")
		})
	})
}

const renderAddCategory = (father) => {

	const addCategoryForm = myCreateElement("form", {className: "py-5 px-3", autocomplete: "off"} , father);
	const input = myCreateElement("input", {name: "category", required: "true", className: "addCategoryInput", placeholder: "Kategoriya nomi"}, addCategoryForm);
	const button = myCreateElement("button", {className: "addCategoryButton", innerHTML: "Qo'shish"}, addCategoryForm)


	addCategoryForm.addEventListener('submit', (e) => {
		e.preventDefault();
		addCategory(addCategoryForm.category.value)
	})
}



getCategories(renderCategories);
renderAddCategory(document.querySelector("body"))

