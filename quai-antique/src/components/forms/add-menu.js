import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddMenu = ({ setRefresh, refresh, param }) => {
	const [title, setTitle] = useState("");
	const [formules, setFormules] = useState([
		{
			titre: "",
			description: "",
			prix: "",
		},
	]);
	const [checkValidity, setCheckValidity] = useState(null);

	const addMenu = async (e) => {
		e.preventDefault();

		const regex = /^\d+(\.\d{1,2})?$/;

		if (
			title.length <= 3 ||
			!formules.every((formule) => regex.test(formule.prix)) ||
			formules.some(
				(formule) =>
					formule.description.length <= 0 || formule.titre.length <= 3
			)
		) {
			setCheckValidity("Les informations sont incorrectes");
			return;
		}

		try {
			const cookie = Cookies.get("jwt");
			console.log(formules);
			const response = await axios.post(
				`${"/backend"}/administrator/${param}.php`,
				{
					token: cookie,
					titre: title,
					formules: formules,
				}
			);
			if (response.status === 200) {
				setRefresh(!refresh);
				setTitle("");
				setRefresh(!refresh);
			}
		} catch (error) {
			console.error("Erreur lors de l'insertion du menu : ", error);
		}
	};

	const addFormule = (e) => {
		e.preventDefault();
		setFormules([...formules, { titre: "", description: "", prix: "" }]);
	};

	return (
		<div className="text-white">
			<h2 className="text-xl font-Laila font-medium text-primary">
				Ajouter un {param}
			</h2>
			<div className="w-16 bg-gold h-0.5 mb-4" />
			<form className="bg-primary rounded-md m-2 p-2 flex flex-col relative">
				<label>Titre du Menu :</label>
				<input
					type="text"
					className="text-black border-gold my-2 pl-2 py-1 border w-full"
					onChange={(e) => setTitle(e.target.value)}
				/>

				<div className="flex flex-col">
					{formules.map((formule, index) => (
						<div key={index} className="flex flex-col my-4">
							<label>Titre de la Formule {index + 1}:</label>
							<input
								className="text-black border-gold my-2 pl-2 py-1 border w-full"
								type="text"
								value={formule.titre}
								onChange={(e) => {
									const newFormules = [...formules];
									newFormules[index].titre = e.target.value;
									setFormules(newFormules);
								}}
							/>

							<label>Description de la Formule :</label>
							<input
								className="text-black border-gold my-2 pl-2 py-1 border w-full"
								type="text"
								onChange={(e) => {
									const newFormules = [...formules];
									newFormules[index].description = e.target.value;
									setFormules(newFormules);
								}}
							/>

							<label>Prix de la Formule :</label>
							<input
								className="text-black border-gold my-2 pl-2 py-1 border w-full"
								type="text"
								onChange={(e) => {
									const newFormules = [...formules];
									newFormules[index].prix = e.target.value;
									setFormules(newFormules);
								}}
							/>
						</div>
					))}
				</div>

				<div className="w-full flex flex-row justify-between">
					<button
						className=" py-2 px-4 border border-white hover:bg-gold hover:text-black"
						onClick={addFormule}
					>
						Ajouter une autre formule
					</button>

					<button
						className=" py-2 px-4 border text-black border-white hover:bg-green-400 hover:text-black mt-2 bg-gold"
						onClick={addMenu}
					>
						Valider le menu
					</button>
				</div>

				{checkValidity && (
					<span className="text-white ">Echec : {checkValidity}</span>
				)}
			</form>
		</div>
	);
};

export default AddMenu;
