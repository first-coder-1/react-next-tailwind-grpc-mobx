import { observer } from "mobx-react-lite";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  DayRange,
  CalendarDigit,
  Day as CalendarDay,
} from "react-modern-calendar-datepicker";
import { Typography } from "@mui/material";

import { useStore } from "stores/RootStore";

import styles from "./DateBlock.module.css";
import { useTranslations } from "next-intl";

const myCustomLocale = {
  // months list by order
  months: [
    "Januar",
    "Febreiro",
    "Março",
    "April",
    "Mai",
    "Juni",
    "Julho",
    "Augusto",
    "Setembro",
    "October",
    "Noviembre",
    "Dezembro",
  ],

  // week days by order
  weekDays: [
    {
      name: "Sunday", // used for accessibility
      short: "S", // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: "Monday",
      short: "T",
    },
    {
      name: "Tuesday",
      short: "Q",
    },
    {
      name: "Wednesday",
      short: "Q",
    },
    {
      name: "Thursday",
      short: "S",
    },
    {
      name: "Friday",
      short: "S",
    },
    {
      name: "Saturday",
      short: "D",
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject: CalendarDay): CalendarDay {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date: CalendarDay): Date {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date: CalendarDay): number {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit: CalendarDigit): CalendarDigit {
    return digit;
  },

  // texts in the date picker
  nextMonth: "Next Month",
  previousMonth: "Previous Month",
  openMonthSelector: "Open Month Selector",
  openYearSelector: "Open Year Selector",
  closeMonthSelector: "Close Month Selector",
  closeYearSelector: "Close Year Selector",
  defaultPlaceholder: "Select...",

  // for input range value
  from: "from",
  to: "to",

  // used for input value when multi dates are selected
  digitSeparator: ",",

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

const DateBlock = observer(() => {
  const {
    filtersStore: {
      filterSettings: { to, from },
      setDate,
    },
  } = useStore();
  const translations = useTranslations("filters");

  return (
    <div className="flex flex-col gap-2 px-[22px]">
      <Typography className="text-neutral-100 font-archivoRegular text-[14px] leading-[26px]">
        {translations("dateSelection")}
      </Typography>

      <Calendar
        calendarClassName={styles.calendar}
        value={{ to, from } as DayRange}
        onChange={setDate}
        shouldHighlightWeekends={false}
        calendarRangeBetweenClassName={styles.calendarRangeBetweenClassName}
        colorPrimary="#FF4A01"
        colorPrimaryLight="#404040"
        calendarRangeStartClassName={styles.calendarRangeStartEndClassName}
        calendarRangeEndClassName={styles.calendarRangeStartEndClassName}
        locale={myCustomLocale}
      />
    </div>
  );
});

export default DateBlock;
