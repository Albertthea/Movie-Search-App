let searchRes = document.querySelector('.search-results');
let ResItemTemplate = document.querySelector('.template-item');

function renderMovies(movieData) {
    let cloneTemplate = ResItemTemplate.content.cloneNode(true);

    const poster = cloneTemplate.querySelector('.result-item__poster');
    const info = cloneTemplate.querySelector('.result-item__inf');
    const title = cloneTemplate.querySelector('.result-item__inf__name');
    const rating = cloneTemplate.querySelector('.result-item__inf__note');
    const genre = cloneTemplate.querySelector('.result-item__inf__genre');
    const year = cloneTemplate.querySelector('.result-item__inf__year');

    title.innerText = movieData.Title;
    poster.src = movieData.Poster;
    genre.innerText = movieData.Type;
    year.innerText = movieData.Year;
    rating.innerText = '4.3';

    return cloneTemplate;
}

const main = async () => {
    const response = await fetch('src/data.json');
    const data = await response.json();
    console.log(data.Search);

    const movies = data.Search.forEach(element => {
        let m = renderMovies(element);
        searchRes.appendChild(m);
    });

};
    
main();