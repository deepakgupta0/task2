import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { InvoiceContext } from "../components/InvoiceContext";
import { configurableForm } from "./constants";
import { useNavigate } from "react-router-dom";
const InvoiceWizard = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(InvoiceContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    let state = {};
    configurableForm.forEach((child) => {
      console.log(child);
      child.children.forEach((field) => {
        state[field.name] = field.value;
      });
    });
    return state;
  });
  let [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const form = configurableForm[step - 1];
    for (let i = 0; i < form.children.length; i++) {
      const field = form.children[i];
      const regexArray = field?.regex;
      if (regexArray) {
        const currentValue = formData[field.name];
        for (let j = 0; j < regexArray.length; j++) {
          let regex = regexArray[j];
          console.log(regex, regex?.test(currentValue), currentValue);
          if (regex?.test(currentValue)) {
            setError(`Invalid ${field.name}`);
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    const isFormValid = validateForm(formData);
    if (isFormValid) {
      setStep(step + 1);
      setError("");
    }
  };
  const handleBack = () => setStep(step - 1);
  const handleSubmit = () => {
    dispatch({ type: "ADD_INVOICE", payload: formData });
    setStep(1);
    setFormData({ name: "", address: "", date: "", amount: "", details: "" });
    toast.success("Invoice Created Successfully", {
      position: "bottom-right",
      closeOnClick: true,
      pauseOnHover: false,
    });
    navigate("/");
  };

  const generateChild = (field, index) => {
    if (field.tag === "input" && field.type === "text") {
      return (
        <input
          key={index}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          id={field.id}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        ></input>
      );
    } else if (field.tag === "textarea") {
      return (
        <textarea
          key={index}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          id={field.id}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        ></textarea>
      );
    } else if (field.tag === "input" && field.type === "date") {
      return (
        <input
          key={index}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          id={field.id}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        ></input>
      );
    }
  };
  const generateTemplate = (form, index) => {
    const ActiveComponent = form.component;
    return (
      <React.Fragment key={index}>
        <h2 className="text-2xl font-bold mb-4">
          Step {index + 1}: {form.stepName}
        </h2>
        <>
          {index !== configurableForm.length - 1 ? (
            form.children.map((field, index) => {
              return generateChild(field, index);
            })
          ) : (
            <ActiveComponent formData={formData} />
          )}
        </>
      </React.Fragment>
    );
  };

  return (
    <>
      <h2 className="text-center font-bold text-3xl mb-4">Create Invoice</h2>

      <div className="p-6 bg-gray-800 text-white max-w-md mx-auto md:rounded-md md:shadow-md">
        {configurableForm.map((form, index) => {
          if (index === step - 1) return generateTemplate(form, index);
          return null;
        })}
        {error && <div className="text-red-700 font-bold mb-4">{error}</div>}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          )}
          {step === configurableForm.length ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            >
              Generate Invoice
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceWizard;
