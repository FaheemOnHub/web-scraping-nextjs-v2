"use client";
import { FormEvent, Fragment, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import React from "react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";
type Props = {
  productId: string;
};
const Modal = ({ productId }: Props) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [email, setemail] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    await addUserEmailToProduct(productId, email);
    setisSubmitting(false);
    setemail("");
    closeModal();
  };
  const [isOpen, setisOpen] = useState(false);
  const openModal = () => setisOpen(true);
  const closeModal = () => setisOpen(false);
  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => closeModal}
          className="relative z-50 dialog-container "
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            <div className="dialog-content ">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="p-3 border border-gray-200 rounded-10">
                    <Image
                      src="/assets/icons/logo.svg"
                      alt="logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <Image
                    src="/assets/icons/x-close.svg"
                    alt="close"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={closeModal}
                  />
                </div>
                <h4 className="dialog-head">
                  Pricing alerts directly into your inbox 🚨
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Never miss a lower price
                </p>
                <form
                  action=""
                  className="flex flex-col mt-5 "
                  onSubmit={handleSubmit}
                >
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="dialog-input_container">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="mail-icon"
                      height={18}
                      width={18}
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      className="w-full dialog-input"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="dialog-btn"
                    onClick={handleSubmit}
                  >
                    Track
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
