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

export function getWithDefault(value, defaultText) {
  return !value && value !== 0 ? defaultText : value;
}

export function isValidValue(value, defaultMessages) {
  return (
    value &&
    ![defaultMessages.NOT_AVAILABLE, defaultMessages.NO_BIO].includes(value)
  );
}

export const getFieldFormatters = (defaultMessages) => ({
  created_at: (value) =>
    `Joined ${
      formatDateString(value, defaultMessages.NOT_AVAILABLE).displayString
    }`,
  bio: (value) => getWithDefault(value, defaultMessages.NO_BIO),
  twitter_username: (value) =>
    value ? usernameWithAt(value) : defaultMessages.NOT_AVAILABLE,
  company: (value) =>
    value ? usernameWithAt(value) : defaultMessages.NOT_AVAILABLE,
});

export function updateElement(
  element,
  value,
  fallbackImg = "./assets/avatar-img.png"
) {
  const actions = {
    img: () => {
      element.src = value;
      element.onerror = () => {
        element.src = fallbackImg;
      };
    },
    a: () => {
      element.setAttribute("href", value);
      element.innerText = value;
    },
    default: () => {
      element.innerText = value;
    },
  };

  (actions[element.tagName.toLowerCase()] || actions.default)();
}
