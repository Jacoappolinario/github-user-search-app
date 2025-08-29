export default class ProfileRenderer {
  constructor(
    headerSearchForm,
    headerSearchInput,
    headerSearchError,
    allElementsDataFields,
    defaultMessages,
    modifierClasses,
    GITHUB_API_BASE_URL
  ) {
    this.headerSearchForm = document.querySelector(headerSearchForm);
    this.headerSearchInput = document.querySelector(headerSearchInput);
    this.headerSearchError = document.querySelector(headerSearchError);
    this.allElementsDataFields = document.querySelectorAll(
      allElementsDataFields
    );

    this.defaultMessages = defaultMessages || {
      NOT_AVAILABLE: "Not Available",
      NO_BIO: "This profile has no bio",
    };

    this.GITHUB_API_BASE_URL = GITHUB_API_BASE_URL;

    this.modifierClasses = { ...modifierClasses };

    this.handleUserSearch = this.handleUserSearch.bind(this);
  }

  formatDateString(dateString) {
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

  usernameWithAt(value) {
    return `@${value.toLowerCase()}`;
  }

  withDefaultValue(value, defaultText) {
    return !value && value !== 0 ? defaultText : value;
  }

  normalizeUserData(data) {
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

  hasValidValue(value) {
    return (
      value &&
      ![
        this.defaultMessages.NOT_AVAILABLE,
        this.defaultMessages.NO_BIO,
      ].includes(value)
    );
  }

  setElementValue(element, value) {
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

  renderProfile(data) {
    this.allElementsDataFields.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove(this.modifierClasses.NOT_AVAILABLE);

      if (this.hasValidValue(value)) {
        this.setElementValue(element, value);
      } else {
        parentClassList.add(this.modifierClasses.NOT_AVAILABLE);
        element.innerText = value;
      }
    });
  }

  async loadUserProfile(username) {
    this.headerSearchError.classList.remove(this.modifierClasses.VISIBLE);

    try {
      const response = await fetch(`${this.GITHUB_API_BASE_URL}/${username}`);

      if (!response.ok) {
        this.headerSearchError.classList.add(this.modifierClasses.VISIBLE);
        return;
      }

      let data = await response.json();
      data = this.normalizeUserData(data);

      this.renderProfile(data);
    } catch (error) {
      console.error(`Error searching for user on Github ${error}`);

      this.headerSearchError.classList.add(this.modifierClasses.VISIBLE);
    }
  }

  handleUserSearch(event) {
    event.preventDefault();
    const username = this.headerSearchInput.value.trim();
    if (username) this.loadUserProfile(username);
  }

  addSubmitEvent() {
    this.headerSearchForm.addEventListener("submit", this.handleUserSearch);
  }

  init() {
    if (
      this.headerSearchForm &&
      this.headerSearchInput &&
      this.headerSearchError &&
      this.allElementsDataFields
    ) {
      this.addSubmitEvent();
    } else {
      console.warn("ProfileRenderer: elementos obrigatórios não encontrados.");
    }

    return this;
  }
}
