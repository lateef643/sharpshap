const validateFormData = (formData, properties) => {
  let errors = {};

  properties.forEach((property) => {
    if (
      (property === "amount" || property === "naira") &&
      formData[property] &&
      isNaN(parseInt(formData[property]))
    ) {
      errors[property] = {
        error: true,
        text: "Amount is invalid",
      };
    } else if (
      (property === "phone" ||
        property === "mobile" ||
        property === "business_phone") &&
      formData[property] &&
      // !/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g.test(
      //   formData[property]
      // )
      !/^[0]\d{10}$/.test(formData[property])
    ) {
      errors[property] = {
        error: true,
        text: "Phone number must be 11-digits",
      };
    } else if (
      (property === "phone" ||
        property === "mobile" ||
        property === "business_phone") &&
      formData[property] &&
      /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g.test(
        formData[property]
      ) &&
      formData[property].length > 20
    ) {
      errors[property] = {
        error: true,
        text: "Phone number too long",
      };
    } else if (
      property === "email" &&
      formData[property] &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData[property])
    ) {
      errors.email = {
        error: true,
        text: "Email address is invalid",
      };
    } else if (
      property === "email" &&
      formData[property] &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData[property]) &&
      formData[property].length <= 7
    ) {
      errors.email = {
        error: true,
        text: "Email address is invalid",
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
        text: `${property.replace("_", "")} is invalid`,
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
        text: `${property.replace("_", "")} too short`,
      };
    } else if (
      property === "password" &&
      formData[property] &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        formData[property]
      )
    ) {
      errors.password = {
        error: true,
        text:
          "Password too weak, use at least 8 characters, one uppercase, lowercase, number and special character",
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
      property === "pin_confirmation" &&
      formData[property] &&
      formData[property] !== formData["pin"]
    ) {
      errors[property] = {
        error: true,
        text: `Pins do not match`,
      };
    } else if (
      (property === "bvn" || property === "id_number") &&
      formData[property] &&
      isNaN(formData[property])
    ) {
      errors[property] = {
        error: true,
        text: `${property} is invalid`,
      };
    } else if (
      (property === "bvn" || property === "id_number") &&
      formData[property] &&
      !isNaN(formData[property]) &&
      formData[property].length !== 11
    ) {
      errors[property] = {
        error: true,
        text: `${property} must be 11 digits`,
      };
    } else if (property === "loanAmount" && !parseInt(formData[property])) {
      errors[property] = {
        error: true,
        text: `Please enter a valid amount`,
      };
    } else if (
      property === "loanAmount" &&
      parseInt(formData[property]) &&
      parseInt(formData[property]) > 150000
    ) {
      errors[property] = {
        error: true,
        text: `Maximum loan amount is NGN150,000`,
      };
    } else if (!formData[property]) {
      errors[property] = {
        error: true,

        text:
          property === "date_of_birth"
            ? "DOB is required"
            : property === "local_government_id"
            ? "LGA is required"
            : property === "password_confirmation" ||
              property === "old_password" ||
              property === "pin_confirmation"
            ? `${property.replace("_", " ")} is required`
            : `${property.replace("_", " ")} is required`,
      };
    }
  });

  return errors;
};

export default validateFormData;
