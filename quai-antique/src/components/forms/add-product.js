import React, { useRef, useState, useEffect } from "react";
import _ from "underscore";
import axios from "axios";

const AddProduct = () => {
	const typesSelecte = ["entree", "plat", "dessert"];
	const [title, setTitle] = useState("");
	const [prix, setPrix] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState();

	const addProduct = async () => {
		let payload = {
			title: title,
			price: prix,
			type: type,
			description: description,
		};

		console.log(payload);
		// try {
		// 	const response = await axios.post(
		// 		"http://localhost:8000/administrator/products.php"
		// 	);
		// 	if (response.status === 200) {
		// 		setProducts(response.data.products);
		// 		setMenu(response.data.menus);
		// 	}
		// } catch (error) {
		// 	console.error(
		// 		"Erreur lors de la récupération des produits : ",
		// 		error
		// 	);
		// }
	};
	return (
		<>
			<h2 className="capitalize text-xl font-Laila font-medium text-primary">
				Ajouter un produit
			</h2>
			<div className="w-16 bg-gold h-0.5 mb-4" />
			<form className="bg-primary text-gray-400 rounded-md m-2 p-2 flex flex-col relative">
				<label>Titre :</label>
				<select
					className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
					onChange={(e) => {
						setGuests(e.target.value);
					}}
				>
					{[...Array(59)].map((_, i) => (
						<option key={i} value={i + 1}>
							{i + 1}
						</option>
					))}
				</select>
				<label>Titre :</label>
				<input
					className="uppercase border-gold my-2 pl-2 py-1 border w-full"
					defaultValue={"title"}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label>Description :</label>
				<input
					className=" border-gold my-2 pl-2 py-1 border w-full"
					defaultValue={"description"}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Prix :</label>
				<input
					className=" border-gold my-2 pl-2 py-1 border w-full"
					defaultValue={"price"}
					onChange={(e) => setPrix(e.target.value)}
				/>

				<button
					className=" px-4 border border-white hover:bg-gold hover:text-black"
					onClick={(e) => {
						addProduct(e);
					}}
				>
					Valider
				</button>
			</form>
		</>
	);
};

export default AddProduct;
