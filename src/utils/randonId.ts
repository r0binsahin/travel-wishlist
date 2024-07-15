export const randomId = () => {
  const randomCharCode = Math.floor(Math.random() * 26) + 65;
  String.fromCharCode(randomCharCode);
  let randomString = '';
  for (let i = 0; i < 5; i++) {
    randomString += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  return randomString.toLocaleLowerCase();
};
