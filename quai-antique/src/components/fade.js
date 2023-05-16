import React, { useState, useEffect, use } from "react";
import useDeviceType from "@/hooks/device-type";

const images = [
	"/images/home-picture.jpg",
	"/images/home-picture-2.jpg",
	"/images/home-picture-3.jpg",
];

const Fade = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const device = useDeviceType();
	useEffect(() => {
		const changeImageTimer = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 3000);

		return () => {
			clearInterval(changeImageTimer);
		};
	}, []);

	return (
		<div className="relative h-full bg-white">
			{images.map((image, index) => (
				<img
					key={index}
					src={image}
					alt={`Image ${index + 1}`}
					className={`${
						device === "mobile" ? "h-9/10 " : "h-full"
					} w-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
						index === currentImageIndex
							? "opacity-100 delay-800"
							: "opacity-0"
					}`}
				/>
			))}
		</div>
	);
};

export default Fade;
