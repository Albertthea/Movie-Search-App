const movieTemplate = document.createElement('template');

movieTemplate.innerHTML = `
<style>
:host {
    display: block;
}
  
* {
    box-sizing: border-box;
}

.result-item {
    background-color: rgba(255, 255, 255, 0.24);
    height: 454px;
    width: 302px;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.24);
    text-decoration: none;
}

.result-item__link {
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
}
  
.result-item__poster {
    position: absolute;
    width: 302px;
    height: 454px;
    border-radius: 0; 
}

.result-item__inf {
    display: none;
    height: 100%;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
    padding: 275px 20px 5px;
    position: relative;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 26.43%, rgba(0, 0, 0, 0.8) 72.41%);
}

.result-item__title {
    font-weight: 700;
    font-size: 24px;
    color: #FFF;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    align-self: center;
    margin: 0;
}

.result-item__note {
    color: #FFF;
    font-size: 24px;
    align-self: center; 
}

.result-item__genre {
    display: inline-block;
    font-size: 16px;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    align-self: center;
    color: rgba(255, 255, 255, 0.4);
}

.result-item__year {
    display: inline-block;
    font-size: 16px;
    text-align: end;
    grid-column-start: 2;
    grid-row-start: 3;
    align-self: center;
    color: rgba(255, 255, 255, 0.4);
}

.result-item:hover .result-item__poster {
    border-radius: 12px; 
}

.result-item:hover .result-item__inf {
    display: grid;
    cursor: pointer; 
}
</style>

<article class="result-item">
    <a href="" class="result-item__link" target="_blank">
        <img class="result-item__poster" src="" alt="poster" />
        <div class="result-item__inf">
            <div class="result-item__note"></div>
            <h3 class="result-item__title"></h3>
            <div class="result-item__genre"></div>
            <div class="result-item__year"></div>
      </div>
    </a>
</article>
`;

const params = ['title', 'poster', 'link', 'year', 'genre', 'note'];

const match = (params, el) => {
    for (let param of params) {
        Object.defineProperty(el, param, {
            get() {
                return this.getAttribute(param) 
            },
            set(value) {
                this.setAttribute(param, value)
            },
        });
    }
}

class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = movieTemplate.content.cloneNode(true);

        this.shadowRoot.appendChild(template);
        match(params, this);
    }
    
    static get observedAttributes() {
        return params;
    }
    
    attributeChangedCallback(param, oldValue, newValue) {
        switch (param) {
          case 'title':
            return (this.shadowRoot.querySelector(
              '.result-item__title'
            ).textContent = newValue);
    
          case 'poster':
            return (this.shadowRoot.querySelector('.result-item__poster').src = newValue);
    
          case 'link':
            return (this.shadowRoot.querySelector('.result-item__link').href = newValue);
    
          case 'year':
            return (this.shadowRoot.querySelector(
              '.result-item__year'
            ).textContent = newValue);
    
          case 'note':
            return (this.shadowRoot.querySelector(
              '.result-item__note'
            ).textContent = newValue);
    
          case 'genre':
            return (this.shadowRoot.querySelector(
              '.result-item__genre'
            ).textContent = newValue);
        }
    }  
}
    
customElements.define('movie-card', MovieCard);