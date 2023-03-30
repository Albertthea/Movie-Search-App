export const createViewModel = (model) => {
  let state = {};
  let resultsListener = null;
  let countListener = null;
  let errorListener = null;
  let searchesListener = null;

  const update = (nextState) => {
    if (nextState.error) {
      console.error(nextState.error);
      return (
        errorListener && errorListener('Случилась ошибка. Проверьте консоль.')
      );
    } else {
      errorListener && errorListener('');
    }

    if (nextState.results !== state.results) {
      resultsListener && resultsListener(nextState.results);
    }

    if (nextState.count !== state.count) {
      countListener && countListener(nextState.count);
    }

    if (nextState.searches !== state.searches) {
      searchesListener && searchesListener(nextState.searches);
    }

    state = nextState;
    localStorage.setItem('state', JSON.stringify(state)); 
  };

  const savedState = localStorage.getItem('state');
  if (savedState) {
    state = JSON.parse(savedState);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('.search-string__input').value;
    model.search(searchTerm);
  };

  return {
    bindError: (listener) => (errorListener = listener),
    bindCount: (listener) => (countListener = listener),
    bindResults: (listener) => (resultsListener = listener),
    bindSearches: (listener) => (searchesListener = listener),
    handleSearchSubmit: (searchTerm) => model.search(searchTerm),
    init: () => {
      update(model.getState());
      model.subscribe(update);
    },   
  };
}
