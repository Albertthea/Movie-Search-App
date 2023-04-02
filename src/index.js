import './component/movieCard.js';
import { createModel } from './app/createModel.js';
import { createViewModel } from './app/createViewModel.js';
import { createView } from './app/createView.js';

const model = createModel();
const view = createView();
const viewModel = createViewModel(model);


viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);
viewModel.bindSearches(view.renderSearchList);
viewModel.bindCount(view.renderCount);

view.onSearchSubmit(viewModel.handleSearchSubmit);

viewModel.init();

view.setStatusListeners();
