export const shuffle = (arr) => {
  const newArr = arr.slice();

  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
  }

  return newArr;
};

export const getRandomColor = (arr) => {
  const random = Math.floor(Math.random() * arr.length);

  return arr[random];
};

export const getRandomChar = (min, max) => Math.floor(Math.random() * (max - min + 1));
