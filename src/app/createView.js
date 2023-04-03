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
	const searchStrContent = document.querySelector('.search-string__content');
	const searchInput = document.querySelector('.search-string__input');
	const main = document.querySelector('main');
	let searchTerms = [];

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
		searchTerms = new Set(searchTerms);

		if (searchTerms.length > 10) {
			searchTerms.pop();
		}

		searchTerms = Array.from(searchTerms);
		searchTerms.forEach((movie) => {
			const tag = document.createElement('a');
			tag.classList.add('search-container__button');
			tag.href = `/?search=${movie}`;
			tag.textContent = movie;
			tag.dataset.movie = movie;

			list.appendChild(tag);

			
		});

		clearNode(searchContainer);
		searchContainer.appendChild(list);
		
	};

	const renderCount = (count) => {
		if (count > 0) {
			infoText.textContent = `Нашли ${count} ${dMovies(count)}`;
		}
	};

	const renderError = (error) => {
		infoText.textContent = error;
		clearNode(resultsContainer);
	};

	// Events
	let secondSearchTerm;

	const onSearchSubmit = (_listener) => {
		const listener = (event) => {
			event.preventDefault();
			setClassToMain('search_live');
			const searchTerm = searchInput.value;
			// ? searchInput.value
			// : document.querySelector('.search-container__button').innerText;
			
			if (searchTerm !== secondSearchTerm) {
				_listener(searchTerm);
				searchInput.value = '';
				searchTerms.unshift(searchTerm);
				renderSearchList();

				clearNode(resultsContainer);
				const spinnerTemplate =
					document.querySelector('#loaderTemplate');
				const spinner = spinnerTemplate.content.cloneNode(true);

				resultsContainer.appendChild(spinner);
			}
			secondSearchTerm = searchTerm;
		};

		searchForm.addEventListener('submit', listener);

		return () => searchForm.removeEventListener('submit', listener);
	};

	const onButtonClick = (singleClickListner, doubleClickListener) => {
		const listener = (event) => {
			event.preventDefault();

			if (
				event.target.classList.contains('search-container__button') &&
				!event.altKey
			) {
				if (event.detail === 1) {
					const searchTerm = event.value;
					renderSearchList();
					
					singleClickListner(event.target.dataset.movie);
					console.log(searchTerm);

				} else if (event.detail === 2) {
					event.target.remove();
					deletedupl(searchTerms, event.target.innerText);
					
					if (searchTerms.length == 0) {
						clearNode(searchContainer);
					}
				}
			}
		};

		searchContainer.addEventListener('click', listener);
		return () => searchContainer.removeEventListener('click', listener);
	};

	const offButtonClick = (_listener) => {
		const listener = (event) => {
			event.preventDefault();

			if (
				event.target.classList.contains('search-container__button') &&
				event.altKey
			) {
				_listener(event.target.dataset.movie);
			}
		};

		searchContainer.addEventListener('click', listener);
		return () => searchContainer.removeEventListener('click', listener);
	};

	const deletedupl = (searchTerms, el) => {
		let idx = 0;
		for (let i = 0; i < searchTerms.length; i++) {
			if (searchTerms[i] == el) {
				idx = i;
			}
		}

		searchTerms.splice(idx, 1);
		return searchTerms;
	}

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
		renderError,
		renderSearchList,
		onSearchSubmit,
		setStatusListeners,
		renderCount,
		onButtonClick,
		offButtonClick,
	};
};
