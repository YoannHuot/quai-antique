import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";

const CardAdmin = ({ title, description, price, id }) => {
	const deleteProduct = (e) => {
		e.preventDefault();
		const cookie = Cookies.get("jwt");
		console.log(Cookies);
		axios
			.delete("http://localhost:8000/administrator/products.php", {
				params: {
					token: cookie,
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log("error : ");
				console.log(error);
			});
	};

	return (
		<form className="bg-primary text-gray-400 rounded-md m-2 p-2 flex flex-col relative">
			<div className="w-full justify-between flex-row">
				<span className="w-full text-center">id : {id}</span>
			</div>
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
				value={title}
			/>
			<label>Description :</label>
			<input
				className=" border-gold my-2 py-1 border w-full"
				value={description}
			/>
			<label>Prix :</label>
			<input
				className=" border-gold my-2 py-1 border w-full"
				value={price}
			/>

			<button className=" px-4 border border-white hover:bg-gold hover:text-black">
				Valider
			</button>
		</form>
	);
};

export default CardAdmin;
