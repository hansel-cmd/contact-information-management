import TableDataRow from "./TableDataRow";

const AddressTableDataRow = ({ data, id }) => {
  return (
    <>
      {Object.keys(data).map((key, index) => (
        <TableDataRow key={index} data={data[key]} id={id}></TableDataRow>
      ))}
    </>
  );
};

export default AddressTableDataRow;
