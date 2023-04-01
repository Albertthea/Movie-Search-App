import { createStore } from '../helpers/createStore.js';
import { mapMovie } from '../helpers/mapMovie.js';
import { setClassToMain } from '../helpers/setClassToMain.js';

export const createModel = () => {
	const cachedData = localStorage.getItem('state');
	let initialState = {
		count: 0,
		results: [],
		error: false,
		searches: [],
	};

	if (cachedData) {
		initialState = JSON.parse(cachedData);
		setClassToMain('search_live');
	}

	return createStore(initialState, (store) => ({
		search: async (currentState, searchTerm) => {
			store.setState({
				count: 0,
				results: [],
				error: false,
			});

			if (!searchTerm) {
				return { error: 'No search term provided' };
			}

			try {
				const timestamp = new Date().getTime();
				const url = `http://www.omdbapi.com/?apikey=40952606&type=movie&s=${searchTerm}&timestamp=${timestamp}`;

				const data = await fetch(url).then((r) => r.json());

				if (data.Response === 'True') {
					const state = {
						count: data.totalResults,
						results: data.Search.map(mapMovie),
						error: false,
					};

					localStorage.setItem('state', JSON.stringify(state));

					return state;
				} else {
					return { error: data.Error };
				}
			} catch (error) {
				return { error };
			}
		},
	}));
};
