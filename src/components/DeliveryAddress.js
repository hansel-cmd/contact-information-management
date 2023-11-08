import { Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";

const DeliveryAddress = ({ formikProps }) => {
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    if (values.same) {
      formikProps.setFieldValue("delivery_houseNo", formikProps.values?.houseNo);
      formikProps.setFieldValue("delivery_street", formikProps.values?.street);
      formikProps.setFieldValue("delivery_city", formikProps.values?.city);
      formikProps.setFieldValue("delivery_province", formikProps.values?.province);
      formikProps.setFieldValue("delivery_zipCode", formikProps.values?.zipCode);
    }
    validateForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
      <legend className="ms-4 px-2">Delivery Address</legend>
      <div className="mb-4 pt-4">
        <Field
          type="checkbox"
          name="same"
          id="same"
        />
        <label htmlFor="same" className="ms-2">
          Same as the billing address
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[1] justify-between flex-wrap">
          <label htmlFor="delivery_houseNo" className="mb-1">
            House No.
          </label>
          <ErrorMessage name="delivery_houseNo">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="delivery_houseNo"
            name="delivery_houseNo"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={formikProps.values?.same}
          />
        </div>
        <div className="flex flex-col flex-[2] justify-between flex-wrap">
          <label htmlFor="delivery_street" className="mb-1">
            Street
          </label>
          <ErrorMessage name="delivery_street">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="delivery_street"
            name="delivery_street"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            value={formikProps.values.delivery_street}
            disabled={formikProps.values?.same}
          />
        </div>
        <div className="flex flex-col flex-[3] mb-2">
          <label htmlFor="delivery_city" className="mb-1">
            City/Town
          </label>
          <ErrorMessage name="delivery_city">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="delivery_city"
            name="delivery_city"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={formikProps.values?.same}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[2] justify-between flex-wrap">
          <label htmlFor="delivery_province" className="mb-1">
            Province
          </label>
          <ErrorMessage name="delivery_province">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="delivery_province"
            name="delivery_province"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={formikProps.values?.same}
          />
        </div>
        <div className="flex flex-col flex-[1] justify-between flex-wrap">
          <label htmlFor="delivery_zipCode" className="mb-1">
            Zip Code
          </label>
          <ErrorMessage name="delivery_zipCode">
            {(error) => <p className="text-red-600">{error}</p>}
          </ErrorMessage>
          <Field
            id="delivery_zipCode"
            name="delivery_zipCode"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={formikProps.values?.same}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default DeliveryAddress;
