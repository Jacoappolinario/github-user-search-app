export function formatDateString(dateString, fallbackText) {
  if (!dateString || isNaN(new Date(dateString))) {
    return fallbackText;
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

export function getWithDefault(value, fallbackText) {
  return !value && value !== 0 ? fallbackText : value;
}

export function isValidValue(value, fallbackMessages) {
  return (
    value &&
    ![fallbackMessages.NOT_AVAILABLE, fallbackMessages.NO_BIO].includes(value)
  );
}

export const getFieldFormatters = (fallbackMessages) => ({
  created_at: (value) =>
    `Joined ${
      formatDateString(value, fallbackMessages.NOT_AVAILABLE).displayString
    }`,
  bio: (value) => getWithDefault(value, fallbackMessages.NO_BIO),
  twitter_username: (value) =>
    value ? usernameWithAt(value) : fallbackMessages.NOT_AVAILABLE,
  company: (value) =>
    value ? usernameWithAt(value) : fallbackMessages.NOT_AVAILABLE,
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
