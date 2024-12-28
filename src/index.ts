/**
 * Ethiopian Calendar Converter
 * A utility class for converting between Ethiopian and Gregorian calendar dates
 */

export class EthiopianCalendar {
  readonly weekDaysAmharic = ['እሁድ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'አርብ', 'ቅዳሜ'];
  readonly weekDaysTigrinya = [
    'ሰምበት',
    'ሰኑይ',
    'ሰሉስ',
    'ረቡዕ',
    'ሓሙስ',
    'ዓርቢ',
    'ቀዳም',
  ];
  readonly weekDaysOromo = ['Dilbata', 'Wiixata', 'Kibxata', 'Roobii', 'Kamisa', 'Jimaata', 'Sanbata'];

  readonly monthNamesAmharic = [
    'መስከረም',
    'ጥቅምት',
    'ህዳር',
    'ታህሳስ',
    'ጥር',
    'የካቲት',
    'መጋቢት',
    'ሚያዚያ',
    'ግንቦት',
    'ሰኔ',
    'ሐምሌ',
    'ነሐሴ',
    'ጳጉሜ',
  ];

  readonly monthNamesTigrinya = [
    'መስከረም',
    'ጥቅምት',
    'ሕዳር',
    'ታሕሳስ',
    'ጥሪ',
    'ለካቲት',
    'መጋቢት',
    'ሚያዝያ',
    'ግንቦት',
    'ሰነ',
    'ሓምለ',
    'ነሓሰ',
    'ጳጉሜ',
  ];

  readonly monthNamesOromo = [
    'Fuulbana',
    'Onkololeessa',
    'Sadaasa',
    'Muddee',
    'Amajjii',
    'Guraandhala',
    'Bitooteessa',
    'Elba',
    'Caamsa',
    'Waxabajjii',
    'Adooleessa',
    'Hagayya',
    'Pagume',
  ];

  /**
   * Calculates the starting day of the Ethiopian year
   * @param year Ethiopian year
   * @returns Starting day number
   */
  private startDayOfEthiopian(year: number): number {
    const newYearDay = Math.floor(year / 100) - Math.floor(year / 400) - 4;
    return ((year - 1) % 4) === 3 ? newYearDay + 1 : newYearDay;
  }

  /**
   * Helper method to parse different input formats
   * @param input Date input in various formats (array, individual numbers, or YYYY-MM-DD string)
   * @param month Optional month parameter
   * @param date Optional day parameter
   * @returns Array of [year, month, day]
   */
  private parseInputDate(input: number[] | number | string, month?: number, date?: number): number[] {
    if (typeof input === 'string') {
      // Handle YYYY-MM-DD format
      const [year, month, day] = input.split('-').map(num => parseInt(num, 10));
      return [year, month, day];
    } else if (Array.isArray(input)) {
      return input;
    } else {
      return [input, month!, date!];
    }
  }

  /**
   * Converts Ethiopian calendar date to Gregorian calendar date
   * @param dateArray Either an array of [year, month, day] or individual year parameter
   * @param month Optional month parameter when not using array input
   * @param date Optional day parameter when not using array input
   * @returns Tuple of [year, month, day] in Gregorian calendar
   */
  public toGregorian(dateArray: number[] | number | string, month?: number, date?: number) {
    const inputs = this.parseInputDate(dateArray, month, date);

    if (inputs.includes(0) || inputs.some(x => isNaN(x)) || inputs.length !== 3) {
      throw new Error("Malformed input can't be converted.");
    }

    const [year, ethiopianMonth, ethiopianDate] = inputs;

    const newYearDay = this.startDayOfEthiopian(year);
    let gregorianYear = year + 7;

    const gregorianMonths = [0, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];

    const nextYear = gregorianYear + 1;
    if ((nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0) {
      gregorianMonths[6] = 29;
    }

    let until = (ethiopianMonth - 1) * 30 + ethiopianDate;
    if (until <= 37 && year <= 1575) {
      until += 28;
      gregorianMonths[0] = 31;
    } else {
      until += newYearDay - 1;
    }

    if ((year - 1) % 4 === 3) {
      until += 1;
    }

    let m = 0;
    let gregorianDate: number = 0;

    for (let i = 0; i < gregorianMonths.length; i++) {
      if (until <= gregorianMonths[i]) {
        m = i;
        gregorianDate = year % 4 === 0 ? until - 1 : until ;
        break;
      } else {
        m = i;
        until -= gregorianMonths[i];
      }
    }

    if (m > 4) {
      gregorianYear += 1;
    }

    const order = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const gregorianMonth = order[m];

    // Create date object from converted date
    const dateObject = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDate));
    
    // Format dates with dash separator
    const dmy = `${gregorianDate}-${gregorianMonth}-${gregorianYear}`;
    const mdy = `${gregorianMonth}-${gregorianDate}-${gregorianYear}`;
    const ymd = `${gregorianYear}-${gregorianMonth}-${gregorianDate}`;
    
    // Format with month names
    const formattedGc = `${gregorianDate} ${dateObject.toLocaleString('default', { month: 'long' })} ${gregorianYear}`;

    return {
      dmy,
      mdy, 
      ymd,
      ymdArr: [gregorianYear, gregorianMonth, gregorianDate],
      formattedGc,
      dateObject
    };
  }

