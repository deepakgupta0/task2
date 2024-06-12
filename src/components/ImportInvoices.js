import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { InvoiceContext } from "../components/InvoiceContext";
const ImportInvoices = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(InvoiceContext);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        console.log(workbook);
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        console.log(worksheet);
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
        dispatch({ type: "IMPORT_INVOICES", payload: json });
        toast.success("File Imported Successfully", {
          position: "bottom-right",
          closeOnClick: true,
          pauseOnHover: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        navigate("/");
      } catch (error) {
        toast.error("File Is Not Supported");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2 className="text-center font-bold text-3xl mb-4">Import Invoice</h2>
      <input
        onChange={handleFileUpload}
        type="file"
        className="cursor-pointer flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
};

export default ImportInvoices;
