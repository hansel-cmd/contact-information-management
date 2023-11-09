import { Field, ErrorMessage } from "formik";

const BillingAddress = ({ onBlur }) => {
  return (
    <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
      <legend className="ms-4 px-2">Billing Address</legend>
      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-4 pt-4">
        <div className="flex flex-col flex-[1] justify-between flex-wrap">
          <label htmlFor="houseNo" className="mb-1">
            House No.
          </label>
          <ErrorMessage name="houseNo">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="houseNo"
            name="houseNo"
            type="text"
            className="border-2 p-1"
            onBlur={onBlur}
          />
        </div>
        <div className="flex flex-col flex-[2] justify-between flex-wrap">
          <label htmlFor="street" className="mb-1">
            Street
          </label>
          <ErrorMessage name="street">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="street"
            name="street"
            type="text"
            className="border-2 p-1"
            onBlur={onBlur}
          />
        </div>
        <div className="flex flex-col flex-[4] justify-between flex-wrap">
          <label htmlFor="city" className="mb-1">
            City/Town
          </label>
          <ErrorMessage name="city">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="city"
            name="city"
            type="text"
            className="border-2 p-1"
            onBlur={onBlur}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[2] justify-between flex-wrap">
          <label htmlFor="province" className="mb-1">
            Province
          </label>
          <ErrorMessage name="province">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="province"
            name="province"
            type="text"
            className="border-2 p-1"
            onBlur={onBlur}
          />
        </div>
        <div className="flex flex-col flex-[1] justify-between flex-wrap">
          <label htmlFor="zipCode" className="mb-1">
            Zip Code
          </label>
          <ErrorMessage name="zipCode">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="zipCode"
            name="zipCode"
            type="text"
            className="border-2 p-1"
            onBlur={onBlur}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default BillingAddress;
