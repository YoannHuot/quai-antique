import CardAdmin from "../cards/card-admin";
import React, { useRef, useState, useEffect } from "react";
import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import axios from "axios";
import AddMenu from "./add-menu";
import Cookies from "js-cookie";

const EditMenuTitle = ({ title, menuId, setRefresh, refresh }) => {
	const [titleModif, setTitleModif] = useState(title);

	const modifyTitle = async (e) => {
		e.preventDefault();
		let payload = {
			title: titleModif,
			id: menuId,
		};
		if (menuId && titleModif.length <= 3) {
			alert("Le titre est trop court.");
			return;
		}
		const cookie = Cookies.get("jwt");

		axios
			.put(`http://localhost:8000/administrator/menu.php`, {
				payload: payload,
				token: cookie,
			})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					setRefresh(!refresh);
				}
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la modification du titre du menu: ",
					error
				);
			});
	};

	const deleteMenu = async (e) => {
		e.preventDefault();

		const cookie = Cookies.get("jwt");
		axios
			.delete(`http://localhost:8000/administrator/menu.php`, {
				params: {
					token: cookie,
					menuId: menuId,
				},
			})
			.then((response) => {
				console.log(response.data);
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log("error : ");
				console.log(error);
			});
	};

	return (
		<div>
			<input
				className="font-bold rounded uppercase border-gold my-2 py-1 border w-full"
				defaultValue={title}
				onChange={(e) => setTitleModif(e.target.value)}
			/>
			<div className="flex flex-row w-full justify-between">
				<button
					className="mb-4 mt-2 bg-gold text-black rounded px-5 py-2  hover:border-white hover:border hover:text-black"
					onClick={modifyTitle}
				>
					Modifier le titre
				</button>
				<button
					className="mb-4 mt-2 bg-red-400 text-black rounded px-5 py-2 border border-red-400 hover:border-white hover:border hover:text-black"
					onClick={deleteMenu}
				>
					Supprimer tout le menu
				</button>
			</div>
		</div>
	);
};

const AdminHandleMenu = ({ setMenu, menu, setRefresh, refresh }) => {
	const deviceType = useDeviceType();
	return (
		<div>
			<AddMenu setRefresh={setRefresh} refresh={refresh} param={"menu"} />
			<h2 className="text-xl font-Laila font-medium text-primary pt-8">
				Modifier les menus :
			</h2>
			<div className="w-16 bg-gold h-0.5 mb-4" />

			<div className="lg:flex lg:flex-col lg:justify-center lg:items-center lg:mb-12 ">
				{menu?.map((contents, index) => {
					let lastColum = index + 1 === menu.length;
					return (
						<div
							className={`p-6 bg-primary rounded p-2 m-2 mt-8 lg:${
								lastColum ? "mr-0" : "mr-8"
							} lg:w-2/3`}
							key={index}
						>
							<h3 className="capitalize text-xl font-Laila font-medium text-white">
								{contents.titre}
							</h3>
							<EditMenuTitle
								title={contents.titre}
								menuId={contents.id}
								setRefresh={setRefresh}
								refresh={refresh}
							/>

							{contents.formules.map((content, index) => {
								return (
									<CardAdmin
										key={index}
										title={content.titre}
										description={content.description}
										price={Math.ceil(content.prix)}
										id={content.id}
										setRefresh={setRefresh}
										refresh={refresh}
										type={content.type}
										param="formules"
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AdminHandleMenu;
