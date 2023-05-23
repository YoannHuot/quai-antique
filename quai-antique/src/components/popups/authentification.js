import React, { useState, useEffect } from "react";
import _ from "underscore";

import { useRouter } from "next/router";
import useAuth from "../../store/auth/hooks";
import useDeviceType from "@/hooks/device-type";
import Cookies from "js-cookie";
import axios from "axios";

const Authentification = ({ signIn, setAuthentification }) => {
	const auth = useAuth();
	const router = useRouter();
	const deviceType = useDeviceType();

	const allergies = [
		{ title: "abalone", img: "/images/allergies/abalone.svg", id: 1 },
		{ title: "apple", img: "/images/allergies/apple.svg", id: 2 },
		{ title: "eggs", img: "/images/allergies/eggs.svg", id: 3 },
		{ title: "fish", img: "/images/allergies/fish.svg", id: 4 },
		{ title: "soy-bean", img: "/images/allergies/soy-bean.svg", id: 5 },
		{ title: "wheat", img: "/images/allergies/wheat.svg", id: 6 },
	];

	let condition = {
		majuscule: new RegExp("(?=.*?[A-Z])"),
		minuscle: new RegExp("(?=.*?[a-z])"),
		nombre: new RegExp("(?=.*?[0-9])"),
		special: new RegExp("(?=.*?[#?!@$%^&*-])"),
		longueur: new RegExp("(.{8,})"),
	};

	const [mail, setMail] = useState("gmail12@test.fr");
	const [name, setName] = useState("Huot");
	const [firstName, setFirstName] = useState("Yoann");

	const [password, setPassword] = useState("Gmail12@test.fr");
	const [passwordConfirm, setPasswordConfirm] = useState("Gmail12@test.fr");

	const [passwordValid, setPasswordValid] = useState();

	const [validity, setValidity] = useState();
	const [checked, setChecked] = useState();

	const [message, setMessage] = useState("");
	const [security, setSecurity] = useState();
	const [response, setResponse] = useState();

	const [selectedAllergies, setSelectedAllergies] = useState([]);
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");

	const [mailValid, setMailValid] = useState(false);
	const [nameValidity, setNameValidity] = useState(false);
	const [firstNameValidity, setFirstNameValidity] = useState(false);
	const [cityValidity, setCityValidity] = useState(false);
	const [addressValidity, setAddressValidity] = useState(false);
	const [dataValidity, setDataValidity] = useState(false);

	const [hasSignIn, setHasSignIn] = useState(false);
	const [resa, setResa] = useState();

	let deleteResa = () => {
		const cookie = Cookies.get("jwt");
		axios
			.delete(`${'/backend'}/reservations/index.php`, {
				params: {
					token: cookie,
				},
			})
			.then((response) => {
				console.log(response.data);
				setAuthentification(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let handleSubmit = (e) => {
		e.preventDefault();

		if (dataValidity && passwordValid) {
			let data = {
				nom: name,
				prenom: firstName,
				email: mail,
				password: password,
				passwordConfirm: passwordConfirm,
				city: city,
				address: address,
				allergies: selectedAllergies,
			};
			auth.signup(data);
		}
	};

	let resetSecurity = () => {
		setName("");
		setMail("");
		setFirstName("");
		setMessage("");
		setPassword("");
		setPasswordConfirm("");
		setAddress("");
		setCity("");
	};

	useEffect(() => {
		if (auth.response) {
			setResponse(auth.response);
		}
	}, [auth.response]);

	useEffect(() => {
		if (
			passwordValid &&
			nameValidity &&
			firstNameValidity &&
			mailValid &&
			cityValidity &&
			addressValidity
		) {
			setDataValidity(true);
		} else {
			setDataValidity(false);
		}
	}, [
		passwordValid,
		nameValidity,
		firstNameValidity,
		mailValid,
		addressValidity,
		cityValidity,
	]);

	useEffect(() => {
		resetSecurity();
	}, [signIn]);

	useEffect(() => {
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		setMailValid(re.test(mail));
	}, [mail]);

	useEffect(() => {
		let regex = new RegExp("^[a-zA-Z'-]+$");

		if (name && name.length >= 2 && name.match(regex)) {
			setNameValidity(true);
		} else {
			setNameValidity(false);
		}
	}, [name]);

	useEffect(() => {
		let regex = new RegExp("^[a-zA-Z'-]+$");

		if (city && city.length >= 1 && city.match(regex)) {
			setCityValidity(true);
		} else {
			setCityValidity(false);
		}
	}, [city]);

	useEffect(() => {
		let regexChars = new RegExp(
			"^[a-zA-Z0-9 àâäéèëêïîôöùûüçÀÂÄÉÈËÊÏÎÔÖÙÛÜÇ'-]+$"
		);
		let regexNumbers = /\d/;

		if (
			address &&
			address.length >= 2 &&
			address.match(regexChars) &&
			address.match(regexNumbers)
		) {
			setAddressValidity(true);
		} else {
			setAddressValidity(false);
		}
	}, [address]);

	useEffect(() => {
		let regex = new RegExp("^[a-zA-Z'-]+$");

		if (name && name.length >= 2 && name.match(regex)) {
			setNameValidity(true);
		} else {
			setNameValidity(false);
		}
	}, [name]);

	useEffect(() => {
		let regex = new RegExp("^[a-zA-Z-]+$");
		if (firstName && firstName.length >= 2 && firstName.match(regex)) {
			setFirstNameValidity(true);
		} else {
			setFirstNameValidity(false);
		}
	}, [firstName]);

	useEffect(() => {
		if (password && password.length > 8 && password === passwordConfirm) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}
	}, [password, passwordConfirm]);

	useEffect(() => {
		const result = [];
		if (password) {
			_.map(condition, (c, i) => {
				let check = password.match(c);
				if (check !== null) {
					result.push(i);
				}
			});
		}
		setValidity(result);
	}, [passwordValid, password]);

	useEffect(() => {
		const allTrought = [];
		_.map(condition, (c, i) => allTrought.push(i));
		setChecked(_.difference(allTrought, validity));
	}, [validity, password]);

	useEffect(() => {
		if (validity && validity.length === 5) {
			setMessage("Sécurité");
		} else {
			setMessage("");
		}
	}, [validity]);

	useEffect(() => {
		if (message && password) {
			const severalMaj =
				password.match(/[A-Z]/g) && password.match(/[A-Z]/g).length > 1;
			const specialCharArray =
				password.match(/[^a-zA-Z0-9]/g) &&
				password.match(/[^a-zA-Z0-9]/g).length > 1;
			const severalNumber =
				password.match(/[0-9]/g) && password.match(/[0-9]/g).length > 1;
			const isLongEnought = password && password.length > 12;

			let securityTest = _.countBy([
				severalMaj,
				specialCharArray,
				severalNumber,
				isLongEnought,
			]);

			if (securityTest.true < 2) {
				setSecurity("low");
			} else if (securityTest.true >= 2 && securityTest.true < 4) {
				setSecurity("medium");
			} else if (securityTest.true == 4) {
				setSecurity("strong");
			}
		}
	}, [message, password]);

	useEffect(() => {
		if (!auth.authStore.jwt || auth.authStore.jwt.length < 1) {
			console.warn("Error 401 : no session token detected");
		} else if (auth.authStore.jwt && auth.authStore.jwt.length > 1) {
			setHasSignIn(true);
		}
	}, [auth.authStore]);

	useEffect(() => {
		if (!auth.authStore.logged) {
			console.warn("User is not logged in!");
		} else if (auth.authStore.logged) {
			auth.login({ mail: mail, password: password });
		}
	}, [auth.authStore.logged]);

	useEffect(() => {
		if (auth.authStore.logged === false) {
			setHasSignIn(false);
		}
	}, [auth.authStore.logged]);

	useEffect(() => {
		if (auth.authStore.logged) {
			const cookie = Cookies.get("jwt");
			axios
				.get(`${'/backend'}/reservations/index.php`, {
					params: {
						token: cookie,
					},
				})
				.then((response) => {
					if (response.data) {
						console.log(response);
						setResa(response.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	return (
		<div className="w-full pt-6">
			{hasSignIn ? (
				<div className="w-full flex flex-row">
					<div className="flex flex-col w-1/2 border-r border-black">
						<div className="py-2">
							<span>Nom : </span>
							<span className="capitalize">{auth.authStore.name}</span>
						</div>
						<div className="py-2">
							<span>Prénom : </span>
							<span className="capitalize">
								{auth.authStore.firstname}
							</span>
						</div>
						<div className="py-2">
							<span>Allergies : </span>
							<span>
								{auth.authStore.allergies
									? auth.authStore.allergies
									: "Vous n'avez pas d'allergie"}
							</span>
						</div>
						<button
							onClick={() => {
								setAuthentification(false);
								setTimeout(() => {
									auth.logout();
								}, [300]);
							}}
							className={`${deviceType === "mobile" ? "w-28" : "w-40"} 
							 bg-red-400 rounded-lg h-8 text-white my-4`}
						>
							<span>Déconnexion</span>
						</button>
					</div>
					{resa && (
						<div className="flex flex-col w-1/2 pl-4 py-2">
							<span>Votre réservation :</span>
							<div className="py-2">
								<span>Couvert(s) : </span>
								<span className="capitalize">{resa.guests}</span>
							</div>
							<div className="py-2">
								<span>Date : </span>
								<span className="capitalize">{resa.dateTime}</span>
							</div>
							<button
								onClick={() => {
									deleteResa();
								}}
								className={`${
									deviceType === "mobile" ? "w-28" : "w-40"
								} 
							 bg-primary rounded-lg h-8 text-white my-4`}
							>
								<span>Annuler</span>
							</button>
						</div>
					)}
				</div>
			) : (
				<div>
					<form>
						<div className="mb-4 flex justify-between items-center ">
							<label className="w-1/2 ">Nom</label>
							<div className="w-1/2 flex justify-end">
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={`${inputStyle} ${
										nameValidity ? "text-black" : "text-slate-400"
									}`}
								/>
							</div>
						</div>
						<div className="mb-4 flex justify-between items-center ">
							<label className="w-1/2 ">Prénom</label>
							<div className="w-1/2 flex justify-end">
								<input
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className={`${inputStyle} ${
										firstNameValidity
											? "text-black"
											: "text-slate-400"
									}`}
								/>
							</div>
						</div>
						<div className="mb-4 flex justify-between items-center ">
							<label className="w-1/2 ">Email</label>
							<div className="w-1/2 flex justify-end">
								<input
									value={mail}
									onChange={(e) => setMail(e.target.value)}
									className={`${inputStyle} ${
										mailValid ? "text-black" : "text-slate-400"
									}`}
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
									className={`${inputStyle} ${
										cityValidity ? "text-black" : "text-slate-400"
									}`}
								/>
							</div>
						</div>
						<div className="mb-4 flex justify-between items-center ">
							<label className="w-1/2 ">Adresse</label>
							<div className="w-1/2 flex justify-end">
								<input
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className={`${inputStyle} ${
										addressValidity ? "text-black" : "text-slate-400"
									}`}
								/>
							</div>
						</div>
						<div className="w-full mb-8  h-2/3 flex flex-col justify-center ">
							<span>Sélectionnez vos allergies</span>
							<div className="flex flew-row justify-between mt-4">
								{_.map(allergies, (allergie, index) => {
									let selected = selectedAllergies.includes(
										allergie.id
									);
									return (
										<button
											key={index}
											onClick={(e) => {
												e.preventDefault();
												if (selected) {
													setSelectedAllergies(
														selectedAllergies.filter(
															(e) => e !== allergie.id
														)
													);
												} else {
													setSelectedAllergies([
														...selectedAllergies,
														allergie.id,
													]);
												}
											}}
											className={`${
												selected
													? "border border-gold bg-primary"
													: "bg-slate-400"
											}  h-9 w-9 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full flex justify-center items-center`}
										>
											<img src={allergie.img} alt={allergie.name} />
										</button>
									);
								})}
							</div>
						</div>
						<button
							onClick={(e) => {
								if (!dataValidity || !passwordValid) {
									alert(
										"les mots de passe ne correspondent pas ou informations manquantes"
									);
								} else handleSubmit(e);
							}}
							className={`${deviceType === "mobile" ? "w-28" : "w-40"} ${
								dataValidity && passwordValid
									? "bg-gold"
									: "bg-slate-300"
							}  bg-gold rounded-lg h-8 text-white mb-4`}
						>
							Valider
						</button>
					</form>

					<div className="w-full h-20 flex flex-col bg-app-blue bg-opacity-5 ">
						{!message && (
							<>
								<p className="font-semibold">Mot de passe check </p>
								<div className="grid grid-cols-3 gap-1 my-2 ">
									{_.map(checked, (c, i) => {
										return (
											<div
												key={i}
												className="flex flew-row w-full  items-center"
											>
												<div className="w-2 h-2 bg-red-400 rounded-full" />
												<p className="pl-2 capitalize">{c}</p>
											</div>
										);
									})}
								</div>
							</>
						)}
						{message && (
							<>
								<p className="pb-2">{message}</p>
								<div className="w-full h-6 rounded-full flex flex-row capitalize ">
									<div className="flex flex-col h-6 w-1/3 justify-center items-center">
										<div
											className={`w-full h-1/2  border-blue border ${
												security && security === "low"
													? "bg-red-400"
													: "bg-white"
											} rounded-l-full`}
										/>
										{security && security === "low" ? (
											<p className="h-1/2">low</p>
										) : (
											<div className="h-1/2" />
										)}
									</div>
									<div className="flex flex-col h-6 w-1/3 justify-center items-center">
										<div
											className={`w-full h-1/2  border-blue border-t border-b ${
												security && security === "medium"
													? "bg-orange-400"
													: "bg-white"
											}`}
										/>
										{security && security === "medium" ? (
											<p className="h-1/2">medium</p>
										) : (
											<div className="h-1/2" />
										)}
									</div>
									<div className="flex flex-col h-6 w-1/3 justify-center items-center">
										<div
											className={`w-full h-1/2  border-blue border ${
												security && security === "strong"
													? "bg-green-400"
													: "bg-white"
											} rounded-r-full`}
										/>
										{security && security === "strong" ? (
											<p className="h-1/2">strong</p>
										) : (
											<div className="h-1/2" />
										)}
									</div>
								</div>
								{response && (
									<>
										<span className="mt-6">{response}</span>
									</>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Authentification;
const inputStyle =
	"border border-slate-300 w-40 md:w-52 lg:w-60 h-8 rounded-lg bg-slate-200 text-black pl-2";
