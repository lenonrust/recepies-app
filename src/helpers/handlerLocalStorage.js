function favoriteRecipes(favoriteObject) {
  const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!localData) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObject]));
    // setFavBtn(true);
  } else if (localData.some((element) => element.id === favoriteObject.id)) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(localData.filter((data) => data.id !== favoriteObject.id)));
    // setFavBtn(false);
  } else {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...localData, favoriteObject]));
    // setFavBtn(true);
  }
}

export default favoriteRecipes;
