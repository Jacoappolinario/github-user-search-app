export default function initDarkMode() {
  const DARK_MODE_CLASS = "dark-mode";
  const DARK_MODE_ITEM = "darkMode";
  const DARK_MODE_STATUS = "active";
  const DARK_MODE_DISABLED_STATUS = "null";

  let darkMode = localStorage.getItem(DARK_MODE_ITEM);
  const themeToggle = document.querySelector(".header__theme-toggle");

  function setDarkModeStatus(status) {
    localStorage.setItem(DARK_MODE_ITEM, status);
  }

  function enableDarkMode() {
    document.body.classList.add(DARK_MODE_CLASS);
    setDarkModeStatus(DARK_MODE_STATUS);
  }

  function disableDarkMode() {
    document.body.classList.remove(DARK_MODE_CLASS);
    setDarkModeStatus(DARK_MODE_DISABLED_STATUS);
  }

  function isDarkModeEnabled() {
    return darkMode === DARK_MODE_STATUS;
  }

  function toggleDarkMode() {
    if (isDarkModeEnabled()) {
      disableDarkMode();
      darkMode = DARK_MODE_DISABLED_STATUS;
    } else {
      enableDarkMode();
      darkMode = DARK_MODE_STATUS;
    }
  }

  if (isDarkModeEnabled()) enableDarkMode();

  themeToggle.addEventListener("click", toggleDarkMode);
}
