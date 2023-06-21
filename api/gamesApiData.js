const dbUrl = 'https://api.rawg.io/api/games?key=c25407e7e7ef40ee8cecb385a636fe29&orderBy="page_size"&equalTo=100';

const dbUrlSingle = 'https://api.rawg.io/api/games?key=c25407e7e7ef40ee8cecb385a636fe29&id=';

const getApiGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleApiGame = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrlSingle}${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getApiGames,
  getSingleApiGame,
};
