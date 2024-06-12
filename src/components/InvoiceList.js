import React, { useContext, useState } from "react";
import { InvoiceContext } from "../components/InvoiceContext";
import { PROP_NAMES, configurableFilter } from "./constants";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const { state } = useContext(InvoiceContext);
  const [filters, setFilters] = useState(() => {
    return configurableFilter.reduce((acc, curr) => {
      acc[curr.name] = "";
      return acc;
    }, {});
  });
  console.log("InvoiceList", state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredInvoices = state.invoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date);
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;
    const amountFrom = filters.amountFrom
      ? parseFloat(filters.amountFrom)
      : null;
    const amountTo = filters.amountTo ? parseFloat(filters.amountTo) : null;
    console.log(invoiceDate, dateFrom, dateTo, amountFrom, amountTo);
    return (
      (!dateFrom || invoiceDate >= dateFrom) &&
      (!dateTo || invoiceDate <= dateTo) &&
      (!amountFrom || invoice.amount >= amountFrom) &&
      (!amountTo || invoice.amount <= amountTo)
    );
  });

  return (
    <div className="p-6 bg-gray-800 text-white max-w-4xl mx-auto md:rounded-md md:shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Invoices</h2>
      {state.invoices?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {configurableFilter.map((filter, index) => {
              return (
                <div key={index}>
                  <label className="block uppercase text-gray-400 text-xs font-bold mb-2">
                    {filter.label}
                  </label>
                  <input
                    type={filter.type}
                    name={filter.name}
                    value={filters[filter.name]}
                    onChange={handleChange}
                    className="p-2 bg-gray-700 rounded w-full"
                  />
                </div>
              );
            })}
          </div>
          <ul className="space-y-4">
            {filteredInvoices.map((invoice, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-md shadow">
                {Object.entries(PROP_NAMES).map((data) => {
                  return (
                    <p className="mb-2" key={data[0]}>
                      <strong className="capitalize">{data[0]}</strong>{" "}
                      {invoice[data[1]]}
                    </p>
                  );
                })}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-xl text-center">
          Please{" "}
          <Link
            to="/create"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Add
          </Link>{" "}
          /{" "}
          <Link
            to="/import"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Import
          </Link>{" "}
          Invoice
        </p>
      )}
    </div>
  );
};

export default InvoiceList;
