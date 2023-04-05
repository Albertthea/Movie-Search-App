import './component/movieCard.js';
import { createModel } from './app/createModel.js';
import { createViewModel } from './app/createViewModel.js';
import { createView } from './app/createView.js';

const model = createModel();
const view = createView();
const viewModel = createViewModel(model);

// Viewmodel -> View
viewModel.bindCount(view.renderCount);
viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);
viewModel.bindSearches(view.renderSearchList);

// View -> Viewmodel
view.onSearchSubmit(viewModel.handleSearchSubmit);
view.onButtonClick(viewModel.handleSearchSubmit);

viewModel.init();

view.setStatusListeners();
