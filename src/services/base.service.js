import Store from "../store";

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    "Content-Type": "application/json",
    "authorization": "Bearer " + currentUser?.token
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise.then(data => {
    return data;
  }).catch((error) => {
    console.error("handleResponseWithLoginCheck error ", error);
  });
};