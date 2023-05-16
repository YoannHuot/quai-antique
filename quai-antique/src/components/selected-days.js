import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const isWeekday = (date) => {
	const day = date.getDay();
	// 0 is Sunday and 6 is Saturday
	return day !== 0;
};

const SelectedDays = ({ setSelectedDate, selectedDate }) => {
	const datePickerRef = useRef(null);

	const handleIconClick = () => {
		if (datePickerRef.current) {
			datePickerRef.current.setOpen(true);
		}
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
					filterDate={isWeekday}
					popperPlacement="bottom"
					popperClassName="date-picker-popper"
					calendarClassName="calendar"
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
