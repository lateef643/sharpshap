const validateFormData = (formData, properties) => {
  let errors = {};

  properties.forEach((property) => {
    if (
      property === "amount" ||
      (property === "naira" &&
        formData[property] &&
        isNaN(parseInt(formData[property])))
    ) {
      errors[property] = {
        error: true,
        text: "Please enter a valid amount",
      };
    } else if (
      property === "phone" &&
      formData[property] &&
      !/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g.test(
        formData[property]
      )
    ) {
      errors.phone = {
        error: true,
        text: "Please enter a valid phone number",
      };
    } else if (
      property === "phone" &&
      formData[property] &&
      /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g.test(
        formData[property]
      ) &&
      formData[property].length > 20
    ) {
      errors.phone = {
        error: true,
        text: "Phone number too long",
      };
    } else if (
      property === "email" &&
      formData[property] &&
      !/.{1,}@[^.]{1,}/g.test(formData[property]) &&
      formData[property].length <= 7
    ) {
      errors.email = {
        error: true,
        text: "Please enter a valid email address",
      };
    } else if (
      (property === "name" ||
        property === "lastName" ||
        property === "firstName" ||
        property === "last_name" ||
        property === "first_name") &&
      formData[property] &&
      !/^[A-Za-z'\s.,]+$/.test(formData[property])
    ) {
      errors[property] = {
        error: true,
        text: `Please enter a valid ${property}`,
      };
    } else if (
      (property === "dob" || property === "date") &&
      formData[property] &&
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
        formData[property]
      )
    ) {
      errors[property] = {
        error: true,
        text: "Please enter a valid date in the format dd/mm/yy",
      };
    } else if (
      (property === "name" ||
        property === "lastName" ||
        property === "firstName" ||
        property === "last_name" ||
        property === "first_name") &&
      formData[property] &&
      /^[A-Za-z'\s.,]+$/.test(formData[property]) &&
      formData[property].length < 3
    ) {
      errors[property] = {
        error: true,
        text: `${property} too short`,
      };
    } else if (
      property === "password_confirmation" &&
      formData[property] &&
      formData[property] !== formData["password"]
    ) {
      errors[property] = {
        error: true,
        text: `Passwords do not match`,
      };
    } else if (
      (property === "bvn" || property === "id_number") &&
      formData[property] &&
      isNaN(formData[property])
    ) {
      errors[property] = {
        error: true,
        text: `Please enter a valid ${property}`,
      };
    } else if (
      (property === "bvn" || property === "id_number") &&
      formData[property] &&
      !isNaN(formData[property]) &&
      formData[property].length !== 10
    ) {
      errors[property] = {
        error: true,
        text: `${property} must be 10 digits`,
      };
    } else if (!formData[property]) {
      errors[property] = {
        error: true,
        text: `${property} is required`,
      };
    }
  });

  return errors;
};

export default validateFormData;
