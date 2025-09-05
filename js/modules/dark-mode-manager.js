export default class DarkModeManager {
  constructor({
    toggleSelector,
    darkModeClass = "dark-mode",
    storageKey = "theme",
  }) {
    this.toggleButton = document.querySelector(toggleSelector);
    this.darkModeClass = darkModeClass;
    this.storageKey = storageKey;

    this.ENABLED = "enabled";
    this.DISABLED = "disabled";

    this.themeStatus = localStorage.getItem(storageKey);

    if (this.isDarkModeActive()) this.applyDarkMode();

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  saveThemeStatus(status) {
    localStorage.setItem(this.storageKey, status);
  }

  applyDarkMode() {
    document.body.classList.add(this.darkModeClass);
    this.saveThemeStatus(this.ENABLED);
  }

  removeDarkMode() {
    document.body.classList.remove(this.darkModeClass);
    this.saveThemeStatus(this.DISABLED);
  }

  isDarkModeActive() {
    return this.themeStatus === this.ENABLED;
  }

  toggleDarkMode() {
    if (this.isDarkModeActive()) {
      this.removeDarkMode();
      this.themeStatus = this.DISABLED;
    } else {
      this.applyDarkMode();
      this.themeStatus = this.ENABLED;
    }
  }

  addDarkModeToggleEvent() {
    this.toggleButton.addEventListener("click", this.toggleDarkMode);
  }

  init() {
    if (this.toggleButton) {
      this.addDarkModeToggleEvent();
    } else {
      console.warn("DarkModeManager: botão de toggle não encontrado.");
    }
  }
}
