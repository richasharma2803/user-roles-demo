type FormErrorsType = {
  [key:string]: string
}

type SetFormErrorsType = React.Dispatch<React.SetStateAction<FormErrorsType>>

type ErrorsType = {
  [key:string]: string
}

type ValidatorDataType = string|File[]

export const validator = (
  data: {[key:string]: any},
  rules: {[key:string]: string},
  // messages = [],
  // customAttributes = []
) => {
  let errors: {[key:string]: any} = {};

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

export const setValidationErrors = (formErrors: FormErrorsType, setFormErrors: SetFormErrorsType, errors: ErrorsType) => {
  Object.keys(formErrors).map((error) => {
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

function validateRequired(validate:string, data:ValidatorDataType) {
  let errMsg = "";
  if ((Array.isArray(data) && data.length == 0) || (typeof(data) == 'object' && Object.keys(data).length == 0) || (!Array.isArray(data) && typeof(data) != 'object' && !data.trim())) {
    errMsg = `The ${validate} field is required.`;
  }

  return errMsg;
}

function validateEmail(validate:string, data:ValidatorDataType) {
  let errMsg = "";
  if (typeof(data) == "string" && !data.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    errMsg = `The ${validate} must be a valid email address.`;
  }

  return errMsg;
}

function validateMinimum(validate:string, data:ValidatorDataType, minValue:string) {
  let errMsg = "";
  if (data.length < parseInt(minValue)) {
    errMsg = `The ${validate} must be at least 8 characters.`;
  }

  return errMsg;
}

function validateNumber(validate:string, data:ValidatorDataType) 
{
  let errMsg = "";
  if (typeof(data) == "number" && isNaN(data)) {
    errMsg = `The ${validate} must be an integer.`;
  }
  return errMsg;
}

function validateFile(validate:string, data:ValidatorDataType, maxsize:string) 
{
  let errMsg = "";
  const maxFileSize = parseInt(maxsize) * 1024 * 1024;
  if(data && typeof(data) != "number" && typeof(data)!= "string"){
    Array.from(data).forEach((file) => {
      if (file.size > maxFileSize) {
        errMsg = `The ${validate} size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)} MB.`;
      }
    });
  }
  
  return errMsg;
}

function validateMobile(validate:string, data:ValidatorDataType, code:string) 
{
  let errMsg = "";
  switch(code){
    case "93": 
    case "421":
      if (typeof(data) == "string" && !data.match(/^\d{9}$/)) {
        errMsg = `The ${validate.replace(/_/g, " ")} must be 9 digit.`;
      }
      return errMsg
    default: 
      if (typeof(data) == "string" && !data.match(/^\d{10}$/)) {
        errMsg = `The ${validate.replace(/_/g, " ")} must be 10 digit.`;
      }
      return errMsg
  }
}
  