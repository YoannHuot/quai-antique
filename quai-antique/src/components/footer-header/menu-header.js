import React from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const MenuHeader = ({ setOpen }) => {
	return (
		<div
			className={`menu px-2 h-14 w-full flex justify-between items-center bg-primary fixed bottom-0 z-40 
    }`}
		>
			<Link href={"/"}>
				<div className="w-40 font-Lustria flex flex-row justify-center lg:justify-start items-center text-white text-center uppercase xs:text-lg md:text-base relative overflow-hidden ">
					<ArrowLeftCircleIcon className="w-8 h-8 mr-2" />
					<span>Acceuil</span>
				</div>
			</Link>
			<button
				onClick={() => {
					setOpen(true);
				}}
			>
				<img
					src="images/CTA.png"
					className="xs:w-12 xs:h-12 lg:w-14 lg:h-14"
				/>
			</button>
		</div>
	);
};

export default MenuHeader;
