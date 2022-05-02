const filterIngredients = (details, limit) => {
  const array = [];
  for (let index = 1; index <= limit; index += 1) {
    if (details[`strIngredient${index}`] !== ''
      && details[`strIngredient${index}`] !== null) {
      array
        .push(`${details[`strIngredient${index}`]}: ${details[`strMeasure${index}`]}`);
    }
  }
  return array;
};

export default filterIngredients;
