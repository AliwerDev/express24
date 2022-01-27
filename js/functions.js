import {getKorzina} from "./firebase.js";

const myCreateElement = (elementName, attrs = {}, father) => {
	const element = document.createElement(elementName);

	for (const attrsKey in attrs) {
		element[attrsKey] = attrs[attrsKey];
	}

	father && father.append(element);

	return element;
};


function korzinkaRender(father , obj){
	const data = Object.values(obj)
	const container = myCreateElement("div" , {className : "container py-5 text-center", id : "korzinka" , }, father);
	let summaFinish = 0;
	myCreateElement("h2" , {className : "text-center", innerHTML : "Korzina"}, container);

	data.map(obj => {
		let soni = obj.soni;
		summaFinish += obj.soni * obj.price;
		const row = myCreateElement("div" , {className : "row my-5 p-3"} , container);

		const col1 = myCreateElement("div" , {className : "col-12 col-md-6"} , row );

		const productImg = myCreateElement("div" , { className : "productImg d-flex align-items-center p-2" }, col1);

		const reject = myCreateElement("button" , {innerHTML : `<i class="fas fa-times"></i>`} , productImg);

		myCreateElement("img" , {className :"img-responsive w-100" , alt : obj.name , width : "300" , src: obj.img } , productImg );


		const col2 = myCreateElement("div", { className: "col-md-3 d-flex justify-center align-items-center" }, row);

		const productInfo = myCreateElement("div" ,{className :"productInfo ms-5" , } , col2);

		myCreateElement("p" , {className: "nameProduct" , innerHTML : obj.name} , productInfo)
		myCreateElement("p", { className: "priceProduct", innerHTML: obj.price } , productInfo)


		const col3 = myCreateElement("div", { className: "col-md-3 d-flex justify-center align-items-center" }, row);

		const btnGroup = myCreateElement("div" , {className : "btn-group ms-4" , role:"group" } , col3);

		const add = myCreateElement("button" , {type:"button" ,  className :"btn btn border" ,innerHTML: `<i class="fas fa-plus"></i>`} ,btnGroup );
		const soniBtn = myCreateElement("button", {type:"button" ,  className :"btn btn border" ,innerHTML: obj.soni} ,btnGroup );
		const minus = myCreateElement("button" , {type:"button" , className: "btn btn border" , innerHTML: ` <i class="fas fa-minus"></i>` }, btnGroup)

		reject.addEventListener("click",() =>{
			console.log("Rejected")
		})

		add.addEventListener("click",() =>{
			soni++;
			soniBtn.innerHTML = soni;

		})

		minus.addEventListener("click",() =>{
			soni--;
			soniBtn.innerHTML = soni;
		})
	})


	//TextArea

	const comment = myCreateElement("div" , {className: "comment d-flex flex-column my-5", } ,container);

	const label = myCreateElement("label" , {className: "my-4" , for : "comment" , innerHTML:"Maxsulot haqida comment qoldiring"}, comment );

	const textArea = myCreateElement("textarea" , { id:"comment", name:"comment" , rows:"4" ,  cols:"50" } , comment);


	const summa = myCreateElement("div", { className: "summa d-flex flex-column my-5" }, container);

	myCreateElement("label", { className: "my-4", for: "summa", innerHTML: "Umumiy" }, summa);

	const input = myCreateElement("input", {type:"text", name: "summa", placeholder: "Kuponlaringgiz bolsa kiriting" , id:"summa"}, summa);


	const totalSumma = myCreateElement("div", { className : "total d-flex mt-4 justify-content-between"} , summa);

	const sumOxirgiTitle = myCreateElement("p" , {innerHTML : "Zakaz narxi"} , totalSumma );

	const sumOxirgi = myCreateElement("p", { innerHTML: summaFinish}, totalSumma);

	const buyurtmaQilish = myCreateElement("button" ,{innerHTML : "O'zlastirishga otish" , className : " btn-warning  bordered btnOform px-3 py-2"} ,container );

	buyurtmaQilish.addEventListener("click",() =>{console.log("buyurtma");})
}




export { myCreateElement, korzinkaRender }