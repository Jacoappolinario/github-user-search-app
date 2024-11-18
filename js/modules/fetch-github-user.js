export default function initFetchGithubUser() {
  const headerSearchForm = document.querySelector(".header__search-form");
  const headerSearchInput = document.querySelector(".header__search-input");
  const headerSearchError = document.querySelector(".header__search-error");
  const allElementsDataFields = document.querySelectorAll("[data-field]");

  const GITHUB_API_BASE_URL = "https://api.github.com/users";

  const DefaultMessages = {
    NOT_AVAILABLE: "Not Available",
    NO_BIO: "This profile has no bio",
  };

  const ModifierClasses = {
    NOT_AVAILABLE: "profile-card--not-available",
    VISIBLE: "header__search-error--visible",
  };

  function formatDateString(dateString) {
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

  function usernameWithAt(value) {
    return `@${value.toLowerCase()}`;
  }

  function defaultMessage(value, defaultText) {
    return !value && value !== 0 ? defaultText : value;
  }

  function formatUserData(data) {
    const formatKey = {
      created_at: (value) => formatDateString(value),
      bio: (value) => defaultMessage(value, DefaultMessages.NO_BIO),
      twitter_username: (value) =>
        value ? usernameWithAt(value) : DefaultMessages.NOT_AVAILABLE,
      company: (value) =>
        value ? usernameWithAt(value) : DefaultMessages.NOT_AVAILABLE,
    };

    if (data.login) data.username = usernameWithAt(data.login);

    for (const [key, value] of Object.entries(data)) {
      data[key] = formatKey[key]
        ? formatKey[key](value)
        : defaultMessage(value, DefaultMessages.NOT_AVAILABLE);
    }

    return data;
  }

  function isValid(value) {
    return (
      value &&
      ![DefaultMessages.NOT_AVAILABLE, DefaultMessages.NO_BIO].includes(value)
    );
  }

  function updateElementContent(element, value) {
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

  function fillLayout(data) {
    allElementsDataFields.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove(ModifierClasses.NOT_AVAILABLE);

      if (isValid(value)) {
        updateElementContent(element, value);
      } else {
        parentClassList.add(ModifierClasses.NOT_AVAILABLE);
        element.innerText = value;
      }
    });
  }

  async function fetchGithubUser(username) {
    headerSearchError.classList.remove(ModifierClasses.VISIBLE);

    try {
      const response = await fetch(`${GITHUB_API_BASE_URL}/${username}`);

      if (!response.ok) {
        headerSearchError.classList.add(ModifierClasses.VISIBLE);
        return;
      }

      let data = await response.json();
      data = formatUserData(data);

      fillLayout(data);
    } catch (error) {
      console.error(`Error searching for user on Github ${error}`);

      headerSearchError.classList.add(ModifierClasses.VISIBLE);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const username = headerSearchInput.value;
    fetchGithubUser(username);
  }

  headerSearchForm.addEventListener("submit", handleSubmit);
}
