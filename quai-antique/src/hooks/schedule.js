import { useState, useEffect } from "react";
import axios from "axios";

const useSchedule = () => {
	const [fetchSchedule, setFetchSchedule] = useState("");
	const [weekSchedule, setWeekSchedules] = useState("");
	const [numDays, setNumDays] = useState("");

	useEffect(() => {
		const fetchOpeningHours = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/opening/index.php`
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

				const newWeekScheduleObject = Object.values(nouvelHoraires).reduce(
					(acc, curr) => {
						acc[curr.day] = curr.openHours;
						return acc;
					},
					{}
				);

				return newWeekScheduleObject;
			};

			setWeekSchedules(transformData(fetchSchedule));
		}
	}, [fetchSchedule]);

	useEffect(() => {
		const daysOff = [];
		const convertDayToNumber = (day) => {
			switch (day) {
				case "Dimanche":
					return 0;
				case "Lundi":
					return 1;
				case "Mardi":
					return 2;
				case "Mercredi":
					return 3;
				case "Jeudi":
					return 4;
				case "Vendredi":
					return 5;
				case "Samedi":
					return 6;
				default:
					return -1; // Valeur par défaut pour les jours non reconnus
			}
		};
		const getDayWithAllNullValues = (weekSchedule) => {
			for (const day in weekSchedule) {
				const openHours = weekSchedule[day];
				const hasAllNullValues = openHours.every((hours) =>
					hours.every((value) => value === null)
				);
				if (hasAllNullValues) {
					daysOff.push(day);
				}
			}
			return null;
		};

		getDayWithAllNullValues(weekSchedule);
		if (daysOff.length > 0) {
			const convertDayToNum = daysOff.map((day) => convertDayToNumber(day));
			setNumDays(convertDayToNum);
		}
	}, [weekSchedule]);

	return { weekSchedule, numDays };
};

export default useSchedule;
