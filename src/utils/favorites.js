export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};
export const toggleFavorite = (item) => {
  const stored = getFavorites();
  const exists = stored.find(f => f._id === item._id && f.type === item.type);

  let updated;
  if (exists) {
    updated = stored.filter(f => !(f._id === item._id && f.type === item.type));
  } else {
  
    const completeItem = {
      ...item,
      description: item.description || 'No description available.',
    };

    updated = [...stored, completeItem];
  }

  localStorage.setItem('favorites', JSON.stringify(updated));
  return updated;
};
