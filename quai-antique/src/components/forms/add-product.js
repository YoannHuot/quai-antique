import React, { useRef, useState, useEffect } from "react";
import _ from "underscore";
import axios from "axios";
import Cookies from "js-cookie";

const AddProduct = ({ setRefresh, refresh, param }) => {
	const typesSelecte = ["entree", "plat", "dessert"];
	const [title, setTitle] = useState("");
	const [prix, setPrix] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("entree");

	const [checkValidity, setCheckValidity] = useState(null);

	const addProduct = async (e) => {
		e.preventDefault();
		let payload = {
			title: title,
			price: prix,
			type: type,
			description: description,
		};

		const regex = /^\d+$/;
		let checkPrice = regex.test(prix);

		if (title.length <= 3 || !checkPrice || description.length <= 0) {
			setCheckValidity("Les informations sont incorrects");
			return;
		}

		try {
			const cookie = Cookies.get("jwt");

			const response = await axios.post(
				`http://localhost:8000/administrator/${param}.php`,
				{ payload: payload, token: cookie }
			);
			if (response.status === 200) {
				console.log(response.data);
				setRefresh(!refresh);
			}
		} catch (error) {
			console.error("Erreur lors de l'insertion des produits: ", error);
		}
	};

	//
	return (
		<>
			<h2 className="text-xl font-Laila font-medium text-primary">
				Ajouter un {param}
			</h2>
			<div className="w-16 bg-gold h-0.5 mb-4" />
			<form className="text-black bg-primary text-black rounded-md m-2 p-2 flex flex-col relative">
				{param === "products" && (
					<>
						<label>Type :</label>
						<select
							className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
							onChange={(e) => {
								setType(e.target.value);
							}}
						>
							{typesSelecte.map((types, i) => (
								<option key={i} value={types}>
									{types}
								</option>
							))}
						</select>
					</>
				)}

				<label>Titre :</label>
				<input
					className="border-gold my-2 pl-2 py-1 border w-full"
					placeholder="titre "
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label>Description :</label>
				<input
					className=" border-gold my-2 pl-2 py-1 border w-full"
					placeholder="description "
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Prix :</label>
				<input
					className="border-gold my-2 pl-2 py-1 border w-full"
					type="number"
					placeholder="prix "
					onChange={(e) => {
						if (e.target.validity.valid) {
							setPrix(e.target.value);
						}
					}}
				/>

				<button
					className=" px-4 border border-white hover:bg-gold hover:text-black"
					onClick={(e) => {
						addProduct(e);
					}}
				>
					Valider
				</button>
				{checkValidity && (
					<span className="text-white ">Echec : {checkValidity}</span>
				)}
			</form>
		</>
	);
};

export default AddProduct;
