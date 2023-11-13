import { Link } from "react-router-dom";
import { CONTACT_DETAIL } from "../routes/route";

const AddressTableDataRow = ({ data, id }) => {
  return (
    <>
      <td className="border border-collapse border-slate-400 p-2">
        <Link to={CONTACT_DETAIL.replace(":id", id)}>{data.houseNo}</Link>
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        <Link to={CONTACT_DETAIL.replace(":id", id)}>{data.street}</Link>
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        <Link to={CONTACT_DETAIL.replace(":id", id)}>{data.city}</Link>
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        <Link to={CONTACT_DETAIL.replace(":id", id)}>{data.province}</Link>
      </td>
      <td className="border border-collapse border-slate-400 p-2">
        <Link to={CONTACT_DETAIL.replace(":id", id)}>{data.zipCode}</Link>
      </td>
    </>
  );
};

export default AddressTableDataRow;
