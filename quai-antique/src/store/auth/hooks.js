import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	updateLogged,
	updateToken,
	checkValidation,
	resetStore,
} from "./actions";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = () => {
	const dispatch = useDispatch();
	const authStore = useSelector((state) => state.auth);

	const [response, setResponse] = useState();
	const [loginResponse, setLoginResponse] = useState();
	const [validation, setValidation] = useState();

	const signup = async (e) => {
		await axios
			.post(`http://localhost:8000/users/index.php`, { payload: e })
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
		await axios
			.get(`http://localhost:8000/users/login.php`, { params: data })
			.then((response) => {
				if (response.data.jwt) {
					let jwtObject = JSON.parse(response.data.jwt);
					if (jwtObject.jwt && jwtObject.jwt.length > 25) {
						dispatch(
							updateToken(
								true,
								jwtObject.jwt,
								response.data.name,
								response.data.firstname,
								response.data.allergies,
								response.data.admin && response.data.admin
							)
						);
						Cookies.set("jwt", jwtObject.jwt, { expires: 7 });
					} else {
						setValidation(response.data.validation);
					}
				} else {
					setLoginResponse(response.data);
				}
			})
			.catch((error) => {
				console.log(response.data);
				console.log(error);
			});
	};

	const logout = () => {
		dispatch(resetStore());
	};

	const checkToken = async (data) => {
		const payload = { token: data };
		await axios
			.get(`http://localhost:8000/pages/homepage.php`, { params: payload })
			.then((response) => {
				dispatch(
					checkValidation(response.data.name, response.data.firstname)
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
		logout,
		loginResponse,
	};
};

export default useAuth;
