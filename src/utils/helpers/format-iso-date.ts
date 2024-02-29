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
  const year = dateObj.getFullYear().toString(); // .slice(-2);

  return view === "date" ? `${day}-${month}-${year}` : view === "hour" ? `${hours}:${minutes}` : `${day}-${month}-${year} à ${hours}:${minutes}`;
}
