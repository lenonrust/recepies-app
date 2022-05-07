const handleFoodSearch = async (inputText, type) => {
  let url = '';
  switch (type) {
  case 'name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    break;
  case 'ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;
    break;
  case 'firstLetter':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;
    break;
  default:
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export default handleFoodSearch;
