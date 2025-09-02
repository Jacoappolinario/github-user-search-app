import initDarkMode from "./modules/dark-mode.js";
import ProfileRenderer from "./modules/profile-renderer.js";

const profileRenderer = new ProfileRenderer(
  ".header__search-form",
  ".header__search-input",
  ".header__search-error",
  "[data-field]"
);

profileRenderer.init();

initDarkMode();
