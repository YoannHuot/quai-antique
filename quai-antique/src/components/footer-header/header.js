import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import _ from "underscore";
import useDeviceType from "@/hooks/device-type";

const Header = ({
	mainRef,
	firstSectionRef,
	chiefImageRef,
	setOpen,
	setAuth,
}) => {
	const deviceType = useDeviceType();

	const headerTexts = [
		{
			text: deviceType === "desktop" ? "Le menu" : "Menu",
			href: "/menu",
		},

		{
			text: deviceType === "desktop" ? "Arnaud Michant" : "Chef Michant",
			onPress: () => {
				if (chiefImageRef.current) {
					chiefImageRef.current.scrollIntoView({ behavior: "smooth" });
				}
			},
		},
		{
			text: "Connexion",
			onPress: () => {
				setAuth(true);
			},
		},
	];
	const [headerWidth, setHeaderWidth] = useState("");
	const [isHeaderSticky, setIsHeaderSticky] = useState(false);

	const headerRef = useRef(null);

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
								className="font-Lustria text-center uppercase xs:text-xs md:text-base relative overflow-hidden underline-on-hover"
							>
								{m.text}
								<div className="h-0.5 bg-gold bottom-0 left-full w-full transition-all duration-300 ease-in-out transform translate-x-full"></div>
							</button>
						);
					})}

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
				</div>
			</div>
		</header>
	);
};

export default Header;
