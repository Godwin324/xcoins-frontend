const getErrorMessages = (error) => {
  const errors = [];

  if (error == "Error: Network Error") {
    errors.push("A network error occured. The backend may not be online")
    console.log("Network error occured");
  } else {
    let errorsFromApi = error.response.data.message;
  Object.values(errorsFromApi).forEach((key) => {
    errors.push(key[0]);
  });
}
  return errors;
};

export default {
  getErrorMessages
};
