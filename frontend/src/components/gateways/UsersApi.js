import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getUsers = (setUsers) => {
  axios
    .get(`${BASE_URL}/users`, {})
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err.reponse.data.messege));
};
export const getUserById = (id, setUser, messageApi, isLoading) => {
  isLoading(true);
  axios
    .get(`${BASE_URL}/users/${id}`, {})
    .then((res) => {
      setUser(res.data);
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};
export const addUser = (values, isLoading, messageApi, navigateToTable) => {
  isLoading(true);
  axios
    .post(`${BASE_URL}/users`, values)
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      navigateToTable();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};
export const updateUser = (values, isLoading, messageApi, navigateToTable) => {
  isLoading(true);
  axios
    .put(`${BASE_URL}/users`, values)
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      navigateToTable();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};
export const removeUser = (values, isLoading, messageApi, navigateToTable) => {
  isLoading(true);
  axios
    .delete(`${BASE_URL}/users`, { data: values })
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      navigateToTable();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};

export const removeOpportunity = (value, isLoading, messageApi, getUserElm) => {
  axios
    .delete(`${BASE_URL}/users/update_opportunities`, {
      data: value,
    })
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      getUserElm();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};

export const updateOpportunity = (value, isLoading, messageApi, getUserElm) => {
  axios
    .put(`${BASE_URL}/users/update_opportunities`, {
      data: value,
    })
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      getUserElm();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};

export const AddOpportunityToUser = (
  values,
  isLoading,
  messageApi,
  navigateToTable
) => {
  isLoading(true);
  axios
    .post(`${BASE_URL}/users/update_opportunities`, values)
    .then((res) => {
      messageApi.open({
        type: "success",
        content: res.data.success,
      });
      navigateToTable();
      isLoading(false);
    })
    .catch((err) => {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
      isLoading(false);
    });
};
