const getErrorMessages = (error) => {
  const errors = [];
  console.log(error);
  let errorsFromApi = error.response.data.message;
  Object.values(errorsFromApi).forEach((key) => {
    errors.push(key[0]);
  });

  return errors;
};

export default {
  getErrorMessages,
};
