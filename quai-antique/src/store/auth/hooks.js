import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLogged, updateToken, checkValidation } from "./actions";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = () => {
	const dispatch = useDispatch();
	const authStore = useSelector((state) => state.auth);

	const [response, setResponse] = useState();
	const [loginResponse, setLoginResponse] = useState();
	const [validation, setValidation] = useState();

	const signup = async (e) => {
		console.log(e);
		await axios
			.post("http://localhost:8000/users/index.php", { payload: e })
			.then((response) => {
				if (response.data === "Success") {
					dispatch(updateLogged(true));
				} else {
					setResponse(response.data);
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const login = async (data) => {
		// await axios
		// 	.get("http://localhost:8000/users/current.php", { params: data })
		// 	.then((response) => {
		// 		if (response.data.jwt && response.data.jwt.length > 25) {
		// 			dispatch(updateToken(true, response.data.jwt));
		// 			Cookies.set("jwt", response.data.jwt, { expires: 7 });
		// 		} else {
		// 			setValidation(response.data.validation);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		setLoginResponse(response.data);
		// 		console.log(error);
		// 	});
	};

	const checkToken = async (data) => {
		const payload = { token: data };
		await axios
			.get("http://localhost:8000/pages/homepage.php", { params: payload })
			.then((response) => {
				dispatch(
					checkValidation(
						response.data.validation,
						response.data.role,
						response.data.name,
						response.data.firstname
					)
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return {
		authStore,
		signup,
		response,
		login,
		checkToken,
		// signup,
	};
};

export default useAuth;
