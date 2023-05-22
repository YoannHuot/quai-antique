import React, { useEffect, useState, useRef } from "react";
import _ from "underscore";
import { Inter } from "next/font/google";
import Fade from "@/components/fade";
import PopUp from "@/components/popups/popup.js";

import WrapperResa from "@/components/popups/wrapper-resa.js";
import Header from "@/components/footer-header/header";
import Authentification from "@/components/popups/authentification";
import Footer from "@/components/footer-header/footer";
import Login from "@/components/popups/login";
import useAuth from "@/store/auth/hooks";
import useDeviceType from "@/hooks/device-type";

export default function Home() {
	const auth = useAuth();
	const device = useDeviceType();
	const texts = ["73000, rue de Boigne", "Chambéry", "par Arnaud Michant"];
	const menu = ["Le menu", "Arnaud Michant", "Connexion"];

	const images = [
		{
			id: 1,
			title: "Raclette gastronomique",
			img: "/images/cheese.jpg",
		},
		{
			id: 2,

			title: "De bresse & de Savoie",
			img: "/images/chicken.jpg",
		},
		{
			id: 3,
			title: "Quiche du Dimanche soir",
			img: "/images/quiche.jpg",
		},
		{
			id: 4,
			title: "La rivière d'écailles",
			img: "/images/truite.jpg",
		},
		{
			id: 5,
			title: "Au bois jolie",
			img: "/images/stew.jpg",
		},
	];

	const [footerWidth, setFooterWidth] = useState("");
	const [open, setOpen] = useState(false);
	const [authentification, setAuthentification] = useState(false);
	const [signIn, setSignIn] = useState(false);

	const chiefImageRef = useRef(null);
	const mainRef = useRef(null);
	const firstSectionRef = useRef(null);

	useEffect(() => {
		if (auth.authStore.logged) {
			setSignIn(true);
		}
	}, [auth.authStore.logged]);

	/*
	 *
	 * Menu animation
	 *
	 */
	useEffect(() => {
		const handleResize = () => {
			setFooterWidth(mainRef.current.offsetWidth - 64);
		};

		if (mainRef.current) {
			handleResize();
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	/*
	 *
	 * Chief animation
	 *
	 */
	useEffect(() => {
		const handleScroll = () => {
			if (chiefImageRef.current) {
				const { top, height } =
					chiefImageRef.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const visibleHeight = Math.max(
					0,
					Math.min(height, windowHeight - top)
				);

				const scale = 1 + (visibleHeight / height) * 0.1;
				const translateY = -((scale - 1) * height) / 2;
				const opacity = 0.5 + (visibleHeight / height) * 0.5;
				chiefImageRef.current.style.opacity = opacity;

				chiefImageRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					window.addEventListener("scroll", handleScroll);
				} else {
					window.removeEventListener("scroll", handleScroll);
				}
			},
			{ threshold: 0 }
		);

		if (chiefImageRef.current) {
			observer.observe(chiefImageRef.current);
		}

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<main
			className="flex min-h-screen flex-col xs:p-2 sm:p-4 lg:p-8  overflow-hidden"
			ref={mainRef}
		>
			<div className="bg-white h-full">
				<section
					className="relative first-section flex xs:flex-col lg:flex-row flex-row w-full"
					ref={firstSectionRef}
					style={{ height: "calc(100vh - 32px)" }}
				>
					<div className="informations xs:w-full lg:w-1/3 h-8/10 flex items-center ">
						<div className=" xs:mb-4 lg:mb-12 logo-section flex flex-col w-full h-1/2 justify-evenly  items-center">
							<img
								className="xs:w-10 xs:h-10 lg:w-20 lg:h-20"
								src="images/logo-picto.png"
							/>
							<span className="font-Libre xs:text-base sm:text-lg md:text-xl text-5xl italic text-center leading-10">
								Le Quai Antique
							</span>
							<div className="flex xs:flex-row lg:flex-col">
								{_.map(texts, (text, index) => {
									return (
										<span
											key={index}
											className="font-Laila xs:text-sm xs:mr-1 text-lg text-center "
										>
											{text}
										</span>
									);
								})}
							</div>
							{device === "desktop" && (
								<div className="relative border-2 border-black rounded-full w-9 h-16 ">
									<div className="round-bounce round absolute top-2 left-3 transform -translate-x-1/2  bg-black w-2 h-2 rounded-full "></div>
								</div>
							)}
						</div>
					</div>
					<div className="carousel xs:w-full lg:w-2/3 h-9/10 bg-slate-400">
						<Fade />
					</div>
					<Header
						mainRef={mainRef}
						firstSectionRef={firstSectionRef}
						chiefImageRef={chiefImageRef}
						setAuthentification={setAuthentification}
						setOpen={setOpen}
					/>
				</section>

				<section className="second-section h-screen w-full bg-white mt-4">
					<h2 className="font-Libre font-medium italic text-2xl py-4">
						Nos plats signatures
					</h2>
					<div className="w-full h-full flex lg:flex-row card-container xs:flex-col">
						{_.map(images, (image, index) => {
							return (
								<div
									key={index}
									className={`lg:rounded-xl h-4/5 w-full flex-1 card overflow-hidden mt-4 ${
										index < images.length - 1 ? "lg:mr-1" : ""
									}`}
								>
									<div
										className="relative h-full w-full bg-center bg-no-repeat bg-red-200 flex items-end justify-center"
										style={{
											backgroundImage: `url(${image.img})`,
										}}
									>
										<div className="absolute bottom-0 z-10 w-full h-full lg:h-1/4 bg-gradient-to-t from-black via-black to-transparent opacity-50" />
										<span className="relative z-20 text-2xl lg:text-3xl capitalize text-white font-Libre font-semibold h-40 text-center flex justify-center items-center">
											{image.title}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</section>

				<section className="third-section relative flex flex-col w-full h-full lg:h-screen mt-24  lg:-mt-24">
					<h2 className="font-Libre font-medium italic text-2xl pb-4">
						Le chef Arnaud Michant
					</h2>
					<div className="flex flex-col lg:flex-row w-full">
						<div className="informations h-full w-full lg:w-1/2 flex items-center ">
							<div className="h-full w-full overflow-hidden relative z-20">
								<img
									className="lg:absolute top-0 left-0 object-cover w-full h-96 lg:h-full"
									src="images/chief.jpg"
									ref={chiefImageRef}
								/>
							</div>
						</div>
						<div className="chief-descripton h-full w-full lg:w-1/2  flex  flex-col lg:flex-row lg:justify-evenly  ">
							<div className="w-full lg:w-52 ">
								<span className="font-Laila text-base lg:text-lg">
									Pellentesque nec finibus sem, ac facilisis erat.
									Fusce elementum dui a eros malesuada, fermentum
									volutpat mi mollis. Aliquam eu purus in ligula
									placerat mattis. Vivamus turpis sem, cursus in leo
									sed, porttitor aliquam lorem. Phasellus convallis
									cursus nibh et molestie. Quisque porta quam nec
									eleifend convallis. Nam sit amet ligula ipsum.lorem.
									Phasellus convallis cursus nibh et molestie. Quisque
									porta quam nec eleifend convallis. Nam sit amet
									ligula ipsum.
								</span>
							</div>
							<div className="w-full lg:w-52 lg:mt-96">
								<span className="font-Laila text-base lg:text-lg">
									Pellentesque nec finibus sem, ac facilisis erat.
									Fusce elementum dui a eros malesuada, fermentum
									volutpat mi mollis. Aliquam eu purus in ligula
									placerat mattis. Vivamus turpis sem, cursus in leo
									sed, porttitor aliquam lorem. Phasellus convallis
									cursus nibh et molestie. Quisque porta quam nec
									eleifend convallis. Nam sit amet ligula ipsum.lorem.
									Phasellus convallis cursus nibh et molestie. Quisque
									porta quam nec eleifend convallis. Nam sit amet
									ligula ipsum.
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />

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
				<WrapperResa
					setSignIn={setSignIn}
					setOpen={setOpen}
					setAuthentification={setAuthentification}
				/>
			</PopUp>

			<PopUp open={authentification} setOpen={setAuthentification} large>
				<header className="w-full relative pb-4 border-black border-b">
					{auth.authStore.logged === false ? (
						<div className="w-full flex justify-between items-center ">
							<button
								className={`${!signIn ? "text-gold" : "text-black"} ${
									!auth.authStore.logged
										? " flex justify-center items-center "
										: "flex justify-start"
								}   w-1/2`}
								onClick={() => setSignIn(false)}
							>
								<h2
									className={`${
										!auth.authStore.logged ? "text-" : "text-"
									} font-Libre xs:text-lg lg:text-2xl font-bold `}
								>
									Connexion
								</h2>
							</button>

							<button
								className={`${
									signIn ? "text-gold" : "text-black"
								} flex justify-center items-center w-1/2`}
								onClick={() => setSignIn(true)}
							>
								<h2
									className={`font-Libre xs:text-lg lg:text-2xl text-center font-bold `}
								>
									Inscription
								</h2>
							</button>
						</div>
					) : (
						<h2
							className={`
						font-Libre xs:text-lg lg:text-2xl font-bold `}
						>
							<span>Mon profil</span>
						</h2>
					)}

					<button
						className="cursor pointer absolute -top-1 -right-2 lg:-right-4 lg:-top-4"
						onClick={() => {
							setAuthentification(false);
						}}
					>
						<img src="/images/back-button.png" className="w-6 h-6" />
					</button>
				</header>
				{signIn ? (
					<Authentification
						signIn={signIn}
						setAuthentification={setAuthentification}
					/>
				) : (
					<Login setSignIn={setSignIn} />
				)}
			</PopUp>
		</main>
	);
}
