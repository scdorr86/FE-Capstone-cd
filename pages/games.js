import { useEffect, useState } from 'react';
import getApiGames from '../api/gamesApiData';

function Games() {
  console.warn('the games Landing');

  const [games, setGames] = useState([]);

  const getGames = () => {
    getApiGames().then(setGames);
  };

  useEffect(() => {
    getGames();
  }, [games]);

  console.log('this is games call', games);

  return (
    <>
      <div>
        <h1>GAMES</h1>
      </div>
    </>
  );
}

export default Games;
