const removeExtraSpaces = (e, props) => {
  const updated = e.target.value.replace(/\s+/g, " ").trim();
  props.setFieldValue(e.target.name, updated);

  // run the default onBlur() to make sure validation still works.
  props.getFieldProps(e.target.name).onBlur(e);
};

// Transforms +639273939667 back to '+63 (927) 111-1223'
const formatPhoneNumber = (value) => {
  // Replace all non-numeric characters from the value
  const cleanValue = value.replace(/\D/g, '');
  // Format the phone number based on the pattern
  const formattedValue = `+${cleanValue.slice(0, 2)} (${cleanValue.slice(2, 5)}) ${cleanValue.slice(5, 8)}-${cleanValue.slice(8)}`;
  return formattedValue;
}


export  { removeExtraSpaces, formatPhoneNumber };