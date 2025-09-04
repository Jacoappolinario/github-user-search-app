import ProfileRenderer from "./modules/profile-renderer.js";
import DarkModeManager from "./modules/dark-mode-manager.js";

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

const darkModeManager = new DarkModeManager({
  toggleSelector: ".header__theme-toggle",
});

darkModeManager.init();
