import React, { useState, useEffect } from "react";
import axios from "axios";
import useSchedule from "@/hooks/schedule";

const SelectedHours = ({ selectedDate, setSelectedHours, selectedHours }) => {
	const { weekSchedule } = useSchedule();
	const [timeOptions, setTimeOptions] = useState([]);
	const [selectedTime, setSelectedTime] = useState("12:00");

	useEffect(() => {
		const daysOfWeek = [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		];
		const dayOfWeek = daysOfWeek[selectedDate.getDay()];
		const openHours = weekSchedule[dayOfWeek];
		const today = new Date();
		const options = [];
		if (openHours && openHours.length > 0) {
			openHours.forEach((hours) => {
				const [start, end] = hours;
				const [startHour, startMinute] = start.split(":").map(Number);
				const [endHour, endMinute] = end.split(":").map(Number);

				let currentHour = startHour;
				let currentMinute = startMinute;

				while (
					currentHour < endHour ||
					(currentHour === endHour && currentMinute < endMinute)
				) {
					const time = `${currentHour
						.toString()
						.padStart(2, "0")}:${currentMinute
						.toString()
						.padStart(2, "0")}`;

					// si la date sélectionnée est la date du jour, vérifier que l'heure actuelle est antérieure à l'heure courante
					if (
						selectedDate.getDate() === today.getDate() &&
						selectedDate.getMonth() === today.getMonth() &&
						selectedDate.getFullYear() === today.getFullYear() &&
						(currentHour < today.getHours() ||
							(currentHour === today.getHours() &&
								currentMinute <= today.getMinutes()))
					) {
						// ne rien faire si l'heure est déjà passée
					} else {
						options.push(time);
					}

					currentMinute += 30;
					if (currentMinute >= 60) {
						currentMinute = currentMinute % 60;
						currentHour++;
					}
				}
			});
		}

		setTimeOptions(options);
	}, [selectedDate, weekSchedule]);

	return (
		<div className="mb-4 flex justify-between items-center">
			<label className="w-1/2">Heure</label>
			<div className="w-1/2 flex justify-end">
				<select
					className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
					value={selectedHours}
					onChange={(e) => {
						setSelectedHours(e.target.value);
					}}
				>
					{timeOptions.map((time, index) => (
						<option key={index} value={time}>
							{time}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default SelectedHours;
