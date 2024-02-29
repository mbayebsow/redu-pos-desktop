export const generateIdentifier = () => {
  const randomNumber = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0");
  const barcodeIdentifier =
    randomNumber +
    "-" +
    Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");
  return barcodeIdentifier;
};
