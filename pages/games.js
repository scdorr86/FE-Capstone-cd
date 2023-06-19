import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import getApiGames from '../api/gamesApiData';
import GameModal from '../components/GamesModal';

function Games() {
  console.log('the games Landing');

  const [games, setGames] = useState([]);

  const getGames = () => {
    getApiGames().then(setGames);
  };

  useEffect(() => {
    getGames();
  }, []);

  console.log('this is games call', games);

  return (
    <>
      <div className="gamesLanding">
        <h1 className="gamesLandingHeader">GAMES LIBRARY</h1>
        <div className="gamesBtnList">
          <ul className="gamesUL">
            {games[3]?.map((index) => (
              // <><li onClick={console.log('test click', index.rating)}>{index.name}</li><Image src={index.background_image} /></>
              <li className="gamesListItem"><GameModal gamesObj={index} /></li>
            ))}
          </ul>
        </div>

        {/* {games.3?.map((item) => (
          console.log('the item', item)
          <li>{item}</li>
        ))}; */}

      </div>
    </>
  );
}

export default Games;
