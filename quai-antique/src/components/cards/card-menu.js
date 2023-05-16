import React from "react";

const CardMenu = ({ title, description, price, menu }) => {
	return (
		<div
			className={`relative flex flex-col font-medium   ${
				!menu && "lg:h-52 xs:mt-6 lg:mt-0"
			}`}
		>
			<h2
				className={`font-Laila xs:text-xs md:text-base mb-2 w-3/4 lg:${
					menu && "w-full"
				}`}
			>
				{title}
			</h2>
			<span className="font-Laila xs:text-xs md:text-base font-light">
				{description}
			</span>
			{!!price && (
				<div className="absolute -top-4 lg:-top-3 right-0 flex">
					<div className="relative">
						<img src="/images/price.svg" className="w-9 h-9 " />
						<span className="absolute text-xs font-light top-4 left-2">
							{price}.
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CardMenu;
