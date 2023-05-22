import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import useAuth from "../../store/auth/hooks";

const Header = ({
	mainRef,
	firstSectionRef,
	chiefImageRef,
	setOpen,
	setAuthentification,
}) => {
	const deviceType = useDeviceType();
	const auth = useAuth();
	const [headerWidth, setHeaderWidth] = useState("100%");
	const [isHeaderSticky, setIsHeaderSticky] = useState(false);
	const [hasSignIn, setHasSignIn] = useState(false);
	const [IsMounted, setIsMounted] = useState(false);

	const headerRef = useRef(null);

	const headerTexts = [
		{
			text: deviceType === "desktop" ? "Le menu" : "Menu",
			href: "/menu",
		},

		{
			text: deviceType === "desktop" ? "Arnaud Michant" : "Le chef ",
			onPress: () => {
				if (chiefImageRef.current) {
					chiefImageRef.current.scrollIntoView({ behavior: "smooth" });
				}
			},
		},
		{
			text: "mon profil",
			onPress: () => {
				setAuthentification(true);
				setHasSignIn(false);
			},
		},
	];

	useEffect(() => {
		if (!auth.authStore.jwt || auth.authStore.jwt.length < 1) {
			console.warn("Error 401 : no session token detected");
		} else if (auth.authStore.jwt && auth.authStore.jwt.length > 1) {
			setHasSignIn(true);
		} else if (auth.authStore.jwt === "" || auth.authStore.logged === false) {
			setHasSignIn(false);
		}
	}, [auth.authStore]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	/*
	 *
	 * Header animation
	 *
	 */
	useEffect(() => {
		const handleScroll = () => {
			if (firstSectionRef) {
				const sectionHeight =
					firstSectionRef.current.offsetHeight -
					headerRef.current.offsetHeight +
					10;

				if (window.scrollY >= sectionHeight) {
					setIsHeaderSticky(true);
				} else {
					setIsHeaderSticky(false);
				}
			}
		};

		const handleResize = () => {
			if (deviceType === "mobile" || deviceType === "tablet") {
				setHeaderWidth(mainRef.current.offsetWidth - 16);
			}
			if (deviceType === "desktop") {
				setHeaderWidth(mainRef.current.offsetWidth - 32);
			}
		};

		if (mainRef.current) {
			handleResize();
		}

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [deviceType]);

	return (
		<header
			ref={headerRef}
			className={` menu h-24 bg-white duration-300  ${
				isHeaderSticky ? "fixed top-0 z-40 " : "absolute bottom-0 z-40 "
			}`}
			style={{ width: headerWidth }}
		>
			<div className="w-full flex justify-center items-center h-full">
				<div className="w-full lg:w-2/3 h-full justify-evenly flex flex-row items-center overflow-x-auto">
					{_.map(headerTexts, (m, index) => {
						return m.href ? (
							<Link href={m.href} key={index}>
								<button
									onClick={m.onPress}
									className="font-Lustria text-center uppercase xs:text-xs md:text-base relative overflow-hidden underline-on-hover"
								>
									{m.text}
									<div className="h-0.5 bg-gold bottom-0 left-full w-full transition-all duration-300 ease-in-out transform translate-x-full"></div>
								</button>
							</Link>
						) : (
							<button
								onClick={m.onPress}
								key={index}
								className="font-Lustria pt-1 text-center uppercase xs:text-xs md:text-base relative overflow-hidden underline-on-hover"
							>
								{m.text}
								<div className="h-0.5 bg-gold bottom-0 left-full w-full transition-all duration-300 ease-in-out transform translate-x-full"></div>
							</button>
						);
					})}

					{IsMounted && auth.authStore.isAdmin ? (
						<Link href={"/administrateur"}>
							<button className="font-Lustria text-gold font-bold pt-1 text-center uppercase xs:text-xs md:text-base relative overflow-hidden">
								Page admin
							</button>
						</Link>
					) : (
						<button
							onClick={() => {
								setOpen(true);
							}}
						>
							<img
								src="images/CTA.png"
								className="xs:w-9 xs:h-9 lg:w-14 lg:h-14"
							/>
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
