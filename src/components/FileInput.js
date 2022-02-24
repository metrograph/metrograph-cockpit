import React, { useState } from "react";
export default function FileInput() {
  const [file, setFile] = useState(" Attach your Code here");
  return (
    <div className="">
      <div className="flex flex-row items-center space-x-2">
        <div className="w-2 border-t-2 border-brand-header" />
        <p className="text-brand-header text-xs flex-shrink-0 font-Inter font-bold">
          UPLOAD CODE
        </p>
        <div className="w-full border-t-2 border-brand-header" />
      </div>
      <div className="border-2 border-t-0 border-brand-header -mt-2">
        <div className="overflow-hidden p-4 ">
          <div className="relative h-8 bg-brand-header flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <span className="block text-white text-xs font-Inter font-medium">
                  {file}
                </span>
              </div>
            </div>
            <input
              type="file"
              className="h-full w-full opacity-0"
              name="myfile"
              onChange={(e) => setFile(e.target.files[0].name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
