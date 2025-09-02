import { DEFAULT_MESSAGES, MODIFIER_CLASSES } from "./constants.js";
import { getUser } from "./api-service.js";
import {
  usernameWithAt,
  getWithDefault,
  isValidValue,
  getFieldFormatters,
  updateElement,
} from "./utils.js";

export default class ProfileRenderer {
  constructor(
    headerSearchForm,
    headerSearchInput,
    headerSearchError,
    allElementsDataFields
  ) {
    this.headerSearchForm = document.querySelector(headerSearchForm);
    this.headerSearchInput = document.querySelector(headerSearchInput);
    this.headerSearchError = document.querySelector(headerSearchError);
    this.allElementsDataFields = document.querySelectorAll(
      allElementsDataFields
    );

    this.defaultMessages = DEFAULT_MESSAGES;

    this.modifierClasses = MODIFIER_CLASSES;

    this.handleUserSearch = this.handleUserSearch.bind(this);
  }

  normalizeUserData(data) {
    const formatKey = getFieldFormatters(this.defaultMessages);

    if (data.login) data.username = usernameWithAt(data.login);

    for (const [key, value] of Object.entries(data)) {
      data[key] = formatKey[key]
        ? formatKey[key](value)
        : getWithDefault(value, this.defaultMessages.NOT_AVAILABLE);
    }

    return data;
  }

  renderProfile(data) {
    this.allElementsDataFields.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove(this.modifierClasses.NOT_AVAILABLE);

      if (isValidValue(value, this.defaultMessages)) {
        updateElement(element, value);
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
