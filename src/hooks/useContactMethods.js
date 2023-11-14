import { sendDELETERequest, sendPUTRequest } from "../services/service";

export const useContactMethods = ({
  data,
  idToBeDeleted,
  pageSize,
  currentPage,
  handlePageChange,
  setData,
  setIcon,
  setMessage,
  handleShowToast,
  setChanges,
}) => {
  const handleDelete = async (selectedId) => {
    const id = selectedId ?? idToBeDeleted;
    try {
      await sendDELETERequest(`delete-contact/${id}/`);
      const updatedResults = data.results.filter((result) => result.id !== id);

      // If there is 1 contact in the last page, and it was deleted,
      //  our currentPage should be changed to last page - 1
      const remainder = data.count % pageSize;
      const totalPages = Math.ceil(data.count / pageSize);
      if (remainder === 1 && currentPage === totalPages) {
        handlePageChange(currentPage - 1);
      }

      setData({
        ...data,
        count: data.count - 1,
        results: updatedResults,
      });
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Contact is deleted successfully!");
    } catch (error) {
      setMessage("Cannot perform action. Please try again later.");
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleBlock = async (id) => {
    try {
      const response = await sendPUTRequest({}, `blocked-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isBlocked;
            return {
              ...result,
              isBlocked: !result.isBlocked,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        if (typeof setChanges === "function")
          setChanges((current) => current + 1);
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Blocked Contacts!"
            : "Added to Blocked Contacts!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleEmergency = async (id) => {
    try {
      const response = await sendPUTRequest({}, `emergency-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isEmergency;
            return {
              ...result,
              isEmergency: !result.isEmergency,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        if (typeof setChanges === "function")
          setChanges((current) => current + 1);
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Emergency Contacts!"
            : "Added to Emergency Contacts!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleFavorite = async (id) => {
    try {
      const response = await sendPUTRequest({}, `favorite-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isFavorite;
            return {
              ...result,
              isFavorite: !result.isFavorite,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        if (typeof setChanges === "function")
          setChanges((current) => current + 1);
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Favorites!"
            : "Added to Favorites!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        console.log(error);
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  return {
    handleDelete,
    handleBlock,
    handleEmergency,
    handleFavorite,
  };
};
