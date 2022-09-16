import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0))  return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
        /* COMPARE OLD AND NEW MARKUP AND CHANGE ONLY VALUE AND ATTRIBUTES THAT CHANGED FROM OLD TO NEW MARKUP */
        
        // Data from recipe
        this._data = data;
        
        // Markup of recipe as a string
        const newMarkup = this._generateMarkup();
        
        // -- To compare we need to convert markup's string in DOM object, we will create a virtual DOM object
        // createContextualFragment() - convert markup string in real DOM node object
        const newDOM = document.createRange().createContextualFragment(newMarkup);

        // Create a new Array by selecting all elements from new markup
        const newElements = newDOM.querySelectorAll('*');
        // Create a new Array by selecting all elements from current markup
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach( (newEl, i) => {
            // Loop current and new DOM arrays
            const curEl = curElements[i];

            // Updates changed TEXT
            if(
                !newEl.isEqualNode(curEl) && 
                newEl.firstChild?.nodeValue.trim() !== ''
            ){
                curEl.textContent = newEl.textContent
            }

            // Updates changed ATTRIBUTES
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes.forEach( attr => curEl.setAttribute(attr.name, attr.value)));
            };
        });
    }

    _clear() {
        // Clean markup
        this._parentElement.innerHTML = '';
    }
    
    renderSpinner() {
        const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this._clear();
        // Insert markup
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    } 

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._successMessage) {
        const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}