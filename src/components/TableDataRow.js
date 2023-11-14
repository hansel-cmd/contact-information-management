import { Link } from "react-router-dom";
import { CONTACT_DETAIL } from "../routes/route";

const TableDataRow = ({ data, id, pathname }) => {
  return (
    <td className=" border-slate-400 p-2">
      <Link to={CONTACT_DETAIL.replace(":id", id)} state={pathname}>{data}</Link>
    </td>
  );
};

export default TableDataRow;
