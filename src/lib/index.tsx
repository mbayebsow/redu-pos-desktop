export function formatISODate(isoDateStr: Date, view?: "date" | "hour") {
  const dateObj = new Date(isoDateStr);

  let day: number | string = dateObj.getDate();
  let month: number | string = dateObj.getMonth() + 1;
  let hours: number | string = dateObj.getHours();
  let minutes: number | string = dateObj.getMinutes();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const year = dateObj.getFullYear().toString().slice(-2);

  return view === "date"
    ? `${day}-${month}-${year}`
    : view === "hour"
      ? `${hours}:${minutes}`
      : `${day}-${month}-${year} à ${hours}:${minutes}`;
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const genererUIDProduit = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const randomDigits = Math.floor(Math.random() * 900) + 100;
  const uid = `${randomDigits}-${year.slice(2)}${month}${day}`;

  return uid;
};
