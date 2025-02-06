

import React from "react";

type ICircleStep = {
  id: number;
  label: string;
};

type ICircleStepper = {
  steps: ICircleStep[];
  curStep: number
};

const CircleStepper = ({ steps, curStep }: ICircleStepper) => {


  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Stepper Container */}
      <div className="relative">
        {/* Progress Line Background */}
        <div className="absolute top-1/2  left-0 right-0 h-0.5 bg-gray-200 w-[calc(100%-10px)]" />

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{
            width: `calc(${
              ((curStep - 1) / (steps.length - 1)) * 100
            }% - 10px)`,
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-5 h-5 text-xs rounded-full flex items-center justify-center border-2 relative 
                  ${
                    curStep >= step.id
                      ? "border-primary bg-primary text-white"
                      : "border-muted text-muted bg-background"
                  }`}
              >
                {step.id}
              </div>

              {/* Step Label */}
              <div className="text-sm absolute -bottom-5">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded ${
            currentStep === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className={`px-4 py-2 rounded ${
            currentStep === steps.length
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default CircleStepper;
