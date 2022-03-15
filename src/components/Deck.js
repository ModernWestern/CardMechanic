import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useFetch } from '../customHooks/Axios';
import { useSRGBTexture } from '../customHooks/Texture';
import { useEffect, useState, useContext } from 'react';
import { CharacterContext, DeckContext } from './Contexts';

function useCards(loop = true) {
	const data = useFetch('3538d1c2-18ab-48df-82e2-2510b5902da9');
	const [cards, setCards] = useState([]);
	const [count, setCount] = useState(0);
	const [l, r] = useSRGBTexture(cards);

	useEffect(() => {
		if (data) {
			setCards(data[count].cards.map((card) => card.address));
		}
	}, [data, count]);

	return {
		l,
		r,
		dispatch: () =>
			setCount(data && count < data.length - 1 ? count + 1 : loop ? 0 : count),
	};
}

export default function Deck() {
	const { setAnimation } = useContext(CharacterContext);
	const [tween, setTween] = useState('start');
	const [point, setPoint] = useState(false);
	const { l, r, dispatch } = useCards();

	const distance = 1.25;

	const context = {
		tween,
		setTween,
		Restart: () => {
			setTween('restart');
			dispatch();
		},
	};

	useEffect(() => {
		if (point) {
			document.body.style.cursor = Cursor.hovered;
			return () => (document.body.style.cursor = Cursor.default);
		}
	}, [point]);

	return (
		<DeckContext.Provider value={context}>
			{l && r ? (
				<>
					<Card
						texture={l}
						position={[-distance, 1.125, 0]}
						onClick={() => {
							setAnimation('thoughtful');
							setTween('turnback');
						}}
						onPointerOver={() => setPoint(true)}
						onPointerOut={() => setPoint(false)}
					/>
					<Card
						texture={r}
						position={[distance, 1.125, 0]}
						onClick={() => {
							setAnimation('angry');
							setTween('turnback');
						}}
						onPointerOver={() => setPoint(true)}
						onPointerOut={() => setPoint(false)}
					/>
				</>
			) : null}
		</DeckContext.Provider>
	);
}
