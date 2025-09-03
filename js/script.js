import initDarkMode from "./modules/dark-mode.js";
import ProfileRenderer from "./modules/profile-renderer.js";

const profileRenderer = new ProfileRenderer({
  headerSearchForm: ".header__search-form",
  headerSearchInput: ".header__search-input",
  headerSearchError: ".header__search-error",
  allElementsDataFields: "[data-field]",
  notAvailableClass: "profile-card--not-available",
  visibleClass: "header__search-error--visible",
  customMessages: {
    NOT_AVAILABLE: "Not Available",
    NO_BIO: "This profile has no bio",
  },
});

profileRenderer.init();

initDarkMode();
