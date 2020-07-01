const validateFormData = (formData, properties) => {
  let errors = {};

  properties.forEach((property) => {
    if (
      property === "amount" &&
      formData[property] &&
      isNaN(parseInt(formData[property]))
    ) {
      errors.amount = true;
    } else if (
      property === "phone" &&
      formData[property] &&
      formData[property].length <= 10
    ) {
      errors.phone = true;
    } else if (!formData[property]) {
      errors[property] = true;
    }
  });

  return errors;
};

export default validateFormData;
