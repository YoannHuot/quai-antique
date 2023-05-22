import CardAdmin from "../cards/card-admin";
import React, { useRef, useState, useEffect } from "react";
import _ from "underscore";
import useDeviceType from "@/hooks/device-type";
import axios from "axios";
import AddProduct from "./add-product";

const AdminHandleCarte = ({ showProducts, products, setRefreshDelete }) => {
	const deviceType = useDeviceType();

	return (
		<div>
			<AddProduct />
			<div className="lg:flex lg:flex-row">
				{_.map(showProducts, (contents, index) => {
					let lastColum = index + 1 === products.length;
					return (
						<div
							className={`pb-6 lg:${
								lastColum ? "mr-0" : "mr-8"
							} lg:w-1/3`}
							key={index}
						>
							<h3 className="capitalize text-xl font-Laila font-medium text-primary">
								{contents.title}
							</h3>
							<div className="w-16 bg-gold h-0.5 mb-4" />
							{_.map(contents.products, (content, index) => {
								return (
									<CardAdmin
										title={content.title}
										description={content.description}
										price={Math.ceil(content.price)}
										id={content.id}
										setRefreshDelete={setRefreshDelete}
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

export default AdminHandleCarte;
