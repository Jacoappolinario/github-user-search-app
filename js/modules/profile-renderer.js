import { formatUserData } from "./helpers.js";

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

    this.modifierClasses = { ...modifierClasses };

    this.GITHUB_API_BASE_URL = GITHUB_API_BASE_URL;

    this.triggerUserSearch = this.triggerUserSearch.bind(this);
  }

  isValid(value) {
    return (
      value &&
      ![
        this.defaultMessages.NOT_AVAILABLE,
        this.defaultMessages.NO_BIO,
      ].includes(value)
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
    this.allElementsDataFields.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove(this.modifierClasses.NOT_AVAILABLE);

      if (this.isValid(value)) {
        this.updateElementContent(element, value);
      } else {
        parentClassList.add(this.modifierClasses.NOT_AVAILABLE);
        element.innerText = value;
      }
    });
  }

  async fetchGithubUser(username) {
    this.headerSearchError.classList.remove(this.modifierClasses.VISIBLE);

    try {
      const response = await fetch(`${this.GITHUB_API_BASE_URL}/${username}`);

      if (!response.ok) {
        this.headerSearchError.classList.add(this.modifierClasses.VISIBLE);
        return;
      }

      let data = await response.json();
      console.log("🚀 ~ ProfileRenderer ~ fetchGithubUser ~ data:", data);
      data = formatUserData(data);

      this.fillLayout(data);
    } catch (error) {
      console.error(`Error searching for user on Github ${error}`);

      this.headerSearchError.classList.add(this.modifierClasses.VISIBLE);
    }
  }

  triggerUserSearch(event) {
    event.preventDefault();
    const username = this.headerSearchInput.value.trim();
    if (username) this.fetchGithubUser(username);
  }

  addSubmitEvent() {
    this.headerSearchForm.addEventListener("submit", this.triggerUserSearch);
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
