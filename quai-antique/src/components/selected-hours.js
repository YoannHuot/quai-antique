import React, { useState, useEffect } from "react";

const weekSchedule = [
	{ day: "Sunday", openHours: [] },
	{
		day: "Monday",
		openHours: [
			["11:00", "15:00"],
			["18:00", "22:00"],
		],
	},
	{
		day: "Tuesday",
		openHours: [
			["11:00", "15:00"],
			["18:00", "22:00"],
		],
	},
	{
		day: "Wednesday",
		openHours: [
			["11:00", "15:00"],
			["18:00", "22:00"],
		],
	},
	{
		day: "Thursday",
		openHours: [
			["11:00", "15:00"],
			["18:00", "22:00"],
		],
	},
	{
		day: "Friday",
		openHours: [
			["11:00", "15:00"],
			["18:00", "22:00"],
		],
	},
	{ day: "Saturday", openHours: [["09:00", "22:00"]] },
];

const SelectedHours = ({ selectedDate }) => {
	const [timeOptions, setTimeOptions] = useState([]);

	useEffect(() => {
		const dayOfWeek = selectedDate.getDay();
		const openHours = weekSchedule[dayOfWeek].openHours;

		console.log(dayOfWeek);
		const options = [];
		openHours.forEach((range) => {
			const [start, end] = range;
			let [startHour, startMinute] = start.split(":").map(Number);
			const [endHour, endMinute] = end.split(":").map(Number);

			while (
				startHour < endHour ||
				(startHour === endHour && startMinute < endMinute)
			) {
				options.push(
					`${startHour.toString().padStart(2, "0")}:${startMinute
						.toString()
						.padStart(2, "0")}`
				);
				startMinute += 30;
				if (startMinute === 60) {
					startHour += 1;
					startMinute = 0;
				}
			}
		});

		setTimeOptions(options);
	}, [selectedDate]);

	return (
		<div className="mb-4 flex justify-between items-center ">
			<label className="w-1/2 ">Heure</label>
			<div className="w-1/2 flex justify-end">
				<select className="border border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2">
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
