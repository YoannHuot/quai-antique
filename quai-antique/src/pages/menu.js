import React, { useRef, useState, useEffect } from "react";

import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import MenuHeader from "@/components/footer-header/menu-header";
import PopUp from "@/components/popups/popup";
import PopUpContentResa from "../components/popups/wrapper-resa";
import CardMenu from "@/components/cards/card-menu";
import Footer from "@/components/footer-header/footer";
import axios from "axios";
import WrapperResa from "@/components/popups/wrapper-resa.js";

const Menu = () => {
	const [open, setOpen] = useState(false);
	const [auth, setAuth] = useState(false);

	const [products, setProducts] = useState();
	const [showProducts, setShowProducts] = useState();
	const [menu, setMenu] = useState();
	const [po, setShowMenu] = useState();

	const deviceType = useDeviceType();

	useEffect(() => {
		if (products) {
			const typeMapping = {
				entree: "entrées",
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
					});

					return acc;
				}, {})
			);
			setShowProducts(productsSorting);
		}
	}, [products]);

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

		fetchProducts();
	}, []);

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
					<div className="lg:flex lg:flex-row">
						{_.map(showProducts, (contents, index) => {
							let lastColum = index + 1 === products.length;
							return (
								<div
									className={`pb-6 lg:${
										lastColum ? "mr-0" : "mr-8"
									} lg:w-1/3 lg:px-2`}
									key={index}
								>
									<h3 className="capitalize  text-xl font-Laila font-medium text-primary">
										{contents.title}
									</h3>
									<div className="w-16 bg-gold h-0.5 mb-4" />
									{_.map(contents.products, (content, index) => {
										return (
											<CardMenu
												title={content.title}
												description={content.description}
												price={Math.ceil(content.price)}
											/>
										);
									})}
								</div>
							);
						})}
					</div>
				</section>

				<section className="w-full pt-4 px-4">
					<div className="w-full flex justify-center">
						<div className="flex flex-row items items-center my-4 w-2/3 lg:mb-12">
							<div className="h-2 w-2  bg-gold rounded-full" />
							<h2 className="font-Libre text-2xl lg:text-3xl  text-center w-full">
								Nos Menus
							</h2>
							<div className="h-2 w-2 bg-gold rounded-full" />
						</div>
					</div>

					<div className="lg:flex lg:flew-row lg:text-center">
						{_.map(menu, (contents, index) => {
							let sectionEnd = index + 1 === menu.length;
							return (
								<div
									className={`${!sectionEnd && "pb-8"} lg:w-1/3 lg:${
										sectionEnd ? "mr-0" : "mr-4"
									}`}
								>
									<div className="lg:flex lg:flex-col lg:justify-center lg:items-center relative lg:mb-4">
										<div>
											<h3 className="capitalize  text-xl font-Laila font-medium text-primary">
												{contents.titre}
											</h3>
										</div>
										<div
											className="w-24 bg-gold  mb-4 flex flex-col  "
											style={
												deviceType !== "desktop"
													? { height: "3px" }
													: { height: "2px" }
											}
										/>
									</div>

									{_.map(contents.formules, (content, key) => {
										return (
											<div className="mb-4 relative" key={key}>
												<div className="lg:flex lg:flex-col lg:items-center">
													<h3 className=" capitalize text-base font-Laila lg:font-medium">
														{content.titre}
													</h3>
													<div className="absolute -top-2 right-0 flex">
														<div className="relative">
															<img
																src="/images/price.svg"
																className="w-8 h-8 md:w-10 md:h-10 "
															/>
															<span className="absolute text-xs font-light top-4 left-1">
																{Math.ceil(content.prix)}.
															</span>
														</div>
													</div>
												</div>

												<div className="flex flex-col italic text-xs lg:text-base font-Laila">
													{content.description}
												</div>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</section>
				<div className="mb-16 text-center">
					<Footer menu={true} />
				</div>
			</div>

			<MenuHeader className="pb-10" setOpen={setOpen} menu={menu} />
		</div>
	);
};
export default Menu;
