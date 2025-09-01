export function formatDateString(dateString, fallbackMessage) {
  if (!dateString || isNaN(new Date(dateString))) {
    return fallbackMessage;
  }

  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return {
    day,
    month,
    year,
    isoString: `${day}-${month}-${year}`,
    displayString: `${day} ${month} ${year}`,
  };
}

export function usernameWithAt(value) {
  return `@${value.toLowerCase()}`;
}

export function withDefaultValue(value, defaultText) {
  return !value && value !== 0 ? defaultText : value;
}

export function hasValidValue(value, invalidValues = []) {
  return value && !invalidValues.includes(value);
}
