import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function PopUp({ open, setOpen, children, large }) {
	const [popupWidth, setPopupWidth] = useState("50vw");

	useEffect(() => {
		const updateWidth = () => {
			setPopupWidth(window.innerWidth + "px");
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);

		return () => {
			window.removeEventListener("resize", updateWidth);
		};
	}, []);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div
					className="fixed inset-0 z-40 overflow-y-auto"
					style={{ width: popupWidth }}
				>
					<div className="flex min-h-full items-center md:items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Panel
								className={`${
									large ? "h-auto" : "h-96"
								}  w-full relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
							>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
