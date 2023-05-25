import React, { useRef, useState, useEffect } from "react";

import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import MenuHeader from "@/components/footer-header/menu-header";
import AdminHandleCarte from "@/components/forms/admin-handle-carte";
import AdminHandleMenu from "@/components/forms/admin-handle-menu";
import AdminHandleTime from "@/components/forms/admin-handle-time";
import AdminHandleStars from "@/components/forms/admin-handle-stars";
import Footer from "@/components/footer-header/footer";
import axios from "axios";
import useAuth from "@/store/auth/hooks";
import Cookies from "js-cookie";
import PopUp from "@/components/popups/popup";

const Administrateur = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [open, setOpen] = useState(false);

	const auth = useAuth();

	const [adminCheck, setAdminCheck] = useState(false);

	const [products, setProducts] = useState();
	const [showProducts, setShowProducts] = useState();

	const [productsStars, setProductsStars] = useState();

	const [menu, setMenu] = useState();

	const [handleCarte, setHandleCarte] = useState(false);
	const [handleMenu, setHandleMenu] = useState(false);
	const [handleTime, setHandleTime] = useState(false);
	const [handleStars, setHandleStars] = useState(false);

	const [personnesMax, setPersonneMax] = useState(0);

	const [refresh, setRefresh] = useState(false);
	const [newSchedule, setNewSchedule] = useState();

	const updatePersonneMax = async () => {
		try {
			const cookie = Cookies.get("jwt");

			const response = await axios.post(
				`http://localhost:8000/administrator/constants.php`,
				{ id: "PLACES_RESERVATION", value: personnesMax, token: cookie }
			);
			if (response.status === 200) {
				console.log(response.data);
				setRefresh(!refresh);
			}
		} catch (error) {
			console.error("Erreur lors de l'insertion des produits: ", error);
		}
	};

	const handleOpening = (payload) => {
		setOpen(true);
		setNewSchedule(payload);
	};

	const submitNewOpenings = () => {
		console.log(newSchedule);
		const cookie = Cookies.get("jwt");
		axios
			.put(`http://localhost:8000/opening/index.php`, {
				payload: newSchedule,
				token: cookie,
			})
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la mise à jour des horaires :",
					error
				);
			});
	};

	useEffect(() => {
		if (products) {
			const typeMapping = {
				entree: "entrée",
				plat: "plats",
				dessert: "desserts",
			};

			const productsSorting = Object.values(
				products.reduce((acc, product) => {
					const title = typeMapping[product.type];

					if (!acc[title]) {
						acc[title] = {
							title: title,
							products: [],
						};
					}

					acc[title].products.push({
						id: product.id.toString(),
						title: product.titre,
						description: product.description,
						price: product.prix,
						type: product.type,
					});

					return acc;
				}, {})
			);
			if (adminCheck) {
				setShowProducts(productsSorting);
			}
		}
	}, [products, menu]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/administrator/products.php`
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

		const fetchProductsStars = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/administrator/products-phare.php`
				);
				if (response.status === 200) {
					console.log(response.data);
					setProductsStars(response.data.products);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des produits phars : ",
					error
				);
			}
		};

		const fetchCapacite = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/administrator/constants.php?id=PLACES_RESERVATION`
				);
				if (response.status === 200) {
					setPersonneMax(response.data.value);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération de la capacité : ",
					error
				);
			}
		};

		if (adminCheck) {
			fetchProducts();
			fetchProductsStars();
			fetchCapacite();
		}
	}, [refresh]);

	useEffect(() => {
		if (
			!auth.authStore.logged ||
			!auth.authStore.jwt ||
			!auth.authStore.isAdmin
		) {
			setAdminCheck(false);
		} else {
			setAdminCheck(true);
			setRefresh(!refresh);
		}
	}, []);

	return (
		<div>
			{adminCheck ? (
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

					<section className="w-full p-4 ">
						<div className="w-full flex justify-center">
							<div className="flex items items-center my-4 w-2/3 lg:mb-8 flex-col">
								<h2 className="font-Libre text-2xl lg:text-3xl  text-center w-full">
									Bienvue sur la page d'administration. Cliquez sur une
									card.
								</h2>
							</div>
						</div>
						<section className="w-full flex flex-col justify-center items-center mb-4">
							<div className="flex flex-row justify-center items-center">
								<label className="text-center mr-2">
									Capacité totale :
								</label>
								<input
									type="number"
									min={0}
									value={personnesMax}
									onChange={(e) => {
										setPersonneMax(e.target.value);
									}}
									className="w-20 h-8 border border-black rounded-lg bg-white text-primary font-semibold pl-2"
								/>
								<button
									className="bg-gold  px-2 text-white w-20 py-1 m-2 shadow-xl rounded-md font-semibold"
									onClick={async () => {
										updatePersonneMax();
									}}
								>
									Valider
								</button>
							</div>
						</section>
						<div className="w-full flex flex-row  justify-between flex-wrap">
							<button
								className={`${
									handleCarte
										? "bg-gold text-black"
										: "bg-primary text-white"
								} p-2 text-white w-32 h-28 mr-2 shadow-xl rounded-md`}
								onClick={() => {
									setHandleCarte(!handleCarte),
										setHandleMenu(false),
										setHandleTime(false),
										setHandleStars(false);
								}}
							>
								{handleCarte ? "Fermer" : "Modifier la carte"}
							</button>
							<button
								className={`${
									handleMenu
										? "bg-gold text-black"
										: "bg-primary text-white"
								} p-2 text-white w-32 h-28 mr-2 shadow-xl rounded-md`}
								onClick={() => {
									setHandleMenu(!handleMenu),
										setHandleCarte(false),
										setHandleTime(false),
										setHandleStars(false);
								}}
							>
								{handleMenu ? "Fermer" : "Modifier les menus"}
							</button>
							<button
								className={`${
									handleTime
										? "bg-gold text-black"
										: "bg-primary text-white"
								} p-2 text-white w-32 h-28 mr-2 shadow-xl rounded-md`}
								onClick={() => {
									setHandleTime(!handleTime),
										setHandleCarte(false),
										setHandleMenu(false),
										setHandleStars(false);
								}}
							>
								{handleTime ? "Fermer" : "Modifier les horaires"}
							</button>

							<button
								className={`${
									handleStars
										? "bg-gold text-black"
										: "bg-primary text-white"
								} p-2 text-white w-32 h-28 mr-2 shadow-xl rounded-md`}
								onClick={() => {
									setHandleStars(!handleStars),
										setHandleCarte(false),
										setHandleMenu(false),
										setHandleTime(false);
								}}
							>
								{handleStars
									? "Fermer"
									: "Modifier les produits phares"}
							</button>
						</div>
					</section>
					<section>
						{handleCarte && (
							<AdminHandleCarte
								showProducts={showProducts}
								products={products}
								setRefresh={setRefresh}
								refresh={refresh}
							/>
						)}
						{handleStars && (
							<AdminHandleStars
								products={products}
								productsStars={productsStars}
								setRefresh={setRefresh}
								refresh={refresh}
							/>
						)}
						{handleTime && (
							<AdminHandleTime handleOpening={handleOpening} />
						)}
						{handleMenu && (
							<AdminHandleMenu
								setMenu={setMenu}
								menu={menu}
								setRefresh={setRefresh}
								refresh={refresh}
							/>
						)}
					</section>
				</div>
			) : (
				<div>ACCES REFUSE</div>
			)}
			<MenuHeader className="pb-10" setOpenMenu={setOpenMenu} />

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
					{newSchedule &&
						Object.entries(newSchedule).map(([day, openHours], index) => (
							<div
								key={index}
								className="flex flex-row w-full justify-between"
							>
								<p className="text-start w-1/2 xs:ml-6 md:ml-0">
									{day}
								</p>
								<p className="text-start w-1/2">
									{openHours.map((hours, i) => (
										<span key={i} className="text-xs">
											{hours[0]}-{hours[1]}
											{i < openHours.length - 1 ? " / " : ""}
										</span>
									))}
								</p>
							</div>
						))}
					<div className="flex flex-row w-full justify-between mt-8">
						<button
							className="bg-gold text-white px-4 py-2 rounded mt-4 mb-14"
							onClick={submitNewOpenings}
						>
							Confirmer
						</button>
						<button className="bg-primary text-white px-4 py-2 rounded mt-4 mb-14">
							Annuler
						</button>
					</div>
				</div>
			</PopUp>
		</div>
	);
};
export default Administrateur;
