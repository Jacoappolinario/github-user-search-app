export function formatDateString(dateString) {
  if (!dateString || isNaN(new Date(dateString))) {
    return this.defaultMessages.NOT_AVAILABLE;
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

  return `Joined ${day} ${month} ${year}`;
}

export function usernameWithAt(value) {
  return `@${value.toLowerCase()}`;
}

export function withDefaultValue(value, defaultText) {
  return !value && value !== 0 ? defaultText : value;
}

export function formatUserData(data) {
  const formatKey = {
    created_at: (value) => this.formatDateString(value),
    bio: (value) => this.withDefaultValue(value, this.defaultMessages.NO_BIO),
    twitter_username: (value) =>
      value ? this.usernameWithAt(value) : this.defaultMessages.NOT_AVAILABLE,
    company: (value) =>
      value ? this.usernameWithAt(value) : this.defaultMessages.NOT_AVAILABLE,
  };

  if (data.login) data.username = this.usernameWithAt(data.login);

  for (const [key, value] of Object.entries(data)) {
    data[key] = formatKey[key]
      ? formatKey[key](value)
      : this.withDefaultValue(value, this.defaultMessages.NOT_AVAILABLE);
  }

  return data;
}
