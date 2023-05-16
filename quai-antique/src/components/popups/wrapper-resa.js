import React, { useState } from "react";
import _ from "underscore";
import SelectedHours from "@/components/selected-hours.js";
import SelectedDays from "@/components/selected-days.js";
import useDeviceType from "@/hooks/device-type";

const FooterPopup = ({ onPress1, onPress2, text1, text2 }) => {
	const deviceType = useDeviceType();

	return (
		<footer className="absolute px-4 lg:px-8 bottom-4 flex left-1/2 transform -translate-x-1/2  w-full justify-between text-sm text-white font-semibold">
			{text1 && onPress1 && (
				<button
					className={`${
						deviceType === "mobile" ? "w-28" : "w-40"
					}  bg-gold rounded-lg h-8`}
					onClick={onPress1}
				>
					{text1}
				</button>
			)}
			{text2 && onPress2 && (
				<button
					className={`${
						deviceType === "mobile" ? "w-28" : "w-40"
					}  bg-primary rounded-lg h-8`}
					onClick={onPress2}
				>
					{text2}
				</button>
			)}
		</footer>
	);
};

const Authentification = ({ setIndex }) => {
	const deviceType = useDeviceType();

	return (
		<div className=" w-full pt-6">
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Email</label>
				<div className="w-1/2 flex justify-end">
					<input className={inputStyle} />
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">
					{deviceType === "mobile" ? "Mdp" : " Mot de passe"}
				</label>
				<div className="w-1/2 flex justify-end">
					<input className={inputStyle} />
				</div>
			</div>
			<div className="text-center italic text-xs">
				<span>Vous n'avez pas de compte ? </span>
				<span className="text-gold font-semibold">Enregistrez-vous</span>
			</div>
			<div className="w-full h-auto flex justify-center items-center py-8">
				<div className="w-2 h-12 border-black border-r" />
			</div>
			<FooterPopup
				onPress1={() => console.log("connexion")}
				onPress2={() => setIndex(2)}
				text1={"Connexion"}
				text2={
					deviceType === "mobile" ? "Continuer" : "Réserver sans compte"
				}
			/>
		</div>
	);
};

const Reservation = ({ setIndex }) => {
	const deviceType = useDeviceType();

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedAllergies, setSelectedAllergies] = useState([]);
	const allergies = [
		{ alt: "abalone", img: "/images/allergies/abalone.svg", id: 1 },
		{ alt: "apple", img: "/images/allergies/apple.svg", id: 2 },
		{ alt: "eggs", img: "/images/allergies/eggs.svg", id: 3 },
		{ alt: "fish", img: "/images/allergies/fish.svg", id: 4 },
		{ alt: "soy-bean", img: "/images/allergies/soy-bean.svg", id: 5 },
		{ alt: "wheat", img: "/images/allergies/wheat.svg", id: 6 },
	];

	return (
		<div className="w-full pt-6">
			<SelectedDays
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<SelectedHours
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2">Convives</label>
				<div className="w-1/2 flex justify-end">
					<select className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2">
						{[...Array(12)].map((_, i) => (
							<option key={i} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<span>Sélectionnez vos allergies</span>
				<div className="flex flew-row justify-between mt-4">
					{_.map(allergies, (allergie, index) => {
						let selected = _.find(selectedAllergies, (e) => {
							return e.id === allergie.id;
						});
						return (
							<button
								index={index}
								onClick={() => {
									if (selected) {
										setSelectedAllergies(
											selectedAllergies.filter(
												(e) => e.id !== allergie.id
											)
										);
									} else {
										setSelectedAllergies([
											...selectedAllergies,
											allergie,
										]);
									}
								}}
								className={`${
									selected
										? "border border-gold bg-primary"
										: "bg-slate-400"
								}  h-9 w-9 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full flex justify-center items-center`}
							>
								<img src={allergie.img} />
							</button>
						);
					})}
				</div>
			</div>
			<FooterPopup
				onPress1={() => setIndex(1)}
				onPress2={() => setIndex(3)}
				text1={"Retour"}
				text2={
					deviceType === "mobile" ? "Continuer" : "Réserver sans compte"
				}
			/>
		</div>
	);
};

const NoAuth = ({ setIndex }) => {
	const deviceType = useDeviceType();

	return (
		<div className="w-full h-2/3 pt-6 flex justify-center items-center">
			<div className="mb-4 w-full flex justify-between items-center ">
				<label className="w-1/2 ">Email</label>
				<div className="w-1/2 flex justify-end">
					<input className={inputStyle} />
				</div>
			</div>
			<FooterPopup
				onPress1={() => setIndex(2)}
				onPress2={() => setIndex(4)}
				text1={"Retour"}
				text2={
					deviceType === "mobile" ? "Continuer" : "Réserver sans compte"
				}
			/>
		</div>
	);
};

const Thanks = () => {
	return (
		<div className="w-full h-full xs:pb-12 pb-6 flex flex-col text-center items-center justify-center ">
			<span className="lg:mb-4 font-semibold">
				Merci pour votre réservation !
			</span>
			<div className="xs:w-2/3 lg:w-1/2 flex flex-col items-center text-center bg-slate-200 p-4 rounded-lg">
				<span className="mb-2 ">Aucun convive ne souffre d’allergie</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">Table réservé pour 4 personnes</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">le 12/08/2023</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">à 10h30</span>
			</div>
		</div>
	);
};

const WrapperResa = () => {
	const [index, setIndex] = useState(1);

	const content = () => {
		switch (index) {
			case 1:
				return <Authentification setIndex={setIndex} />;
				break;
			case 2:
				return <Reservation setIndex={setIndex} />;
				break;
			case 3:
				return <NoAuth setIndex={setIndex} />;
				break;
			case 4:
				return <Thanks setIndex={setIndex} />;
				break;
			default:
				break;
		}
	};

	return <>{content()}</>;
};

export default WrapperResa;

const inputStyle =
	"border border-slate-300 w-40 md:w-52 lg:w-60 h-8 rounded-lg bg-slate-200 text-black pl-2";
