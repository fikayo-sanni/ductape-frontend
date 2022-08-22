let storeData, updateData, retrieveData, removeData;
if (typeof window !== "undefined") {
  storeData = async (label, data) => {
    try {
      let response = await localStorage.setItem(label, data.toString());
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  updateData = async (label, data) => {
    try {
      let response = await localStorage.mergeItem(label, data.toString());
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  retrieveData = async (label) => {
    try {
      let response = await localStorage.getItem(label);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  removeData = async (label) => {
    try {
      let response = await localStorage.removeItem(label);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export {storeData, updateData, retrieveData, removeData}
