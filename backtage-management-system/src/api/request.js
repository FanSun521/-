import myAxios from "./index";

const getHome = () => {
  return myAxios.get("/home/getData");
};
const getUserList = (params) => {
  return myAxios({
    method: "get",
    url: "/user/getUserList",
    params,
  });
};
const createUser = (data) => {
  return myAxios({
    method: "post",
    url: "/user/createUser",
    data: data,
  });
};
const deleteUser = (data) => {
  return myAxios({
    method: "post",
    url: "/user/deleteUser",
    data: data,
  });
};
const batchremove = (data) => {
  return myAxios({
    method: "post",
    url: "/user/batchremove",
    data: data,
  });
};
const updateUser = (data) => {
  return myAxios({
    method: "post",
    url: "/user/updateUser",
    data: data,
  });
};
const login = (data) => {
  return myAxios({
    method: "post",
    url: "/login",
    data: data,
  });
};
export {
  getHome,
  getUserList,
  createUser,
  deleteUser,
  batchremove,
  updateUser,
  login,
};
