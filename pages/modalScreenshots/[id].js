import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleApiGame } from '../../api/gamesApiData';

export default function PostRsvp() {
  const [game, setGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  console.log('this is the id', id);

  useEffect(() => {
    getSingleApiGame(id)?.then((data) => setGame(data));
  }, [id]);

  console.log('game screen obj', game[3]);

  const singleGame = game[3]?.filter((item) => console.log('this is itemid', item.id));

  // const singleGame = game[3]?.filter((item) => (item.id === id));

  console.log('single game', singleGame, id);

  return (
    <>
      <div><h1>{}Screenshots</h1></div>
    </>
  );
}
