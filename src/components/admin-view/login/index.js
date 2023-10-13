"use client";

import FormControls from "../form-controls"

const controls = [
    {
        name: "username",
        placeholder: "Enter username",
        type: "text",
        label: "Enter username"
    },
    {
        name: "password",
        placeholder: "Enter password",
        type: "password",
        label: "Enter password"
    }
]

export default function Login({formData, setFormData, handleLogin}) {
  return (
    <div className="w-full">
      <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          onClick={() => handleLogin()}
          className="mt-[10px] border border-green-600 p-4 font-bold text-[16px]"
        >
          Login
        </button>
      </div>
    </div>
  );
}
