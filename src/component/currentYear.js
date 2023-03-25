class CurrentYear extends HTMLElement {
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: 'open' });
  
      this.render();
    }

    render() {
        const year = new Date().getFullYear();
        this.shadowRoot.innerHTML = year;
    } 
}
customElements.define('current-year', CurrentYear);
