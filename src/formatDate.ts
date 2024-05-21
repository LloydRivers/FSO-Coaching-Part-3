/*
If you are wondering how I formatted the options object, this mdn link will explain, including what the keys (like weekday: "short" mean):
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
*/

const formatDateOptions = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: 'GMT',
  };
  return now.toLocaleString('en-GB', options);
};

export default formatDateOptions;
