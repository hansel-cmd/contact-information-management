const BillingAddress = () => {
  return (
    <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
      <legend className="ms-4 px-2">Billing Address</legend>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2 pt-4">
        <div className="flex flex-col flex-[1]">
          <label htmlFor="houseNo" className="mb-1">
            House No.
          </label>
          <input id="houseNo" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[2]">
          <label htmlFor="street" className="mb-1">
            Street
          </label>
          <input id="street" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[3] mb-2">
          <label htmlFor="city" className="mb-1">
            City/Town
          </label>
          <input id="city" type="text" className="border-2 p-1" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[2]">
          <label htmlFor="province" className="mb-1">
            Province
          </label>
          <input id="province" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[1]">
          <label htmlFor="zipCode" className="mb-1">
            Zip Code
          </label>
          <input id="zipCode" type="text" className="border-2 p-1" />
        </div>
      </div>
    </fieldset>
  );
};

export default BillingAddress;
