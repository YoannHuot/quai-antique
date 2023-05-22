import React, { useRef, useState, useEffect } from "react";

import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import MenuHeader from "@/components/footer-header/menu-header";
import AdminHandleCarte from "@/components/forms/admin-handle-carte";
import PopUp from "@/components/popups/popup";
import PopUpContentResa from "../components/popups/wrapper-resa";
import CardAdmin from "@/components/cards/card-admin";
import Footer from "@/components/footer-header/footer";
import axios from "axios";

const Menu = () => {
	const [open, setOpen] = useState(false);

	const [products, setProducts] = useState();
	const [showProducts, setShowProducts] = useState();
	const [menu, setMenu] = useState();

	const [handleCarte, setHandleCarte] = useState(false);
	const [handleMenu, setHandleMenu] = useState(false);
	const [handleTime, setHandleTime] = useState(false);
	const [handleStars, setHandleStars] = useState(false);

	const [refreshDelete, setRefreshDelete] = useState(false);

	useEffect(() => {
		if (products) {
			const typeMapping = {
				entree: "entrée",
				plat: "plats",
				dessert: "desserts",
			};

			const productsSorting = Object.values(
				products.reduce((acc, product) => {
					// Convertir le type du produit à son équivalent en anglais
					const title = typeMapping[product.type];

					if (!acc[title]) {
						// Si ce groupe n'existe pas encore, le créer
						acc[title] = {
							title: title,
							products: [],
						};
					}

					// Ajouter le produit au groupe approprié
					acc[title].products.push({
						id: product.id.toString(),
						title: product.titre,
						description: product.description,
						price: product.prix,
					});

					return acc;
				}, {})
			);
			setShowProducts(productsSorting);
		}
	}, [products, menu]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/administrator/index.php"
				);
				if (response.status === 200) {
					setProducts(response.data.products);
					setMenu(response.data.menus);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des produits : ",
					error
				);
			}
		};
		fetchProducts();
	}, [refreshDelete]);

	return (
		<div>
			<div className="flex min-h-screen flex-col xs:p-2 sm:p-4 lg:p-8">
				<div className="h-32 w-full relative">
					<h1 className="font-Libre italic w-40 z-20 font-semibold text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
						Le Quai Antique
					</h1>
					<img
						src="/images/home-picture-2.jpg"
						className="object-cover h-full w-full"
					/>
					<div className="absolute bottom-0 z-10 w-full h-full lg:h-1/4 bg-gradient-to-t from-black via-black to-transparent opacity-40" />
				</div>

				<section className="w-full p-4">
					<div className="w-full flex justify-center">
						<div className="flex flex-row items items-center my-4 w-2/3 lg:mb-8">
							<div className="h-2 w-2  bg-gold rounded-full" />
							<h2 className="font-Libre text-2xl lg:text-3xl  text-center w-full">
								La Carte
							</h2>
							<div className="h-2 w-2 bg-gold rounded-full" />
						</div>
					</div>
					<div className="w-full flex-row flex justify-between">
						<button
							className="bg-primary p-2 text-white w-32 h-28 mr-2"
							onClick={() => setHandleCarte(!handleCarte)}
						>
							{handleCarte ? "Fermer" : "Modifier la carte"}
						</button>
						<button
							className="bg-primary p-2 text-white w-32 h-28 mr-2"
							onClick={() => setHandleMenu(!handleMenu)}
						>
							{handleMenu ? "Fermer" : "Modifier les menus"}
						</button>
						<button
							className="bg-primary p-2 text-white w-32 h-28 mr-2"
							onClick={() => setHandleTime(!handleTime)}
						>
							{handleTime ? "Fermer" : "Modifier les horaires"}
						</button>

						<button
							className="bg-primary p-2 text-white w-32 h-28 "
							onClick={() => setHandleStars(!handleStars)}
						>
							{handleStars ? "Fermer" : "Modifier les produits phares"}
						</button>
					</div>
				</section>
				<section>
					{handleCarte && (
						<AdminHandleCarte
							showProducts={showProducts}
							products={products}
							setRefreshDelete={setRefreshDelete}
						/>
					)}
					{handleStars && <div>WORK IN PROGRESS</div>}
					{handleTime && <div>WORK IN PROGRESS</div>}
					{handleMenu && <div>Work in pro</div>}
				</section>

				{/* <div className="mb-16 text-center">
					<Footer menu />
				</div> */}
			</div>
			<MenuHeader className="pb-10" setOpen={setOpen} />
		</div>
	);
};
export default Menu;
