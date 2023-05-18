import React, { useEffect, useState } from "react";
import useDeviceType from "@/hooks/device-type";
import useSchedule from "@/hooks/schedule";
import axios from "axios";

const Footer = ({ menu }) => {
	const deviceType = useDeviceType();
	const schedule = useSchedule();

	return (
		<footer
			className={`bg-white w-full font-Laila  ${
				menu ? "mt-0" : "mt-10"
			} md:mt-14 lg:mt-0 text-xs lg:text-base`}
		>
			<div className="flex w-full flex-col-reverse md:flex-row">
				<div className="flex-shrink-0 flex-col flex justify-center xs:items-center md:items-start lg:items-center xs:mt-6 md:mt-0 ">
					<span className="font-Libre italic">Le Quai Antique</span>
					{deviceType !== "mobile" && (
						<div className="flex flex-row  items-center lg:justify-start">
							<img
								className="object-contain object-center xs:w-12 xs:h-12 lg:w-20 lg:h-20"
								src="images/logo-picto.png"
								alt="Logo"
							/>
							<span className="w-4 leading-8 md:text-xs text-lg">
								Arnaud Michant
							</span>
						</div>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 lg:pl-8 w-full">
					<div className="col-span-1">
						<h3 className="font-bold lg:mb-4 mb-1 text-center">
							Adresse
						</h3>
						<div className="md:flex-col flex flex-row  justify-center">
							<p className="text-center mr-1 lg:mr-0">73000,</p>
							<p className="text-center mr-1 lg:mr-0">
								14 rue de Boigne,
							</p>
							<p className="text-center mr-1 lg:mr-0">Chambèry</p>
						</div>
					</div>

					<div className="col-span-1 md:col-span-2">
						<h3 className="font-bold lg:mb-4 mb-1 text-center">
							Horaires
						</h3>

						{Object.entries(schedule.weekSchedule).map(
							([day, openHours], index) => (
								<div
									key={index}
									className="flex flex-row w-full justify-between"
								>
									<p className="text-start w-1/2 xs:ml-6 md:ml-0">
										{day}
									</p>
									<p className="text-start w-1/2">
										{openHours.map((hours, i) => (
											<span key={i}>
												{hours[0]}-{hours[1]}
												{i < openHours.length - 1 ? " / " : ""}
											</span>
										))}
									</p>
								</div>
							)
						)}
					</div>

					<div className="col-span-1 flex justify-center flex-col items-center">
						<h3 className="font-bold lg:mb-4 mb-1 text-center">
							Réserver
						</h3>
						<p className="text-center">01 41 40 42 45</p>
						<img
							src="images/CTA.png"
							className="xs:w-10 xs:h-10 lg:w-20 lg:h-20 text-center"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
