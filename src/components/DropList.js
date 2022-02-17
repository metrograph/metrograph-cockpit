import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import dropIcon from "../assets/drop.svg";

const os = ["20.04 LTS", "18.06 LTS", "14.02 LTS"];

export default function DropList() {
  const [selectedOs, setselectedOs] = useState("20.04 LTS");

  return (
    <Listbox as="div" value={selectedOs} onChange={setselectedOs}>
      {({ open }) => (
        <>
          <div className="mt-8 relative">
            <div className="absolute w-full">
              <div className="flex flex-row items-center space-x-2">
                <div className="w-2 border-t-2 border-brand-header" />
                <p className="text-brand-dark-button text-xs flex-shrink-0 font-Inter font-bold">
                  VERSION
                </p>
                <div className="w-full border-t-2 border-brand-header" />
              </div>

              <div class="border-2 border-t-0 border-brand-header -mt-2">
                <div className="relative">
                  <span className="inline-block w-full">
                    <Listbox.Button className="flex justify-between pl-3 py-4 w-full text-left focus:outline-none  text-white text-sm font-Inter font-bold">
                      <span className="block truncate">{selectedOs}</span>
                      <img
                        src={dropIcon}
                        height="12"
                        width="12"
                        className="mr-4"
                      />
                    </Listbox.Button>
                  </span>
                </div>
              </div>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="border border-brand-header bg-brand-primary  mt-1"
                >
                  {os.map((fruit) => (
                    <Listbox.Option key={fruit} value={fruit}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active ? " text-white bg-purple-600" : "text-white"
                          } text-sm cursor-default select-none relative py-2 pl-10 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? " font-semibold" : "font-normal"
                            }`}
                          >
                            {fruit}
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-purple-600"
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
}
