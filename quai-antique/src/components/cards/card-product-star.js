import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";

const CardProductStar = ({
	index,
	products,
	productStar,
	refresh,
	setRefresh,
}) => {
	const [productId, setProductId] = useState(productStar.id);
	const [photo, setPhoto] = useState(null);

	const [photoUrl, setPhotoUrl] = useState(null);

	const updateProductStar = async (e) => {
		e.preventDefault();
		const cookie = Cookies.get("jwt");

		const formData = new FormData();

		if (photo !== null) {
			formData.append("photo", photo);
		}

		console.log(productId);
		formData.append("id", productStar.productStarId);
		formData.append("productId", productId);
		formData.append("token", cookie);

		try {
			setPhotoUrl(null);
			setPhoto(null);

			const response = await axios.post(
				`http://localhost:8000/administrator/products-phare.php`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				setRefresh(!refresh);
			}
		} catch (error) {
			console.error(
				"Erreur lors de la modification du produit phare: ",
				error
			);
		}
	};

	useEffect(() => {
		setPhotoUrl(`http://localhost:8000/image.php?file=${productStar.photo}`);
	}, [productStar]);

	return (
		<>
			<div className="text-white bg-primary text-black rounded-md p-4 flex flex-col relative w-full">
				{productStar && (
					<>
						<div className="flex flex-col">
							<div className="flex flex-col justify-between">
								<div className="flex flex-col p-2">
									<label className="mb-2">Produit :</label>
									<select
										value={productId}
										onChange={(e) => setProductId(e.target.value)}
										className="border border-black w-1/2 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
									>
										{products.map((product, index) => (
											<option
												key={index}
												value={product.id}
												selected={product.id === productStar.id}
											>
												{product.titre}
											</option>
										))}
									</select>
								</div>
								<div className="flex items-center justify-center p-2 relative">
									<label
										htmlFor={`dropzone-file${index}`}
										className="z-20 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:border-white"
									>
										<>
											{photo && (
												<img
													className="z-10 absolute w-full h-full object-cover opacity-50"
													src={URL.createObjectURL(photo)}
												/>
											)}
											{!photo && photoUrl && (
												<img
													className="z-10 absolute w-full h-full object-cover opacity-50"
													src={photoUrl}
												/>
											)}
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<p className="z-10 mb-2 text-sm text-white">
													Cliquez pour ajouter une image
												</p>
												{/* Dégradé */}
												<div className="absolute w-full h-full bg-gradient-to-t from-black-200 to-transparent"></div>
											</div>
											<input
												id={`dropzone-file${index}`}
												type="file"
												className="hidden"
												onChange={(e) =>
													setPhoto(e.target.files[0])
												}
												accept="image/png, image/jpeg"
											/>
										</>
									</label>
								</div>

								<div className="flex flex-row justify-center p-2">
									<button
										className="mb-4 mt-2 bg-gold text-black rounded px-5 py-2  hover:border-white hover:border hover:text-black"
										onClick={updateProductStar}
									>
										Valider
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CardProductStar;
