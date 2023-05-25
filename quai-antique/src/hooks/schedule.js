import { useState, useEffect } from "react";
import axios from "axios";

const useSchedule = () => {
	const [fetchSchedule, setFetchSchedule] = useState("");
	const [weekSchedule, setWeekSchedules] = useState("");
	const [numDays, setNumDays] = useState("");

	const getFrenchDayOfWeek = (dayOfWeek) => {
		const jours = [
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
			"Dimanche",
		];

		return jours[dayOfWeek - 1];
	};

	useEffect(() => {
		const fetchOpeningHours = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/opening/index.php`
				);
				if (response.status === 200) {
					const openingHours = response.data;
					const schedule = openingHours.reduce((acc, curr) => {
						const day = getFrenchDayOfWeek(curr.dayOfWeek);
						if (!acc[day]) {
							acc[day] = [];
						}
						acc[day].push([curr.openingTime, curr.closingTime]);
						return acc;
					}, {});

					setWeekSchedules(schedule);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des heures d'ouverture : ",
					error
				);
			}
		};

		fetchOpeningHours();
	}, []);

	return { weekSchedule, numDays };
};

export default useSchedule;
