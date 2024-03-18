let watchList = JSON.parse(localStorage.getItem("watchList"));

if (watchList.length === 0) {
  watchList = [];
}
document.addEventListener("click", (event) => {
  if (event.target.parentElement.id === "remove-from-watchlist") {
    console.log(event.target.parentElement.parentElement.id);
    removeFromWatchList(event.target.parentElement.parentElement.id);
  }
});

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
          <div class="movie-wishlist" id="remove-from-watchlist">
                  <img src="remove.png"/>
                  <p>Watchlist</p>
          </div>
          <p class="movie-about">${Plot}</p>
      </div>`;
    })
    .join(" ");
}

function removeFromWatchList(id) {
  watchList = watchList.filter((movie) => {
    return !(movie.imdbID === id);
  });
  localStorage.clear();
  localStorage.setItem("watchList", JSON.stringify(watchList));
  render();
}

function render() {
  document.getElementById("watchlist").innerHTML = renderMovies(watchList);
}

render();