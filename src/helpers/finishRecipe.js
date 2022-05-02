export function finishFood(details, history) {
  const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeTags = (!details.strTags && details.strTags === null)
    ? '' : details.strTags.split(','); // para tratar casos em que o campo strTags retorna Null da API
  const myRecipe = {
    id: details.idMeal,
    type: 'food',
    nationality: details.strArea,
    category: details.strCategory,
    alcoholicOrNot: '',
    name: details.strMeal,
    image: details.strMealThumb,
    doneDate: new Date(),
    tags: recipeTags,
  };
  if (storageData) {
    localStorage.setItem('doneRecipes', JSON.stringify([...storageData, myRecipe]));
  } else localStorage.setItem('doneRecipes', JSON.stringify([myRecipe]));
  history.push('/done-recipes');
}

export function finishDrink(details, history) {
  const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeTags = (!details.strTags && details.strTags === null)
    ? '' : details.strTags.split(','); // para casos em que o campo strTags retorna Null da API
  const myRecipe = {
    id: details.idDrink,
    type: 'drink',
    nationality: '',
    category: details.strCategory,
    alcoholicOrNot: details.strAlcoholic,
    name: details.strDrink,
    image: details.strDrinkThumb,
    doneDate: new Date(),
    tags: recipeTags,
  };
  if (storageData) {
    localStorage.setItem('doneRecipes', JSON.stringify([...storageData, myRecipe]));
  } else localStorage.setItem('doneRecipes', JSON.stringify([myRecipe]));
  history.push('/done-recipes');
}
