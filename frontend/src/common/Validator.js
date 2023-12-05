export const validator = (
  data,
  rules,
  messages = [],
  customAttributes = []
) => {
  let errors = {};

  if (Object.keys(rules).length > 0) {
    Object.keys(rules).map((validate) => {
      const validateArr = rules[validate].split("|");
      validateArr.map((rule) => {
        if (!errors[validate]) {
          let error = "";

          if (rule === "required") {
            error = validateRequired(validate, data[validate]);
          }

          if (rule === "email") {
            error = validateEmail(validate, data[validate]);
          }

          if (rule === "number") {
            error = validateNumber(validate, data[validate]);
          }

          if (rule === "file") {
            let maxsize = rule.split(":")[1];
            error = validateFile(validate, data[validate], maxsize);
          }

          if (rule.includes("mobile")) {
            let code = rule.split(":")[1];
            error = validateMobile(validate, data[validate], code);
          }

          if (rule.includes("min")) {
            let minValue = rule.split(":")[1];
            error = validateMinimum(validate, data[validate], minValue);
          }

          if (error) {
            errors[validate] = [error];
          }
        }
      });
    });
  }

  return errors;
};

export const setValidationErrors = (formErrors, setFormErrors, errors) => {
  Object.keys(formErrors).map((error, i) => {
    if (errors[error] && errors[error].length > 0) {
      // Set the first error for the current field
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [error]: errors[error][0],
      }));
    } else {
      // If there are no errors for the current field, reset it to blank
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [error]: "",
      }));
    }
  });
};

function validateRequired(validate, data) {
  let errMsg = "";
  if ((Array.isArray(data) && data.length == 0) || (typeof(data) == 'object' && Object.keys(data).length == 0) || (!Array.isArray(data) && typeof(data) != 'object' && !data.trim())) {
    errMsg = `The ${validate} field is required.`;
  }

  return errMsg;
}

function validateEmail(validate, data) {
  let errMsg = "";
  if (!data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    errMsg = `The ${validate} must be a valid email address.`;
  }

  return errMsg;
}

function validateMinimum(validate, data, minValue) {
  let errMsg = "";
  if (data.length < minValue) {
    errMsg = `The ${validate} must be at least 8 characters.`;
  }

  return errMsg;
}

function validateNumber(validate, data) 
{
  let errMsg = "";
  if (isNaN(data)) {
    errMsg = `The ${validate} must be an integer.`;
  }
  return errMsg;
}

function validateFile(validate, data, maxsize) 
{
  let errMsg = "";
  const maxFileSize = maxsize * 1024 * 1024;
  if(data){
    Array.from(data).forEach((file, index) => {
      if (file.size > maxFileSize) {
        errMsg = `The ${validate} size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)} MB.`;
      }
    });
  }
  
  return errMsg;
}

function validateMobile(validate, data, code) 
{
  let errMsg = "";
  switch(code){
    case "93": 
    case "421":
      if (!data.match(/^\d{9}$/)) {
        errMsg = `The ${validate.replace(/_/g, " ")} must be 9 digit.`;
      }
      return errMsg
    default: 
      if (!data.match(/^\d{10}$/)) {
        errMsg = `The ${validate.replace(/_/g, " ")} must be 10 digit.`;
      }
      return errMsg
  }
}
  