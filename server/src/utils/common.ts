export const getRandomValueForArray = (data: any[]) => {
  const index = Math.floor(Math.random() * data.length);
  return data[index] || null;
};

// very bad function
export const getRandomObjectsFromArray = (data: any[]) => {
  let items: any[] = [];
  if (data.length > 2) {
    items = data.slice(
      Math.floor(Math.random() * data.length),
      Math.floor(Math.random() * data.length)
    );
    if (items.length === 0) {
      items = [data[0]];
    }
  }
  return items;
};
