import Api from "../services/api";

export const sendPOSTRequest = async (data, endpoint) => {
  try {
    const response = await Api().post(endpoint, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendPUTRequest = async (data, endpoint) => {
  try {
    const response = await Api().put(endpoint, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendGETRequest = async (endpoint) => {
  try {
    const response = await Api().get(endpoint);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendDELETERequest = async (endpoint) => {
  try {
    const response = await Api().delete(endpoint);
    return response;
  } catch (err) {
    throw err;
  }
};
