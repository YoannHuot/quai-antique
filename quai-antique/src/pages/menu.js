import React, { useRef, useState } from "react";

import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import MenuHeader from "@/components/footer-header/menu-header";
import PopUp from "@/components/popups/popup";
import PopUpContentResa from "../components/popups/wrapper-resa";
import PopUpContentAuth from "../components/popups/popup-content-auth.js";
import CardMenu from "@/components/cards/card-menu";
import Footer from "@/components/footer-header/footer";

const Menu = () => {
	const [open, setOpen] = useState(false);
	const [auth, setAuth] = useState(false);

	const deviceType = useDeviceType();
	const mainRef = useRef(null);
	const firstSectionRef = useRef(null);

	const carteContents = [
		{
			title: "entrée",
			products: [
				{
					id: "1",
					title: "Salade de Reblochon et noix",
					description:
						"Salade fraîche avec des morceaux de fromage Reblochon, des noix croquantes et une vinaigrette aux herbes",
					price: "12",
				},
				{
					id: "2",
					title: "Salade de Reblochon et noix",
					description:
						"Salade fraîche avec des morceaux de fromage Reblochon, des noix croquantes et une vinaigrette aux herbes",
					price: "12",
				},
				{
					id: "3",
					title: "Salade de Reblochon et noix",
					description:
						"Salade fraîche avec des morceaux de fromage Reblochon, des noix croquantes et une vinaigrette aux herbes",
					price: "12",
				},
				{
					id: "4",
					title: "Salade de Reblochon et noix",
					description:
						"Salade fraîche avec des morceaux de fromage Reblochon, des noix croquantes et une vinaigrette aux herbes",
					price: "12",
				},
			],
		},

		{
			title: "plats",
			products: [
				{
					id: "1",
					title: "Fondue Savoyarde",
					description:
						"Mélange de fromage fondu dans du vin blanc avec des morceaux de pain frais, servi avec des pommes de terre et des légumes frais de saison",
					price: "26",
				},
				{
					id: "2",
					title: "Fondue Savoyarde",
					description:
						"Mélange de fromage fondu dans du vin blanc avec des morceaux de pain frais, servi avec des pommes de terre et des légumes frais de saison",
					price: "26",
				},
				{
					id: "3",
					title: "Fondue Savoyarde",
					description:
						"Mélange de fromage fondu dans du vin blanc avec des morceaux de pain frais, servi avec des pommes de terre et des légumes frais de saison",
					price: "26",
				},
				{
					id: "4",
					title: "Fondue Savoyarde",
					description:
						"Mélange de fromage fondu dans du vin blanc avec des morceaux de pain frais, servi avec des pommes de terre et des légumes frais de saison",
					price: "26",
				},
			],
		},
		{
			title: "desserts",
			products: [
				{
					id: "1",
					title: "Tarte aux myrtilles",
					description:
						"Ragoût de cerf mijoté avec des champignons sauvages frais et des légumes de saison, servi avec de la polenta crémeuse.",
					price: "9",
				},
				{
					id: "2",
					title: "Tarte aux myrtilles",
					description:
						"Ragoût de cerf mijoté avec des champignons sauvages frais et des légumes de saison, servi avec de la polenta crémeuse.",
					price: "9",
				},
				{
					id: "3",
					title: "Tarte aux myrtilles",
					description:
						"Ragoût de cerf mijoté avec des champignons sauvages frais et des légumes de saison, servi avec de la polenta crémeuse.",
					price: "9",
				},
				{
					id: "4",
					title: "Tarte aux myrtilles",
					description:
						"Ragoût de cerf mijoté avec des champignons sauvages frais et des légumes de saison, servi avec de la polenta crémeuse.",
					price: "9",
				},
			],
		},
	];
	const menuContents = [
		{
			title: "Savoy'art",
			price: "51",
			menu: {
				entrées: {
					title: "entrées",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
				plats: {
					title: "plats",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
				desserts: {
					title: "desserts",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
			},
		},
		{
			title: "Grand-Maman",
			price: "42",
			menu: {
				entrées: {
					title: "entrées",
					products: [
						{
							title: "Velouté de potiron et diots de Savoie",
							description:
								"une soupe onctueuse à base de potiron frais et de saucisses diots de Savoie fumées, servie avec des croûtons dorés",
						},
						{
							title: "Tartare de truite de montagne",
							description:
								"une soupe onctueuse à base de potiron frais et de saucisses diots de Savoie fumées, servie avec des croûtons dorés.",
						},
					],
				},
				plats: {
					title: "plats",
					products: [
						{
							title: "Filet de truite du Lac Léman, sauce aux écrevisses",
							description:
								"Filet de truite fraîche du lac Léman cuit à la perfection, servi avec une sauce crémeuse aux écrevisses et accompagné de légumes de saison",
						},
						{
							title: "Poularde de Bresse farcie aux cèpes, croûte de sel et d'herbes",
							description:
								"une soupe onctueuse à base de potiron frais et de saucisses diots de Savoie fumées, servie avec des croûtons dorés",
						},
					],
				},
				desserts: {
					title: "desserts",
					products: [
						{
							title: "Beignets aux pommes",
							description:
								"une soupe onctueuse à base de potiron frais et de saucisses diots de Savoie fumées, servie avec des croûtons dorés",
						},
						{
							title: "Crème brûlée à la Chartreuse",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
			},
		},
		{
			title: "Bon & bon",
			price: "64",
			menu: {
				entrées: {
					title: "entrées",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
				plats: {
					title: "plats",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
				desserts: {
					title: "desserts",
					products: [
						{
							title: "Quiche aux poireaux et fromage de chèvre",
							description:
								"Quiche légère et savoureuse, garnie de poireaux frais et de fromage de chèvre fondant.",
						},
						{
							title: "Salade de lentilles aux lardons",
							description:
								"Salade fraîche et saine de lentilles, de lardons fumés et de légumes verts.",
						},
					],
				},
			},
		},
	];

	return (
		<main>
			<div
				className="flex min-h-screen flex-col xs:p-2 sm:p-4 lg:p-8"
				ref={mainRef}
			>
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

				<section className="w-full p-4" ref={firstSectionRef}>
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
						{_.map(carteContents, (contents, index) => {
							let lastColum = index + 1 === carteContents.length;

							return (
								<div
									className={`pb-6 lg:${
										lastColum ? "mr-0" : "mr-8"
									} lg:w-1/3`}
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
												price={content.price}
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
						{_.map(menuContents, (contents, index) => {
							let sectionEnd = index + 1 === menuContents.length;
							return (
								<div
									className={`${!sectionEnd && "pb-8"} lg:w-1/3 lg:${
										sectionEnd ? "mr-0" : "mr-4"
									}`}
								>
									<div className="lg:flex lg:flex-col lg:justify-center lg:items-center relative lg:mb-4">
										<div>
											<h3 className="capitalize  text-2xl font-Laila font-medium text-primary">
												{contents.title}
											</h3>
											<div className="absolute -top-2 right-0 flex">
												<div className="relative">
													<img
														src="/images/price.svg"
														className="w-8 h-8 md:w-10 md:h-10 "
													/>
													<span className="absolute font-light top-4 left-1">
														{contents.price}.
													</span>
												</div>
											</div>
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

									{_.map(contents.menu, (content, key) => {
										return (
											<div className="mb-12" key={key}>
												<div className="lg:flex  lg:flex-col lg:items-center">
													<h3 className=" capitalize text-lg">
														{content.title}
													</h3>
													<div className="w-8 bg-gold h-0.5  flex flex-col mb-4" />
												</div>

												<div className="flex flex-col">
													{_.map(
														content.products,
														(product, i) => {
															let isEnd =
																i + 1 ===
																content.products.length;
															return (
																<div className="flex flex-col ">
																	<CardMenu
																		menu
																		title={product.title}
																		description={
																			product.description
																		}
																	/>
																	{!isEnd && (
																		<span className="pb-4 pt-3 h-12 text-center">
																			OU
																		</span>
																	)}
																</div>
															);
														}
													)}
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
					<Footer menu />
				</div>
			</div>
			<MenuHeader className="pb-10" setOpen={setOpen} />

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
				<PopUpContentResa />
			</PopUp>

			<PopUp open={auth} setOpen={setAuth}>
				<header className="w-full flex justify-between items-center">
					<h2 className="font-Libre text-2xl font-bold w-2/3">
						Création de compte
					</h2>
					<button
						className="cursor pointer"
						onClick={() => {
							setAuth(false);
						}}
					>
						<img src="/images/back-button.png" className="w-6 h-6" />
					</button>
				</header>
				<PopUpContentAuth />
			</PopUp>
		</main>
	);
};
export default Menu;
