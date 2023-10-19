const AddressTableDataRow = ({ data }) => {
  return (
    <>
      <td className="border border-collapse border-slate-400 p-2">
        {data.houseNo}
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        {data.street}
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        {data.city}
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        {data.province}
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        {data.zipCode}
      </td>
    </>
  );
};

export default AddressTableDataRow;
