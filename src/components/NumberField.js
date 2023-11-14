import { PatternFormat } from "react-number-format";

const NumberField = ({field, ...props}) => {
    return (
      <PatternFormat
        {...field}
        disabled={props.disabled}
        onBlur={props.onBlur}
        type="tel"
        format="+63 (###) ###-####"
        mask="_"
        className="border-2 p-1 disabled:bg-gray-200 dark:text-black dark:disabled:bg-gray-400"
        placeholder="+63 (xxx) xxx-xxxx"
      />
    );
  };

export default NumberField;