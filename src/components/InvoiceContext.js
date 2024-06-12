import React, { createContext, useEffect, useReducer } from "react";

const InvoiceContext = createContext();

/**
 * {
 *    invoices:[
 *      {
 *          name:"",
 *          address:"",
 *          amount:"",
 *          date:"",
 *          details:""
 *      }
 *    ]
 * }
 */
const initialState = {
  invoices: JSON.parse(localStorage.getItem("invoices")) || [],
};

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      return { ...state, invoices: [...state.invoices, action.payload] };
    case "IMPORT_INVOICES":
      return { ...state, invoices: [...state.invoices, ...action.payload] };
    default:
      return state;
  }
};

const InvoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  //   useEffect(() => {
  //     const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
  //     console.log(storedInvoices);
  //     dispatch({ type: "SET_INVOICES", payload: storedInvoices });
  //   }, []);
  console.log("InvoiceProvider");
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(state.invoices));
  }, [state.invoices]);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceContext, InvoiceProvider };
