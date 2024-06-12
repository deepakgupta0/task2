export const PROP_NAMES = {
  name: "name",
  address: "address",
  date: "date",
  amount: "amount",
  details: "details",
};
export const configurableForm = [
  {
    stepName: "Enter Name and Address",
    children: [
      {
        name: PROP_NAMES["name"],
        id: "name",
        placeholder: "Enter Name",
        value: "",
        type: "text",
        tag: "input",
        regex: [/^$/],
      },
      {
        name: PROP_NAMES["address"],
        id: "address",
        placeholder: "Enter Address",
        value: "",
        type: "text",
        tag: "input",
        regex: [/^$/],
      },
    ],
  },
  {
    stepName: "Enter Invoice Date",
    children: [
      {
        name: PROP_NAMES["date"],
        id: "date",
        placeholder: "Enter Invoice Date",
        value: "",
        type: "date",
        tag: "input",
        regex: [/^[0-9]{4}-[0-9]{2}-[0-9]{2}$|^$/gm],
      },
    ],
  },
  {
    stepName: "Enter Amount And Details",
    children: [
      {
        name: PROP_NAMES["amount"],
        id: "amount",
        placeholder: "Enter Amount",
        value: "",
        type: "text",
        tag: "input",
        regex: [/^[A-Za-z ]*$/],
      },
      {
        name: PROP_NAMES["details"],
        id: "details",
        placeholder: "Enter Details",
        value: "",
        tag: "textarea",
        regex: [/^$/],
      },
    ],
  },
  {
    stepName: "Review and Generate Invoice",
    children: [],
    component: ({ formData }) => {
      return Object.entries(PROP_NAMES).map((data) => {
        return (
          <p className="mb-2" key={data[0]}>
            <strong className="capitalize">{data[0]}</strong>{" "}
            {formData[data[1]]}
          </p>
        );
      });
    },
  },
];

export const configurableFilter = [
  {
    id: "fromDate",
    placeholder: "From Date",
    label: "From Date",
    name: "dateFrom",
    type: "date",
  },
  {
    id: "toDate",
    placeholder: "To Date",
    label: "To Date",
    name: "dateTo",
    type: "date",
  },
  {
    id: "amountFrom",
    placeholder: "Amount From",
    label: "Amount From",
    name: "amountFrom",
    type: "text",
  },
  {
    id: "amountTo",
    placeholder: "Amount To",
    label: "Amount To",
    name: "amountTo",
    type: "text",
  },
];
