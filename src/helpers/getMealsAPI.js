const handleFoodSearch = async (inputText, type) => {
  let url;
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
    url = '';
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

export default handleFoodSearch;

// const getMealsByName = async (name) => {
//   const respose = await fetch(``);
//   const data = await respose.json();
//   return data;
//   // };
// }

// const getMealsByFirstLetter = async (firstLetter) => {
//   const url = `www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
//   const respose = await fetch(url);
//   const data = await respose.json();
//   return data;
// };

// const getMealsByIngredient = async (ingredient) => {
//   const url = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
//   const respose = await fetch(url);
//   const data = await respose.json();
//   return data;
