import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { getSingleApiGame } from '../../api/gamesApiData';

export default function Screenshot() {
  const [game, setGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  console.log('this is the id', id);

  useEffect(() => {
    getSingleApiGame(id)?.then((data) => setGame(data));
  }, [id]);

  console.log('game screen obj', game);
  console.log('single game', id);
  console.log('image screen', game.results);

  return (
    <>
      <div><h1 className="gamesLandingHeader">Screenshots</h1></div>
      <div className="screenshots">{game?.results?.map((item) => <Image className="screenshot" key={uuidv4()} src={item.image} />)}</div>
    </>
  );
}
