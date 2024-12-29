function quotient(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error("Divisor cannot be zero.");
  }
  return Math.floor(dividend / divisor);
}

function mod(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error("Division by zero is not allowed");
  }

  return dividend - quotient(dividend, divisor) * divisor;
}

export function gregorianToJDN(
  year: number,
  month: number,
  day: number,
): number {
  let s =
    quotient(year, 4) -
    quotient(year - 1, 4) -
    quotient(year, 100) +
    quotient(year - 1, 100) +
    quotient(year, 400) -
    quotient(year - 1, 400);
  let t = quotient(14 - month, 12);

  let n =
    31 * t * (month - 1) +
    (1 - t) * (59 + s + 30 * (month - 3) + quotient(3 * month - 7, 5)) +
    day -
    1;
  let j =
    1721426 +
    365 * (year - 1) +
    quotient(year - 1, 4) -
    quotient(year - 1, 100) +
    quotient(year - 1, 400) +
    n;
  return j;
}

export function jdnToEthiopic(jdn: number) {
  const r = mod(jdn - 1723856, 1461);
  const n = mod(r, 365) + 365 * quotient(r, 1460);

  const year = Math.floor(
    4 * quotient(jdn - 1723856, 1461) + quotient(r, 365) - quotient(r, 1460),
  );
  const month = Math.floor(quotient(n, 30)) + 1;
  const day = Math.floor(mod(n, 30)) + 1;

  return [year, month, day];
}

