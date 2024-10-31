// Dark Mode
let darkmode = localStorage.getItem("darkmode");
const themeToggle = document.querySelector(".header__theme-toggle");

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
}

function disableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null");
}

if (darkmode === "active") enableDarkmode();

themeToggle.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Github User Search
const searchInput = document.querySelector(".search__input");
const searchSubmit = document.querySelector(".search__submit");
const searchError = document.querySelector(".search__error");
const elements = document.querySelectorAll("[data-field]");

function formatDate(dateString) {
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
  return value || defaultText;
}

function formatUserData(data) {
  return {
    ...data,
    username: usernameWithAt(data.login),
    created_at: formatDate(data.created_at),
    bio: "This profile has no bio",
    location: defaultMessage(data.location, "Not Available"),
    blog: defaultMessage(data.blog, "Not Available"),
    twitter_username: defaultMessage(data.twitter_username, "Not Available"),
    company: defaultMessage(data.company, "Not Available"),
  };
}

function fillLayout(formattedData) {
  elements.forEach((element) => {
    const fieldName = element.dataset.field;
    const value = formattedData[fieldName];

    if (element.tagName === "IMG") {
      element.src = value;
      element.onerror = () => {
        element.src = "./assets/avatar-img.jpg";
      };
    } else {
      const isNotAvailable =
        value === "Not Available" || value === "This profile has no bio";

      element.innerText = value;

      if (isNotAvailable) {
        element.parentElement.classList.add(
          "profile-card__item--not-available"
        );
      }
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

    const data = await response.json();
    const formattedData = formatUserData(data);

    fillLayout(formattedData);
  } catch (error) {
    console.error(`Error searching for user on Github ${error}`);

    searchError.classList.remove("active");
  }
}

function handleClick(event) {
  event.preventDefault();
  const username = searchInput.value;
  fetchGithubUser(username);
}

searchSubmit.addEventListener("click", handleClick);
