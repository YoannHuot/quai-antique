import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import PopUp from "../popups/popup";

const CardAdmin = ({
	title,
	description,
	price,
	id,
	setRefresh,
	refresh,
	type,
	param,
}) => {
	const typesSelecte = ["entree", "plat", "dessert"];
	const [titleModif, setTitleModif] = useState("");
	const [prixModif, setPrixModif] = useState("");
	const [descriptionModif, setDescriptionModif] = useState(null);
	const [checkValidity, setCheckValidity] = useState(false);
	const [typeModif, setTypeModif] = useState(type);
	const [errorMsg, setErrorMsg] = useState("");
	const [open, setOpen] = useState(false);

	/*
	 */
	const deleteProduct = (e) => {
		e.preventDefault();
		const cookie = Cookies.get("jwt");
		axios
			.delete(`http://localhost:8000/administrator/${param}.php`, {
				params: {
					token: cookie,
					cardId: id,
				},
			})
			.then((response) => {
				if (response.data.success === false) {
					setOpen(true);
					setErrorMsg(response.data.message);
				}
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

	return (
		<>
			<form
				className={`${
					param === "formules"
						? "bg-white text-black rounded-xl p-4 mt-4"
						: "bg-primary text-black mb-6 lg:m-4 p-2 rounded-md "
				}   flex flex-col relative`}
			>
				<div className="w-full justify-between flex-row">
					<span className="w-full text-center">id : {id}</span>
				</div>
				{type && (
					<>
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
					</>
				)}

				<button
					className="pointer absolute right-4 top-4"
					type="button"
					onClick={deleteProduct}
				>
					<TrashIcon className="w-8 h-8 text-black" />
				</button>
				<label>Titre {param === "formules" && "formule"} :</label>
				<input
					className=" pl-2 uppercase border-gold my-2 py-1 border w-full"
					placeholder={title}
					onChange={(e) => setTitleModif(e.target.value)}
				/>
				<label>Description {param === "formules" && "formule"}:</label>
				<input
					className=" pl-2  border-gold my-2 py-1 border w-full"
					placeholder={description}
					onChange={(e) => setDescriptionModif(e.target.value)}
				/>
				<label>Prix {param === "formules" && "formule"} :</label>
				<input
					className=" pl-2  border-gold my-2 py-1 border w-full"
					placeholder={price}
					onChange={(e) => setPrixModif(e.target.value)}
				/>

				<button
					className="rounded bg-gold px-4 py-2 my-2 w-1/2 hover:bg-white border border-gold hover:border hover:border-black hover:text-black"
					onClick={modifyProduct}
				>
					Valider
				</button>
				{checkValidity && (
					<span
						className={`${
							param === "formules" ? "text-black" : "text-white "
						} `}
					>
						Echec : {checkValidity}
					</span>
				)}
			</form>
			<PopUp open={open} setOpen={setOpen}>
				<header className="w-full flex justify-between items-center">
					<h2 className="font-Libre text-2xl font-bold w-1/2">
						Réservation
					</h2>
					<button
						className="cursor pointer"
						onClick={() => {
							setOpen(false);
						}}
					>
						<img src="/images/back-button.png" className="w-6 h-6" />
					</button>
				</header>
				<div className="flex flex-col">
					{errorMsg && <span className="pt-4">{errorMsg}</span>}
					<div className="flex flex-row w-full justify-between mt-8">
						<button
							className="bg-primary text-white px-4 py-2 rounded mt-4 mb-14"
							onClick={() => {
								setOpen(false);
							}}
						>
							Annuler
						</button>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default CardAdmin;
