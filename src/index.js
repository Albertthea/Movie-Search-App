import { mapMovie } from './helpers/mapMovie.js';
import './component/movieCard.js';
import { setClassToMain } from './helpers/setClassToMain.js';

const searchContainer = document.querySelector('.search-container');
const input = document.querySelector('.search-string__input');
const resultItems = document.querySelector('.search-results');

input.addEventListener('click', () => setClassToMain('search_active'));

window.addEventListener('scroll', () => {
	const height = window.pageYOffset;

	if (height > 239) {
		setClassToMain('scroll');
	} else {
		setClassToMain('search_live');
	}
});

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

const search = async (searchTerm) => {
	while (resultItems.firstChild) {
		resultItems.removeChild(resultItems.firstChild);
	}

	setClassToMain('search_live');

	const response = await fetch(
		`http://www.omdbapi.com/?apikey=40952606&type=movie&s=${searchTerm}`
	);
	const data = await response.json();

	if (!data.Search || data.Search.length === 0) {
		setClassToMain('search_not_found');
	} else {
        const movies = data.Search.map((movie) => mapMovie(movie));
		const fragment = document.createDocumentFragment();

		movies.forEach((movie) => {
			const m = renderMovies(movie);
			fragment.appendChild(m);
		});

		resultItems.appendChild(fragment);
	}
};

const subscribeToSubmit = () => {
	searchContainer.addEventListener('submit', (event) => {
		event.preventDefault();
		search(input.value);
	});
};

subscribeToSubmit();
