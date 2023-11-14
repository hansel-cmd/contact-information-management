import TableDataRow from "./TableDataRow";

const AddressTableDataRow = ({ data, id, pathname }) => {
  return (
    <>
      {Object.keys(data).map((key, index) => (
        <TableDataRow key={index} data={data[key]} id={id} pathname={pathname}></TableDataRow>
      ))}
    </>
  );
};

export default AddressTableDataRow;
