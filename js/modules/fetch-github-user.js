export default function initFetchGithubUser() {
  const searchForm = document.querySelector(".search__form");
  const searchInput = document.querySelector(".search__input");
  const searchError = document.querySelector(".search__error");
  const elements = document.querySelectorAll("[data-field]");

  const DEFAULT_MESSAGES = {
    NOT_AVAILABLE: "Not Available",
    NO_BIO: "This profile has no bio",
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
      bio: (value) => defaultMessage(value, DEFAULT_MESSAGES.NO_BIO),
      twitter_username: (value) =>
        value ? usernameWithAt(value) : DEFAULT_MESSAGES.NOT_AVAILABLE,
      company: (value) =>
        value ? usernameWithAt(value) : DEFAULT_MESSAGES.NOT_AVAILABLE,
    };

    if (data.login) data.username = usernameWithAt(data.login);

    for (const [key, value] of Object.entries(data)) {
      data[key] = formatKey[key]
        ? formatKey[key](value)
        : defaultMessage(value, DEFAULT_MESSAGES.NOT_AVAILABLE);
    }

    return data;
  }

  function isValid(value) {
    return (
      value &&
      ![DEFAULT_MESSAGES.NOT_AVAILABLE, DEFAULT_MESSAGES.NO_BIO].includes(value)
    );
  }

  function updateElementContent(element, value) {
    const actions = {
      img: () => {
        element.src = value;
        element.onerror = () => {
          element.src = "./assets/avatar-img.jpg";
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
    elements.forEach((element) => {
      const fieldName = element.dataset.field;
      const value = data[fieldName];
      const parentClassList = element.parentElement.classList;

      parentClassList.remove("not-available");

      if (isValid(value)) {
        updateElementContent(element, value);
      } else {
        parentClassList.add("not-available");
        element.innerText = value;
      }
    });
  }

  async function fetchGithubUser(username) {
    searchError.classList.remove("active");
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        searchError.classList.add("active");
        return;
      }

      let data = await response.json();
      data = formatUserData(data);

      fillLayout(data);
    } catch (error) {
      console.error(`Error searching for user on Github ${error}`);

      searchError.classList.remove("active");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const username = searchInput.value;
    fetchGithubUser(username);
  }

  searchForm.addEventListener("submit", handleSubmit);
}