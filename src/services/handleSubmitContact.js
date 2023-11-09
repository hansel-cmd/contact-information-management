import Api from "./api";

const handleSubmitContact = async (
  values,
  actions,
  image,
  endpoint,
  method = "POST",
  setMessage,
  setIsError,
  setThumbnail,
  setShowDialog,
  handleShowToast
) => {
  // from: '+63 (xxx) xxx-xxxx' to '+63xxxxxxxxxx'
  const phoneNumber = values.phoneNumber.replace(/[()\s-]/g, "");
  console.log("phoneNUmber", phoneNumber);

  const formData = new FormData();
  if (image) formData.append("profile", image);
  formData.append("first_name", values.firstName);
  formData.append("last_name", values.lastName);
  formData.append("phone_number", phoneNumber);
  formData.append("house_no", values.houseNo);
  formData.append("street", values.street);
  formData.append("city", values.city);
  formData.append("province", values.province);
  formData.append("zipcode", values.zipCode);
  formData.append("delivery_house_no", values.delivery_houseNo);
  formData.append("delivery_street", values.delivery_street);
  formData.append("delivery_city", values.delivery_city);
  formData.append("delivery_province", values.delivery_province);
  formData.append("delivery_zipcode", values.delivery_zipCode);
  formData.append("is_favorite", values.favorite);
  formData.append("is_blocked", method === "PUT" ? values.blocked : false);
  formData.append("is_emergency", values.emergency);

  const methodMap = {
    POST: Api().post,
    PUT: Api().put,
  };

  try {
    const response = await methodMap[method](endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    
    if (response?.status === 201) {
        // Create Contact
        setMessage("Created Successfully!");
        setIsError(false);
        setThumbnail(null);
        setShowDialog(false);
        actions.resetForm();
    } else if (response?.status === 200) {
        // Edit Contact
        setMessage("Updated Successfully!");
        setIsError(false);
        setShowDialog(false);
    }
  } catch (error) {
    console.log("error sending", error);
    setIsError(true);
    setMessage("Cannot Perform Action. Please try again later.");
  }

  handleShowToast();
};

export default handleSubmitContact;