import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import WarningButton from "@/Components/Button/WarningButton";
import DangerButton from "@/Components/Button/DangerButton";
import SuccessButton from "./Button/SuccessButton";

const Modal = ({
    show,
    onClose,
    title,
    onSubmit,
    submitButtonName,
    children,
    accent,
    action,
}) => {
    return (
        <Transition show={show}>
            <Dialog className="relative z-10" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="flex flex-col">
                                    <div>
                                        <div className="font-inter text-2xl px-5 py-4 flex justify-between items-center">
                                            <DialogTitle>{title}</DialogTitle>
                                            <button
                                                onClick={() => onClose(false)}
                                                className="cursor-pointer"
                                            >
                                                <LiaTimesSolid size={25} />
                                            </button>
                                        </div>
                                        <hr className="border border-gray-200" />
                                    </div>
                                    <form onSubmit={onSubmit} action={action}>
                                        <div>{children}</div>
                                        <div>
                                            <hr className="border border-gray-200" />
                                            <div className="font-inter text-2xl px-5 py-4 flex justify-end items-center">
                                                {accent === "primary" && (
                                                    <PrimaryButton>
                                                        {submitButtonName}
                                                    </PrimaryButton>
                                                )}
                                                {accent === "success" && (
                                                    <SuccessButton>
                                                        {submitButtonName}
                                                    </SuccessButton>
                                                )}
                                                {accent === "warning" && (
                                                    <WarningButton>
                                                        {submitButtonName}
                                                    </WarningButton>
                                                )}
                                                {accent === "danger" && (
                                                    <DangerButton>
                                                        {submitButtonName}
                                                    </DangerButton>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
