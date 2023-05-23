import React, { useState, useEffect } from "react";
import useSchedule from "@/hooks/schedule";
import axios from "axios";
import Cookies from "js-cookie";

const AdminHandleTime = () => {
	const schedule = useSchedule();
	const { weekSchedule } = schedule;
	const [newSchedule, setNewSchedule] = useState(null);

	useEffect(() => {
		if (weekSchedule) {
			const modifiedSchedule = { ...weekSchedule };
			for (const day in modifiedSchedule) {
				if (modifiedSchedule[day].length === 1) {
					modifiedSchedule[day].push(["00:00", "00:00"]);
				}
			}
			setNewSchedule(modifiedSchedule);
		}
	}, [weekSchedule]);

	const handleTimeChange = (day, periodIndex, timeIndex, event) => {
		const updatedSchedule = { ...newSchedule };
		const value = event.target.value === "null" ? null : event.target.value;
		updatedSchedule[day][periodIndex][timeIndex] = value;
		setNewSchedule(updatedSchedule);
	};

	const handleSubmit = () => {
		const cookie = Cookies.get("jwt");
		axios
			.put(`http://localhost:8000/opening/index.php`, {
				payload: newSchedule,
				token: cookie,
			})
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la mise à jour des horaires :",
					error
				);
			});
	};

	const generateTimeOptions = (start, end) => {
		return Array.from({ length: end - start }, (_, i) => i + start).map(
			(hour) => hour.toString().padStart(2, "0") + ":00"
		);
	};

	const morningHours = generateTimeOptions(8, 16);
	const afternoonHours = generateTimeOptions(16, 24);

	return (
		<div className="flex justify-center items-center flex-col">
			{Object.entries(schedule.weekSchedule).map(
				([day, openHours], index) => (
					<div
						key={index}
						className="flex flex-row w-full lg:w-1/2 bg-primary justify-between items-center mb-4 p-8"
					>
						<p className="text-lg font-semibold text-white">{day}</p>
						<div className="w-1/2 grid grid-cols-2 gap-4">
							{openHours.map((hours, i) => (
								<div
									key={i}
									className="bg-white shadow-md rounded p-4 flex flex-col justify-center items-center"
								>
									<div className="flex flex-col justify-center items-center">
										<span>{i === 0 ? "Matin" : "Soir"}</span>
										<select
											value={hours[0] || ""}
											onChange={(event) =>
												handleTimeChange(day, i, 0, event)
											}
											className="border border-gray-300 rounded px-2 py-1 mb-2"
										>
											<option value={null}>Fermé</option>
											{(i === 0 ? morningHours : afternoonHours).map(
												(hour) => (
													<option key={hour} value={hour}>
														{hour}
													</option>
												)
											)}
										</select>
									</div>

									<span>-</span>

									<div className="flex flex-col justify-center items-center">
										<select
											value={hours[1] === "Fermé" ? null : hours[1]}
											onChange={(event) =>
												handleTimeChange(day, i, 1, event)
											}
											className="border border-gray-300 rounded px-2 py-1"
										>
											<option value={null}>Fermé</option>
											{(i === 0 ? morningHours : afternoonHours).map(
												(hour) => (
													<option key={hour} value={hour}>
														{hour}
													</option>
												)
											)}
										</select>
									</div>
								</div>
							))}
						</div>
					</div>
				)
			)}
			<button
				className="bg-gold text-white px-4 py-2 rounded mt-4 mb-14"
				onClick={handleSubmit}
			>
				Soumettre
			</button>
		</div>
	);
};
export default AdminHandleTime;
