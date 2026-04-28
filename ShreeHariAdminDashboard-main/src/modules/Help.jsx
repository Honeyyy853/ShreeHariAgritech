import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Help = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help</h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        This is help center page
      </p>

      <div className="bg-white rounded-lg shadow divide-y">
        <div>
          <button
            onClick={() => toggle(1)}
            className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
          >
            <span className="font-semibold text-gray-800">
              How to manage categories
            </span>
            <ChevronDown
              className={`transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === 1 && (
            <div className="px-4 sm:px-6 pb-6">
              <div className="aspect-video rounded overflow-hidden">
              <video className="h-full w-full rounded-lg" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggle(2)}
            className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
          >
            <span className="font-semibold text-gray-800">
              How to add or edit data
            </span>
            <ChevronDown
              className={`transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === 2 && (
            <div className="px-4 sm:px-6 pb-6">
              <div className="aspect-video rounded overflow-hidden">
              <video className="h-full w-full rounded-lg" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggle(3)}
            className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
          >
            <span className="font-semibold text-gray-800">
              Common issues & solutions
            </span>
            <ChevronDown
              className={`transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === 3 && (
            <div className="px-4 sm:px-6 pb-6">
              <div className="aspect-video rounded overflow-hidden">
              <video className="h-full w-full rounded-lg" controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
