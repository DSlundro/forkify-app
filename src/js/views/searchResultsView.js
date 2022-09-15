import View from "./View";
import icons from 'url:../../img/icons.svg';

class SearchResultsView extends View{
    _parentElement = document.querySelector('.results');
    
    _generateMarkup() {
        console.log(this._data);
        return this._data.map(this._generateMarkupPreviw).join('')
        
    }

    _generateMarkupPreviw(result) {
        return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    
                </div>
            </a>
        </li>
        `;
    }
}
export default new SearchResultsView();

/* 
<div class="preview__user-generated">
    <svg>
        <use href="${icons}#icon-user"></use>
    </svg>
</div>
*/
