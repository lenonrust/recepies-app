function favoriteRecipes(favoriteObject) {
  const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!localData) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObject]));
  } else if (localData.some((element) => element.id === favoriteObject.id)) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(localData.filter((data) => data.id !== favoriteObject.id)));
  } else {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...localData, favoriteObject]));
  }
}

export default favoriteRecipes;
