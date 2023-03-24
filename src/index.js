let searchRes = document.querySelector('.search-results');

function renderMovie(movie) {
	const resItem = document.createElement('div');
	resItem.classList.add('result-item');

	const posterMovie = document.createElement('img');
	posterMovie.classList.add('result-item__poster');
	posterMovie.src = movie.Poster;
	resItem.appendChild(posterMovie);

	const resInf = document.createElement('div');
	resInf.classList.add('result-item__inf');
	resItem.appendChild(resInf);

	const noteMovie = document.createElement('div');
	noteMovie.classList.add('result-item__inf__note');
	noteMovie.textContent = '3.8';
	resInf.appendChild(noteMovie);

	const nameMovie = document.createElement('div');
	nameMovie.classList.add('result-item__inf__name');
	nameMovie.textContent = movie.Title;
	resInf.appendChild(nameMovie);

	const genreMovie = document.createElement('div');
	genreMovie.classList.add('result-item__inf__genre');
	genreMovie.textContent = movie.Type;
	resInf.appendChild(genreMovie);

	const yearMovie = document.createElement('div');
	yearMovie.classList.add('result-item__inf__year');
	yearMovie.textContent = movie.Year;
	resInf.appendChild(yearMovie);

    return resItem;
}

const main = async () => {
    const response = await fetch('src/data.json');
    const data = await response.json();
    console.log(data.Search);

    data.Search.forEach(element => {
        const m = renderMovie(element);
        searchRes.appendChild(m);
    });
};
    
  
main();