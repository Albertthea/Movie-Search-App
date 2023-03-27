import { mapMovie } from './helpers/mapMovie.js';
import './component/movieCard.js';


let ResItemTemplate = document.querySelector('.result-item');

function renderMovies(movieData) {
    const movie = document.createElement('movie-card');

    movie.poster = movieData.poster;
    movie.title = movieData.title;
    movie.year = movieData.year;
    movie.link = movieData.link;
    movie.note = movieData.note;
    movie.genre = movieData.genre;
  
    return movie;
}

let searchRes = document.querySelector('.search-results');

const main = async () => {
    const response = await fetch('src/data.json');
    const data = await response.json();
    const movies = data.Search.map((movie) => mapMovie(movie));
  
    const fragment = document.createDocumentFragment();
  
    movies.forEach((movie) => {
        const m = renderMovies(movie);
        fragment.appendChild(m);
    });
  
    searchRes.appendChild(fragment);
};
  
main();
