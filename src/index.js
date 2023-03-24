let searchRes = document.querySelector('.search-results');

function renderMovies(movie) {
    return `
      <div class="result-item">
        <img src="${movie.Poster}" class="result-item__poster">
        <div class="result-item__inf">
          <div class="result-item__inf__note">4.1</div>
          <div class="result-item__inf__name">${movie.Title}</div>
          <div class="result-item__inf__genre">${movie.Type}</div>
          <div class="result-item__inf__year">${movie.Year}</div>
        </div>
      </div>
    `;
}

const main = async () => {
    const response = await fetch('src/data.json');
    const data = await response.json();
    console.log(data.Search);

    const movies = data.Search.forEach(element => {
        searchRes.innerHTML += renderMovies(element);
    });

};
    
main();