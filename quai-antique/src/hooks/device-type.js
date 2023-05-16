import { useState, useEffect } from "react";

const useDeviceType = () => {
	const [deviceType, setDeviceType] = useState("desktop");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setDeviceType("mobile");
			} else if (window.innerWidth > 768 && window.innerWidth < 1024) {
				setDeviceType("tablet");
			} else {
				setDeviceType("desktop");
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return deviceType;
};

export default useDeviceType;
