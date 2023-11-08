const removeExtraSpaces = (e, props) => {
  const updated = e.target.value.replace(/\s+/g, " ").trim();
  props.setFieldValue(e.target.name, updated);

  // run the default onBlur() to make sure validation still works.
  props.getFieldProps(e.target.name).onBlur(e);
};


export default removeExtraSpaces;