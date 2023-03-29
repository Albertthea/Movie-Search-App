import { createStore } from '../helpers/createStore.js';
import { mapMovie } from '../helpers/mapMovie.js';
import { setClassToMain } from '../helpers/setClassToMain.js';

export const createModel = () =>
  createStore(
    {
      count: 0,
      results: [],
      error: false,
      searches: [],
    },
    (store) => ({
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

          setClassToMain('search_live');
          
          return data.Response === 'True'
            ? {
                count: data.totalResults,
                results: data.Search.map(mapMovie),
              }
            : { error: data.Error };
        } catch (error) {
          return { error };
        }
      },
    })
  );
