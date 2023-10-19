import PageTitle from "../components/PageTitle";
import BillingAddress from "../components/BillingAddress";
import DeliveryAddress from "../components/DeliveryAddress";


const NewContact = () => {
  return (
    <>
      <PageTitle icon={"bi bi-plus-circle-fill"} title={"New Contact"} />
      <div className="p-5 shadow-lg border rounded-lg">
        <form action="">
          <section className="flex grow gap-5 flex-wrap">
            <section className="flex-1 md:border-e-2 px-4">
              <div className="py-4">
                <fieldset className="border-t-2 border-blue-700">
                  <legend className="ms-4 px-2">Basic information</legend>

                  <div class="flex items-center justify-center w-full pt-4">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          class="bi bi-camera"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />{" "}
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />{" "}
                        </svg>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>

                  <div className="pt-4">
                    <div className="flex flex-col mb-4">
                      <label htmlFor="firstName" className="mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="border-2 p-1"
                      />
                    </div>
                    <div className="flex flex-col mb-4 flex-1">
                      <label htmlFor="lastName" className="mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="border-2 p-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="phoneNumber" className="mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      className="border-2 p-1"
                    />
                  </div>
                </fieldset>
              </div>
            </section>

            <section className="flex-[2] px-4">
              <div className="py-4">
                <BillingAddress />
              </div>

              <div className="py-4">
                <DeliveryAddress />
              </div>

              <input
                type="submit"
                value="Save Contact"
                className="p-2 rounded w-44 bg-primary-600 hover:bg-primary-700 text-white cursor-pointer float-right"
              />
            </section>
          </section>
        </form>
      </div>
    </>
  );
};

export default NewContact;
