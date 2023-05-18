import { useState, useEffect } from "react";
import axios from "axios";

const useSchedule = () => {
	const [fetchSchedule, setFetchSchedule] = useState("");
	const [weekSchedule, setWeekSchedules] = useState("");

	useEffect(() => {
		const fetchOpeningHours = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/opening/index.php"
				);
				if (response.status === 200) {
					const openingHours = response.data;
					const schedule = openingHours.reduce(
						(acc, curr) => {
							acc[curr.dayOfWeek].push([
								curr.openingTime,
								curr.closingTime,
							]);
							return acc;
						},
						{ 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] }
					); // initialize with empty arrays

					schedule[0] === "lundi";
					setFetchSchedule(schedule);
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

	useEffect(() => {
		if (fetchSchedule) {
			const transformData = (weekSchedule) => {
				const jours = [
					"Lundi",
					"Mardi",
					"Mercredi",
					"Jeudi",
					"Vendredi",
					"Samedi",
					"Dimanche",
				];

				let nouvelHoraires = {};
				for (let i = 1; i <= 7; i++) {
					nouvelHoraires[i % 7] = {
						day: jours[(i + 6) % 7], // +5 pour compenser le décalage (lundi = 1 dans vos données, mais lundi = 1 dans JS)
						openHours: weekSchedule[i].map((hours) =>
							hours.map((hour) => (hour ? hour.slice(0, 5) : null))
						),
					};
				}
				return nouvelHoraires;
			};
			setWeekSchedules(transformData(fetchSchedule));
		}
	}, [fetchSchedule]);

	return { weekSchedule };
};

export default useSchedule;
