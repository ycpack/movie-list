const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("search-btn");
const apiKey = "551e574a";
const watchList = [];
let moviesInfo = [];
let searchResult = [];

document.addEventListener("click", async (event) => {
    // document.getElementById('add-image').disabled = true
  if (event.target.id === "search-btn") {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieInput.value}`
    );
    const result = await response.json();
    searchResult = result.Search;
    getMovieInfo();
  } else if (event.target.parentElement.id === "add-to-watchlist") {
    addToWatchList(event.target.parentElement.parentElement.id);
  }
});

async function getMovieInfo() {
  moviesInfo = [];
  for (const movie of searchResult) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
    );
    const data = await response.json();
    moviesInfo.push(data);
  }
  render();
}

function renderMovies(array) {
  return array
    .map((movie) => {
      const { imdbID, Poster, Title, Ratings, Runtime, Genre, Plot } = movie;
      return `
      <div class="movie" id="${imdbID}">
        <img class="movie-poster" src="${Poster}" alt="Movie Poster"/>
        <div class="movie-title">
            <h3 class="movie-title">${Title}</h3>
            <p class="movie-rating">${Ratings[0].Value.slice(0, 3)} ⭐️</p>
        </div>
        <p class="movie-runtime">${Runtime}</p>
        <p class="movie-genre">${Genre}</p>
        <div class="movie-wishlist" id="add-to-watchlist">
                <img src="add.png"/>
                <p>Watchlist</p>
        </div>
        <p class="movie-about">${Plot}</p>
    </div>`;
    })
    // .join(" ");
}

function addToWatchList(id) {
  if (!watchList.some((movie) => movie.imdbID === id)) {
    const filteredMovies = moviesInfo.filter((movie) => movie.imdbID == id);

    if (filteredMovies.length > 0) {
      watchList.push(filteredMovies[0]);
    }
  }
  localStorage.clear();
  localStorage.setItem("watchList", JSON.stringify(watchList));
}


function render() {
  document.getElementById("movie-list").innerHTML =
    renderMovies(moviesInfo);
}