  /**
   * Converts Gregorian calendar date to Ethiopian calendar date
   * @param dateArray Either an array of [year, month, day] or individual year parameter
   * @param month Optional month parameter when not using array input
   * @param date Optional day parameter when not using array input
   * @returns Tuple of [year, month, day] in Ethiopian calendar
   */
  public toEthiopian(dateArray: number[] | number | string, month?: number, date?: number) {
    const inputs = this.parseInputDate(dateArray, month, date);

    if (inputs.includes(0) || inputs.some(x => isNaN(x)) || inputs.length !== 3) {
      throw new Error("Malformed input can't be converted.");
    }

    const [year, gregorianMonth, gregorianDate] = inputs;

    if (gregorianMonth === 10 && gregorianDate >= 5 && gregorianDate <= 14 && year === 1582) {
      throw new Error('Invalid Date between 5-14 May 1582.');
    }

    const gregorianMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const ethiopianMonths = [0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5, 30, 30, 30, 30];

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      gregorianMonths[2] = 29;
    }

    let ethiopianYear = year - 8;

    if (ethiopianYear % 4 === 3) {
      ethiopianMonths[10] = 6;
    }

    const newYearDay = this.startDayOfEthiopian(year - 8);

    let until = 0;
    for (let i = 1; i < gregorianMonth; i++) {
      until += gregorianMonths[i];
    }
    until += gregorianDate;

    let tahissas = ethiopianYear % 4 === 0 ? 26 : 25;

    if (year < 1582) {
      ethiopianMonths[1] = 0;
      ethiopianMonths[2] = tahissas;
    } else if (until <= 277 && year === 1582) {
      ethiopianMonths[1] = 0;
      ethiopianMonths[2] = tahissas;
    } else {
      tahissas = newYearDay - 3;
      ethiopianMonths[1] = tahissas;
    }

    let m: number;
    let ethiopianDate: number = 0;

    for (m = 1; m < ethiopianMonths.length; m++) {
      if (until <= ethiopianMonths[m]) {
        ethiopianDate = (m === 1 || ethiopianMonths[m] === 0) ?
          until + (30 - tahissas) : until;
        break;
      } else {
        until -= ethiopianMonths[m];
      }
    }

    if (m > 10) {
      ethiopianYear += 1;
    }

    const order = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4];
    const ethiopianMonth = order[m!];

    // Create date object from input date
    const dateObject = new Date(Date.UTC(inputs[0], inputs[1] - 1, inputs[2]));
    
    // Format dates with dash separator
    const dmy = `${ethiopianDate}-${ethiopianMonth}-${ethiopianYear}`;
    const mdy = `${ethiopianMonth}-${ethiopianDate}-${ethiopianYear}`;
    const ymd = `${ethiopianYear}-${ethiopianMonth}-${ethiopianDate}`;

    // Get weekday index
    const weekdayIndex = dateObject.getDay();
    
    // Format dates with month names in different languages
    const amDate = `${this.weekDaysAmharic[weekdayIndex]}, ${ethiopianDate} ${this.monthNamesAmharic[ethiopianMonth - 1]} ${ethiopianYear}`;
    const tigDate = `${this.weekDaysTigrinya[weekdayIndex]}, ${ethiopianDate} ${this.monthNamesTigrinya[ethiopianMonth - 1]} ${ethiopianYear}`;
    const orDate = `${this.weekDaysOromo[weekdayIndex]}, ${ethiopianDate} ${this.monthNamesOromo[ethiopianMonth - 1]} ${ethiopianYear}`;

    return {
      dmy,
      mdy,
      ymd,
      ymdArr: [ethiopianYear, ethiopianMonth, ethiopianDate],
      amDate,
      tigDate, 
      orDate,
      dateObject: new Date(Date.UTC(ethiopianYear, ethiopianMonth - 1, ethiopianDate))
    };
  }
}

export default EthiopianCalendar;
