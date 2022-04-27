const handleDrinksSearch = async (inputText, type) => {
  let url;
  switch (type) {
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
    break;
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`;
    break;
  case 'firstLetter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`;
    break;
  default:
    url = '';
  }
  try {
    const respose = await fetch(url);
    const data = await respose.json();
    return data.drinks;
  } catch (error) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export default handleDrinksSearch;
