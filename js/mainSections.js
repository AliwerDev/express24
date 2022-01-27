import {korzinkaRender, myCreateElement} from "./functions.js";
import {
	addCategory,
	addProduct,
	addProductToKorzina,
	getAllProducts,
	getCategories, getKorzina,
	getOneCategory
} from "./firebase.js";

const renderCategories = (father, data) => {
	categoriesContainer.innerHTML = "";
	const ul = myCreateElement("ul", {className: "ull pt-4 px-3", }, father);

	const dataArr = Object.values(data);
	dataArr.map((item, i) => {
		const li = myCreateElement("li", {className: "", innerHTML: item[0].toUpperCase() + item.slice(1).toLowerCase()}, ul);
		li.addEventListener('click', () => {
			getOneCategory(item, oneCategoryRender)
		})
	})
}

const renderAddCategory = (father) => {
	father.innerHTML = "";

	const addCategoryForm = myCreateElement("form", {className: "py-5 px-3 text-center", autocomplete: "off"} , father);
	const input = myCreateElement("input", {name: "category", required: "true", className: "addCategoryInput", placeholder: "Kategoriya nomi"}, addCategoryForm);
	const button = myCreateElement("button", {className: "addCategoryButton myBtn-primary mt-4", innerHTML: "Qo'shish"}, addCategoryForm)


	addCategoryForm.addEventListener('submit', (e) => {
		e.preventDefault();
		addCategory(addCategoryForm.category.value)
	})
}

function productAddFromRender(father, categories) {
	father.innerHTML = "";
	const categoryForm = myCreateElement(
		"form",
		{ className: "categoryForm text-center" },
		father,
	);
	const firstBlock = myCreateElement(
		"div",
		{ className: "firstBlock d-flex gap-2" },
		categoryForm
	);

	const pathToImg = myCreateElement(
		"input",
		{
			required: true,
			className: "pathToImg w-50 my-2 px-3 py-1",
			placeholder: "Rasmga yol",
		},
		firstBlock
	);

	const ovqatNomi = myCreateElement(
		"input",
		{
			required: true,
			className: "pathToImg w-50 my-2 px-3 py-1",
			placeholder: "Taom nomi",
		},
		firstBlock
	);

	const tarif = myCreateElement(
		"textarea",
		{
			required: true,
			className: "ovqatTarifi w-100 my-2 px-3 py-1",
			rows: "5",
			cols: " 20",
			placeholder: "Tarif",
		},
		categoryForm
	);

	const thirdBlock = myCreateElement(
		"div",
		{ className: "d-flex gap-2" },
		categoryForm
	);

	const priceProduct = myCreateElement(
		"input",
		{
			required: true,
			className: "priceProduct w-50 my-2 px-3 py-1",
			placeholder: "Narxi",
		},
		thirdBlock
	);

	const nameProduct = myCreateElement(
		"select",
		{
			className: "nameProduct w-50 my-2 px-3 py-1",
		},
		thirdBlock
	);
	const dataArr = Object.values(categories);
	dataArr.map((item, i) => {
		const option = myCreateElement("option", {className: "", innerHTML: item[0].toUpperCase() + item.slice(1).toLowerCase()}, nameProduct);
		option.addEventListener('click', () => {
			console.log("hello")
		})
	})


	myCreateElement(
		"button",
		{ type: "submit", className: "myBtn-primary px-4", innerHTML: "Qo'shish" },
		categoryForm
	);

	categoryForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const category = nameProduct.value;
		const obj = {
			img: pathToImg.value,
			productName: ovqatNomi.value,
			desc: tarif.value,
			price: priceProduct.value,
		}

		addProduct(category, obj, categoryForm);
	})
}


//Main Products page
function userSectionRender(title, obj, father) {

	const container = myCreateElement(
		"div",
		{ className: "container py-4" },
		father
	);

	myCreateElement("h3", {className: "titleCategory mb-3", innerHTML: title[0].toUpperCase() + title.slice(1).toLowerCase()}, container);
	const row = myCreateElement("div", { className: "row" }, container);

	const arr = Object.entries(obj)

	arr.map((element) => {
		const item = element[1];
		const id = element[0];
		const col = myCreateElement("div", { className: "col-md-4 product-box" }, row);

		const card = myCreateElement("div", { className: "card" }, col);

		const imgBtnBlock = myCreateElement("div", { className: "imgBtnBlock"} , card );

		myCreateElement(
			"img",
			{ className: "img-fluid w-100", src: item.img },
			imgBtnBlock
		);

		const addBtnBlock = myCreateElement("div", { className: "addBtnBlock" }, imgBtnBlock);
		const addBtn = myCreateElement("button", { className: "btn btn-primary", innerHTML: "Qoshish" }, addBtnBlock);



		const content = myCreateElement("div", { className: "content p-2" }, card);

		myCreateElement("h3", { innerHTML: item.productName }, content);
		myCreateElement("p", { innerHTML: item.price }, content);



		addBtn.addEventListener("click",() =>{
			const obj = {
				category: title,
				name: item.productName,
				img: item.img,
				price: item.price,
				productId: id,
				soni: 1,
			}
			addProductToKorzina(userUid, obj)
		})
	});
}

function allDataRender(obj){
	const Arr = Object.entries(obj);
	productsContainer.innerHTML = "";

	Arr.map((item => {
		console.log(item)
		const title = item[0];
		const arr = item[1];

		userSectionRender(title, arr, productsContainer)
	}))
}

function oneCategoryRender(obj, title){
	productsContainer.innerHTML = "";
	const arr = Object.values(obj);
	userSectionRender(title, arr, productsContainer)
}

document.querySelector("body").addEventListener('load', () => {
	getAllProducts(allDataRender)
	getCategories(categoriesContainer, renderCategories);
	getKorzina(korzinkaBox, userUid, korzinkaRender);
})

export {renderAddCategory, productAddFromRender}

