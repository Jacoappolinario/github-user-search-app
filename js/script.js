import initDarkMode from "./modules/dark-mode.js";
import ProfileRenderer from "./modules/profile-renderer.js";

const profileRenderer = new ProfileRenderer(
  ".header__search-form",
  ".header__search-input",
  ".header__search-error",
  "[data-field]",
  null,
  {
    NOT_AVAILABLE: "profile-card--not-available",
    VISIBLE: "header__search-error--visible",
  }
);

profileRenderer.init();

initDarkMode();
