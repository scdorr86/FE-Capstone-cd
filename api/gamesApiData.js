const dbUrl = 'https://api.rawg.io/api/games?key=c25407e7e7ef40ee8cecb385a636fe29&orderBy="page_size"&equalTo=100';

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

export default getApiGames;
