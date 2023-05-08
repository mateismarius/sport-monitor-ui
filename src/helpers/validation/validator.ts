function validateIfExistsRequiredAndNames(emp: string, str: string[]) {
  let error;
  error = validateIfExistsAndRequired(emp, str);
  if (!validateNames(emp)) {
    error = "Numele nu este valid";
  }
  return error;
}

function validateIfExistsAndRequired(emp: string, str: string[]) {
  let error;
  if (!emp) {
    error = "Campul este obligatoriu";
    // @ts-ignore: Unreachable code error
  } else if (checkIfExists(emp.trim().toLowerCase(), str)) {
    error = "Utilizatorul este deja înregistrat!";
  }
  return error;
}

function checkIfExists(emp: string, str: string[]) {
  return str.includes(emp);
}
function requiredField(term: string) {
  let error;
  if (!term) {
    error = "Campul este obligatoriu";
  }
  return error;
}

function validateNames(term: string) {
  var regex = new RegExp("^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$");
  return regex.test(term);
}

function validateOnlyLettersNumbersAndSpaces(term: string) {
  var regex = new RegExp(
    "^[a-zA-Z0-9 ]*$"
  );
  return regex.test(term);
}

const validateForm = {
  validateIfExistsAndRequired,
  requiredField,
  validateIfExistsRequiredAndNames,
  validateOnlyLettersNumbersAndSpaces,
};

export default validateForm;
