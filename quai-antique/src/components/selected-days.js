import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useSchedule from "@/hooks/schedule";

const isWeekday = (date, numDays) => {
	const day = date.getDay();

	return !numDays.includes(day);
};
const SelectedDays = ({ setSelectedDate, selectedDate }) => {
	const datePickerRef = useRef(null);
	const { weekSchedule, numDays } = useSchedule();

	const handleIconClick = () => {
		if (datePickerRef.current) {
			datePickerRef.current.setOpen(true);
		}
	};

	const filterDate = (date) => {
		return isWeekday(date, numDays);
	};

	return (
		<div className="mb-4 flex justify-between items-center ">
			<label className="w-1/2">Jours</label>

			<div className="w-1/2 flex justify-end relative">
				<DatePicker
					ref={datePickerRef}
					className="border  border-black w-40 md:w-52 h-8 rounded-lg bg-primary text-white font-semibold pl-2"
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					filterDate={filterDate}
					popperPlacement="bottom"
					popperClassName="date-picker-popper"
					calendarClassName="calendar"
					minDate={Date.now()}
				/>
				<CalendarDaysIcon
					onClick={handleIconClick}
					className="w-5 h-5 absolute right-2 bottom-2 text-white cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default SelectedDays;
