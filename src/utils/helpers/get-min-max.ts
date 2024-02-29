import { numberWithCommas } from "./number-with-commas";

export const getMinMax = (data: any[], prop: string, get?: "min" | "max" | null, format?: boolean) => {
  let min = data.reduce((min, p) => (p[prop] < min ? p[prop] : min), data[0][prop]);
  let max = data.reduce((max, p) => (p[prop] > max ? p[prop] : max), data[0][prop]);

  if (format) {
    min = numberWithCommas(min);
    max = numberWithCommas(max);
  }

  return get === "min" ? min : get === "max" ? max : !get && `${min} - ${max}`;
};
