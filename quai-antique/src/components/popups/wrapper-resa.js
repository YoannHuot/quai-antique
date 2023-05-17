import React, { useState } from "react";
import _ from "underscore";
import SelectedHours from "@/components/selected-hours.js";
import SelectedDays from "@/components/selected-days.js";
import useDeviceType from "@/hooks/device-type";
import useAuth from "@/store/auth/hooks";

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

const Authentification = ({
	setIndex,
	setSignIn,
	setOpen,
	setAuthentification,
}) => {
	const deviceType = useDeviceType();
	const [mail, setMail] = useState("Yoann.huot2@outlook.fr");
	const [password, setPassword] = useState("Yoshi90120!");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { mail: mail, password: password };
		auth.login(data);
	};

	return (
		<div className=" w-full pt-6">
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Email</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={mail}
						onChange={(e) => setMail(e.target.value)}
						className={`${inputStyle}`}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">
					{deviceType === "mobile" ? "Mdp" : " Mot de passe"}
				</label>
				<div className="w-1/2 flex justify-end">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<button
				className="text-center italic text-xs w-full"
				onClick={() => {
					setOpen(false);
					setAuthentification(true);
					setSignIn(true);
				}}
			>
				<span>Vous n'avez pas de compte ? </span>
				<span className="text-gold font-semibold">Enregistrez-vous</span>
			</button>
			<div className="w-full h-auto flex justify-center items-center py-8">
				<div className="w-2 h-12 border-black border-r" />
			</div>
			<FooterPopup onPress1={handleSubmit} text1={"Connexion"} />
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
		<div className="w-full pt-6 flex flex-col h-full justify-between">
			<div>
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
			</div>

			<footer className="h-16">
				<button
					className={`${
						deviceType === "mobile" ? "w-32" : "w-40"
					}  bg-gold rounded-lg h-8 text-white`}
					onClick={() => {
						setIndex(3);
					}}
				>
					<span>Continuer</span>
				</button>
			</footer>
		</div>
	);
};

const Validation = () => {
	const deviceType = useDeviceType();

	return (
		<div className="w-full h-full xs:pb-12 pb-6 flex flex-col text-center items-center justify-center ">
			<div className="xs:w-2/3 lg:w-1/2 mt-4 flex flex-col items-center text-center bg-slate-200 p-4 rounded-lg">
				<span className="mb-2 ">Aucun convive ne souffre d’allergie</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">Table réservé pour 4 personnes</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">le 12/08/2023</span>
				<div className="border-b border-primary w-8 border-1 flex justify-center mb-2" />
				<span className="mb-2">à 10h30</span>
			</div>
			<footer className="h-16 pt-4">
				<button
					className={`${
						deviceType === "mobile" ? "w-32" : "w-40"
					}  bg-gold rounded-lg h-8 text-white`}
					onClick={() => {
						// setIndex(3);
						console.log("submit resa");
					}}
				>
					<span>Valider</span>
				</button>
			</footer>
		</div>
	);
};

const WrapperResa = ({ setSignIn, setOpen, setAuthentification }) => {
	const auth = useAuth();
	const [index, setIndex] = useState(1);

	console.log(auth.authStore.logged);
	const content = () => {
		switch (index) {
			case 1:
				if (!auth.authStore.logged) {
					return (
						<Authentification
							setIndex={setIndex}
							setSignIn={setSignIn}
							setOpen={setOpen}
							setAuthentification={setAuthentification}
						/>
					);
				} else {
					return <Reservation setIndex={setIndex} />;
				}
				break;

			case 3:
				return <Validation setIndex={setIndex} />;
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
