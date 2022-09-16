import View from "./View";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg';

class SearchResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query. Please try again!`;
    _successMessage = ``;
    
    _generateMarkup() {
        console.log(this._data);
        return this._data
        .map( result => previewView.render(result, false))
        .join('');
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
