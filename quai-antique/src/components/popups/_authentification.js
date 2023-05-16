import React, { useState } from "react";
import _ from "underscore";

import useDeviceType from "@/hooks/device-type";

const Authentification = () => {
	const deviceType = useDeviceType();

	const [selectedAllergies, setSelectedAllergies] = useState([]);
	const [name, setName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");

	const allergies = [
		{ alt: "abalone", img: "/images/allergies/abalone.svg", id: 1 },
		{ alt: "apple", img: "/images/allergies/apple.svg", id: 2 },
		{ alt: "eggs", img: "/images/allergies/eggs.svg", id: 3 },
		{ alt: "fish", img: "/images/allergies/fish.svg", id: 4 },
		{ alt: "soy-bean", img: "/images/allergies/soy-bean.svg", id: 5 },
		{ alt: "wheat", img: "/images/allergies/wheat.svg", id: 6 },
	];

	const registerUser = () => {
		const userData = {
			name,
			firstName,
			email,
			password,
			city,
			address,
			selectedAllergies,
		};

		axios
			.post("/user/index.php", userData)
			.then((res) => {
				console.log(res);
				// handle success
			})
			.catch((err) => {
				console.log(err);
				// handle error
			});
	};

	return (
		<div className=" w-full pt-6">
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Nom</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Prénom</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Email</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputStyle}
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
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Confirmation</label>
				<div className="w-1/2 flex justify-end">
					<input
						type="password"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Ville</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between items-center ">
				<label className="w-1/2 ">Adresse</label>
				<div className="w-1/2 flex justify-end">
					<input
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className={inputStyle}
					/>
				</div>
			</div>
			<div className="w-full mb-8  h-2/3 flex flex-col justify-center ">
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
											allergies.filter((e) => e.id !== allergie.id)
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
			<button
				onClick={registerUser}
				className={`${
					deviceType === "mobile" ? "w-28" : "w-40"
				}  bg-gold rounded-lg h-8 text-white mb-4`}
			>
				Valider
			</button>
		</div>
	);
};

export default Authentification;

const inputStyle =
	"border border-slate-300 w-40 md:w-52 lg:w-60 h-8 rounded-lg bg-slate-200 text-black pl-2";
