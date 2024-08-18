export const getLocal = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  return accounts;
};
