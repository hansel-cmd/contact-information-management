const DeliveryAddress = () => {
  return (
    <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
      <legend className="ms-4 px-2">Delivery Address</legend>
      <div className="mb-4 pt-4">
        <input type="checkbox" name="same" id="same" />
        <label htmlFor="same" className="ms-2">
          Same as the billing address
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[1]">
          <label htmlFor="delivery_houseNo" className="mb-1">
            House No.
          </label>
          <input id="delivery_houseNo" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[2]">
          <label htmlFor="delivery_street" className="mb-1">
            Street
          </label>
          <input id="delivery_street" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[3] mb-2">
          <label htmlFor="delivery_city" className="mb-1">
            City/Town
          </label>
          <input id="delivery_city" type="text" className="border-2 p-1" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
        <div className="flex flex-col flex-[2]">
          <label htmlFor="delivery_province" className="mb-1">
            Province
          </label>
          <input id="delivery_province" type="text" className="border-2 p-1" />
        </div>
        <div className="flex flex-col flex-[1]">
          <label htmlFor="delivery_zipCode" className="mb-1">
            Zip Code
          </label>
          <input id="delivery_zipCode" type="text" className="border-2 p-1" />
        </div>
      </div>
    </fieldset>
  );
};

export default DeliveryAddress;
