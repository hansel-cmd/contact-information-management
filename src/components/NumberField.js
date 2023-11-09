import { PatternFormat } from "react-number-format";

const NumberField = ({field, ...props}) => {
    return (
      <PatternFormat
        {...field}
        onBlur={props.onBlur}
        type="tel"
        format="+63 (###) ###-####"
        mask="_"
        className="border-2 p-1"
        placeholder="+63 (xxx) xxx-xxxx"
      />
    );
  };

export default NumberField;