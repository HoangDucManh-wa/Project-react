import validator from "validator";
export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
};

export const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  if (typeof password !== "string") {
    throw new Error("Password must be a string");
  }

  let lengthPassword = password.length;

  if (lengthPassword < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (lengthPassword > 32) {
    throw new Error("Password must not exceed 32 characters");
  }

  let a = 0,
    b = 0,
    c = 0,
    d = 0;

  for (let i = 0; i < lengthPassword; i++) {
    if (password[i] >= "a" && password[i] <= "z") {
      a++;
    } else if (password[i] >= "0" && password[i] <= "9") {
      b++;
    } else if (password[i] >= "A" && password[i] <= "Z") {
      c++;
    } else {
      d++;
    }
  }

  if (!(a && b && c && d)) {
    throw new Error(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    );
  }

  for (let i = 0; i < lengthPassword; i++) {
    if (password[i] === " ") {
      throw new Error("Password must not contain spaces");
    }
  }
};
export const validateStudentId = (studentId) => {
  if (!studentId) {
    throw new Error("invalid studentId");
  }
  if (typeof studentId !== "string") {
    throw new Error("studentId must be a string");
  }
  if (studentId.includes(" ")) {
    throw new Error("studentId must not contain spaces");
  }
  for (let i = 0; i < studentId.length; i++) {
    if (!(studentId[i] >= "0" && studentId[i] <= "9")) {
      throw new Error("invalid studentId");
    }
  }
};

export const validateUserName = (name) => {
  if (!name) {
    throw new Error("Name is required");
  }

  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }

  if (name.trim().length !== name.length) {
    throw new Error("Name must not start or end with a space");
  }

  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  if (name.length > 40) {
    throw new Error("Name must be at max 40 characters long");
  }
};
