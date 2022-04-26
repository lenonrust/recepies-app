import React from 'react';

function InputSearchHeader() {
  return (
    <form>
      <label htmlFor="inputSearch">
        <input data-testid="search-input" type="text" id="inputSearch" />
      </label>
    </form>
  );
}

export default InputSearchHeader;
// O radio button de busca de ingrediente deve possuir o atributo data-testid="ingredient-search-radio";
// O radio button de busca por nome deve possuir o atributo data-testid="name-search-radio";
// O radio button de busca da primeira letra deve possuir o atributo data-testid="first-letter-search-radio".
// O botão de busca deve possuir o atributo data-testid="exec-search-btn"
