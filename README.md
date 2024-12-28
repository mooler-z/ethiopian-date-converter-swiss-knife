# Zemen 📅 by Bytepulse Technologies

A lightweight and efficient Ethiopian calendar conversion library for JavaScript/TypeScript. Convert dates between Ethiopian (የኢትዮጵያ አቆጣጠር) and Gregorian calendars with ease.

## Features

- 🚀 Simple and intuitive API
- 💪 Written in TypeScript
- 🎯 Minimal dependencies
- ✅ Fully tested
- 📦 Small bundle size
- 🌍 Supports both browser and Node.js environments

## Installation

```bash
npm install zemen
```

## or

```bash
yarn add zemen
```

## or

```bash
pnpm add zemen
```

## Usage

```typescript
import EthiopianCalendar from 'zemen';

const calendar = new EthiopianCalendar();

// Convert Gregorian to Ethiopian
// Using array format
const gregorianDate = [2024, 12, 28];
const ethiopianDate = calendar.toEthiopian(gregorianDate);

// Using date picker string format
const ethiopianDate2 = calendar.toEthiopian('2024-12-28');

// Using individual parameters
const ethiopianDate3 = calendar.toEthiopian(2024, 12, 28);

console.log(ethiopianDate);
/* Output:
{
  dmy: '19-4-2017',
  mdy: '4-19-2017',
  ymd: '2017-4-19',
  ymdArr: [2017, 4, 19],
  amDate: 'ቅዳሜ, 19 ታህሳስ 2017',
  tigDate: 'ቀዳም, 19 ታሕሳስ 2017',
  orDate: 'Sanbata, 19 Muddee 2017',
  dateObject: 2017-04-19T00:00:00.000Z
}
*/

// Convert Ethiopian to Gregorian
// Using array format
const ethDate = [1964, 1, 1];
const gregDate = calendar.toGregorian(ethDate);

// Using date picker string format
const gregDate2 = calendar.toGregorian('1964-01-01');

// Using individual parameters
const gregDate3 = calendar.toGregorian(1964, 1, 1);

console.log(gregDate);
/* Output remains the same */
```

## API Reference

### `toEthiopian(date: [number, number, number] | string | number, month?: number, day?: number): EthiopianDateResult`
Converts a Gregorian date to Ethiopian calendar date. Accepts:
- Array format: `[year, month, day]`
- Date picker string format: `'YYYY-MM-DD'`
- Individual parameters: `(year, month, day)`

### `toGregorian(date: [number, number, number] | string | number, month?: number, day?: number): GregorianDateResult`
Converts an Ethiopian calendar date to Gregorian date. Accepts:
- Array format: `[year, month, day]`
- Date picker string format: `'YYYY-MM-DD'`
- Individual parameters: `(year, month, day)`

## Why Zemen?

"Zemen" (ዘመን) means "time" or "era" in Amharic. This library aims to make Ethiopian calendar conversions simple and accessible for developers working with dates in Ethiopian context.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this library helpful, please consider giving it a star ⭐️ on GitHub!

## Author

[Mooler](https://github.com/mooler-z)

---

Made with ❤️ for the Ethiopian developer community
# zemen
