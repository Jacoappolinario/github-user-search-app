export default class ProfileRenderer {
  constructor(
    headerSearchForm,
    headerSearchInput,
    headerSearchError,
    allElementsDataFields,
    defaultMessages,
    modifierClasses
  ) {
    this.headerSearchForm = document.querySelector(headerSearchForm);
    this.headerSearchInput = document.querySelector(headerSearchInput);
    this.headerSearchError = document.querySelector(headerSearchError);
    this.allElementsDataFields = document.querySelectorAll(
      allElementsDataFields
    );
    this.defaultMessages = { ...defaultMessages };
    this.modifierClasses = { ...modifierClasses };
  }

  formatDateString(dateString) {
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

  usernameWithAt(value) {
    return `@${value.toLowerCase()}`;
  }

  defaultMessage(value, defaultText) {
    return !value && value !== 0 ? defaultText : value;
  }

  formatUserData(data) {
    const formatKey = {
      created_at: (value) => formatDateString(value),
      bio: (value) => defaultMessage(value, defaultMessages.NO_BIO),
      twitter_username: (value) =>
        value ? usernameWithAt(value) : defaultMessages.NOT_AVAILABLE,
      company: (value) =>
        value ? usernameWithAt(value) : defaultMessages.NOT_AVAILABLE,
    };

    if (data.login) data.username = usernameWithAt(data.login);

    for (const [key, value] of Object.entries(data)) {
      data[key] = formatKey[key]
        ? formatKey[key](value)
        : defaultMessage(value, defaultMessages.NOT_AVAILABLE);
    }

    return data;
  }

  isValid(value) {
    return (
      value &&
      ![defaultMessages.NOT_AVAILABLE, defaultMessages.NO_BIO].includes(value)
    );
  }

  updateElementContent(element, value) {
    const actions = {
      img: () => {
        element.src = value;
        element.onerror = () => {
          element.src = "./assets/avatar-img.png";
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

  fillLayout(data) {
    allElementsDataFields.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove(modifierClasses.NOT_AVAILABLE);

      if (isValid(value)) {
        updateElementContent(element, value);
      } else {
        parentClassList.add(modifierClasses.NOT_AVAILABLE);
        element.innerText = value;
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = headerSearchInput.value;
    fetchGithubUser(username);
  }

  //headerSearchForm.addEventListener("submit", handleSubmit);
}
