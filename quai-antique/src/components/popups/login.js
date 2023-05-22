import React, { useState, useEffect } from "react";
import useDeviceType from "@/hooks/device-type";
import useAuth from "@/store/auth/hooks";

const Login = ({ setSignIn }) => {
	const deviceType = useDeviceType();
	const auth = useAuth();
	const [mail, setMail] = useState("admin-quai-antique@gmail.com");
	const [password, setPassword] = useState("Yoshi90120!");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { mail: mail, password: password };
		auth.login(data);
	};

	return (
		<form className="pt-6">
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
					setSignIn(true);
				}}
			>
				<span>Vous n'avez pas de compte ? </span>
				<span className="text-gold font-semibold">Enregistrez-vous</span>
			</button>
			<div className="w-full h-auto flex justify-center items-center py-8">
				<div className="w-2 h-12 border-black border-r" />
			</div>
			<div className="w-full flex justify-center">
				<button
					onClick={handleSubmit}
					className={`${
						deviceType === "mobile" ? "w-28" : "w-40"
					}  bg-gold rounded-lg h-8 text-white mb-4 `}
				>
					<span>Connexion</span>
				</button>
			</div>
		</form>
	);
};

export default Login;
const inputStyle =
	"border border-slate-300 w-40 md:w-52 lg:w-60 h-8 rounded-lg bg-slate-200 text-black pl-2";
