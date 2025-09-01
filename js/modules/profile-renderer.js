import { getUser } from "./api-service.js";
import {
  formatDateString,
  usernameWithAt,
  withDefaultValue,
  hasValidValue,
} from "./utils.js";

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

    this.defaultMessages = defaultMessages || {
      NOT_AVAILABLE: "Not Available",
      NO_BIO: "This profile has no bio",
    };

    this.modifierClasses = { ...modifierClasses };

    this.handleUserSearch = this.handleUserSearch.bind(this);
  }

  normalizeUserData(data) {
    const formatKey = {
      created_at: (value) =>
        `Joined ${
          formatDateString(value, this.defaultMessages.NOT_AVAILABLE)
            .displayString
        }`,
      bio: (value) => withDefaultValue(value, this.defaultMessages.NO_BIO),
      twitter_username: (value) =>
        value ? usernameWithAt(value) : this.defaultMessages.NOT_AVAILABLE,
      company: (value) =>
        value ? usernameWithAt(value) : this.defaultMessages.NOT_AVAILABLE,
    };

    if (data.login) data.username = usernameWithAt(data.login);

    for (const [key, value] of Object.entries(data)) {
      data[key] = formatKey[key]
        ? formatKey[key](value)
        : withDefaultValue(value, this.defaultMessages.NOT_AVAILABLE);
    }

    return data;
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

      if (
        hasValidValue(value, [
          this.defaultMessages.NOT_AVAILABLE,
          this.defaultMessages.NO_BIO,
        ])
      ) {
        this.setElementValue(element, value);
      } else {
        parentClassList.add(this.modifierClasses.NOT_AVAILABLE);
        element.innerText = value;
      }
    });
  }

  async showUserProfile(username) {
    this.headerSearchError.classList.remove(this.modifierClasses.VISIBLE);

    try {
      let data = await getUser(username);
      data = this.normalizeUserData(data);
      this.renderProfile(data);
    } catch (error) {
      console.error(error);
      this.headerSearchError.classList.add(this.modifierClasses.VISIBLE);
    }
  }

  handleUserSearch(event) {
    event.preventDefault();
    const username = this.headerSearchInput.value.trim();
    if (username) this.showUserProfile(username);
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
