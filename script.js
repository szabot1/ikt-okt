//Random Password átadás.
let randomkeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
let randompass = "";
for(let i = 0;i<16;i++)
{
  let upperorlower = Math.floor(Math.random());
  let current = Math.floor(Math.random()* randomkeys.length + 1);
  randompass += randomkeys.charAt(current);
}
/*Test
console.log(randompass);
*/
document.getElementById("password").value = randompass;

//Név validálás
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

//Email validálás
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
