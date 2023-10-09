const isValidName = (name) => {
  if (name.length === 0) {
    return false;
  }

  if (!name[0].match(/[A-Z]/)) {
    return false;
  }

  if (name.match(/\d/)) {
    return false;
  }

  return true;
};

const isValidEmail = (email) => {
  if (!email.includes("@")) {
    return false;
  }

  const [local, domain] = email.split("@");

  if (local.length === 0 || domain.length === 0) {
    return false;
  }

  if (!domain.includes(".")) {
    return false;
  }

  const [_, domainExtension] = domain.split(".");

  if (!["com", "hu", "net", "edu"].includes(domainExtension)) {
    return false;
  }

  return true;
};
