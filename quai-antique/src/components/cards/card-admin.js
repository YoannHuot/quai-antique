import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";

const CardAdmin = ({
	title,
	description,
	price,
	id,
	setRefresh,
	refresh,
	type,
}) => {
	const typesSelecte = ["entree", "plat", "dessert"];
	const [titleModif, setTitleModif] = useState("");
	const [prixModif, setPrixModif] = useState("");
	const [descriptionModif, setDescriptionModif] = useState(null);
	const [checkValidity, setCheckValidity] = useState(false);
	const [typeModif, setTypeModif] = useState(type);

	/*
	 */
	const deleteProduct = (e) => {
		e.preventDefault();
		const cookie = Cookies.get("jwt");
		axios
			.delete("http://localhost:8000/administrator/products.php", {
				params: {
					token: cookie,
					cardId: id,
				},
			})
			.then(() => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log("error : ");
				console.log(error);
			});
	};

	/*
	 */
	const modifyProduct = async (e) => {
		e.preventDefault();

		let payload = {
			title: titleModif,
			price: prixModif,
			type: typeModif,
			description: descriptionModif,
			id: id,
		};

		const regex = /^\d+$/;
		let checkPrice = regex.test(prixModif);

		if (
			(id && titleModif.length <= 3) ||
			!checkPrice ||
			(descriptionModif != null && descriptionModif.length <= 0)
		) {
			setCheckValidity("Les informations sont incorrects");

			return;
		}

		try {
			const cookie = Cookies.get("jwt");

			const response = await axios.put(
				"http://localhost:8000/administrator/products.php",
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

	return (
		<form className="bg-primary text-gray-400 rounded-md m-2 p-2 flex flex-col relative">
			<div className="w-full justify-between flex-row">
				<span className="w-full text-center">id : {id}</span>
			</div>
			<label>Type :</label>
			<select
				className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
				value={typeModif}
				onChange={(e) => {
					setTypeModif(e.target.value);
				}}
			>
				{typesSelecte.map((types, i) => (
					<option key={i} value={types}>
						{types}
					</option>
				))}
			</select>
			<button
				className="pointer absolute right-4 top-4"
				type="button"
				onClick={deleteProduct}
			>
				<TrashIcon className="w-8 h-8 " />
			</button>
			<label>Titre :</label>
			<input
				className="font-bold uppercase border-gold my-2 py-1 border w-full"
				defaultValue={title}
				onChange={(e) => setTitleModif(e.target.value)}
			/>
			<label>Description :</label>
			<input
				className=" border-gold my-2 py-1 border w-full"
				defaultValue={description}
				onChange={(e) => setDescriptionModif(e.target.value)}
			/>
			<label>Prix :</label>
			<input
				className=" border-gold my-2 py-1 border w-full"
				defaultValue={price}
				onChange={(e) => setPrixModif(e.target.value)}
			/>

			<button
				className=" px-4 border border-white hover:bg-gold hover:text-black"
				onClick={modifyProduct}
			>
				Valider
			</button>
			{checkValidity && (
				<span className="text-white ">Echec : {checkValidity}</span>
			)}
		</form>
	);
};

export default CardAdmin;
