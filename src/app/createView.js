import { setClassToMain } from '../helpers/setClassToMain.js';
import '../component/movieCard.js';
import { clearNode } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
	// Search list
	const resultsContainer = document.querySelector('.search-results');
	const infoText = document.querySelector('.search-results__text');

	const searchContainer = document.querySelector(
		'.search-container__history'
	);

	// Form
	const searchForm = document.querySelector('.search-container');
	const searchInput = document.querySelector('.search-string__input');
	const main = document.querySelector('main');
	const searchTerms = [];

	// Renderers
	const renderList = (results) => {
		if (!results || results.length === 0) {
			clearNode(resultsContainer);
			return;
		}

		const list = document.createDocumentFragment();
		results.forEach((movieData) => {
			const movie = document.createElement('movie-card');

			movie.poster = movieData.poster;
			movie.title = movieData.title;
			movie.year = movieData.year;
			movie.link = movieData.link;

			list.appendChild(movie);
		});

		clearNode(resultsContainer);
		resultsContainer.appendChild(list);
	};

	const renderSearchList = () => {
		const list = document.createDocumentFragment();
		searchTerms.forEach((movie) => {
			const tag = document.createElement('button');
			tag.classList.add('search-container__button');
			tag.href = `/?search=${movie}`;
			tag.textContent = movie;

			list.appendChild(tag);

			if (searchTerms.length > 10) {
				searchTerms.pop();
			}
		});

		clearNode(searchContainer);
		searchContainer.appendChild(list);
	};

	const renderCount = (count) => {
		infoText.textContent = `Нашли ${count} ${dMovies(count)}`;
	};

	const renderError = (error) => {
		infoText.textContent = error;
	};

	// Events
	const onSearchSubmit = (_listener) => {
		const listener = (event) => {
			event.preventDefault();
			setClassToMain('search_live');
			const searchTerm = searchInput.value
				? searchInput.value
				: event.submitter.innerText;
			_listener(searchTerm);
			searchInput.value = '';
			searchTerms.unshift(searchTerm);
			renderSearchList();

			clearNode(resultsContainer);
			const spinnerTemplate = document.querySelector('#loaderTemplate');
			const spinner = spinnerTemplate.content.cloneNode(true);

			resultsContainer.appendChild(spinner);
		};

		searchForm.addEventListener('submit', listener);

		return () => searchForm.removeEventListener('submit', listener);
	};

	const setStatusListeners = () => {
		searchInput.addEventListener('click', () => {
			if (main.classList.contains('search')) {
				setClassToMain('search_active');
			}
		});

		window.addEventListener('scroll', () => {
			const height = window.pageYOffset;

			if (height > 239) {
				setClassToMain('scroll');
			} else {
				setClassToMain('search_live');
			}
		});
	};

	return {
		renderList,
		renderCount,
		renderError,
		renderSearchList,
		onSearchSubmit,
		setStatusListeners,
	};
};
