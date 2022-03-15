import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useFetch } from '../customHooks/Axios';
import { useSRGBTexture } from '../customHooks/Texture';
import { CharacterContext, DeckContext } from './Contexts';
import { useEffect, useState, useContext } from 'react';

export default function Deck() {
	const deck = useFetch('3538d1c2-18ab-48df-82e2-2510b5902da9');
	const { setAnimation } = useContext(CharacterContext);
	const [tween, setTween] = useState('start');
	const [cursor, setCursor] = useState(false);
	const distance = 1.5;

	// const cards = deck[0].cards.map((card) => card.address);
	// const { l, r } = useSRGBTexture(cards);

	const context = {
		tween,
		setTween,
		Restart: () => {
			setTween('restart');
		},
	};

	useEffect(() => {
		if (cursor) {
			document.body.style.cursor = Cursor.hovered;
			return () => (document.body.style.cursor = Cursor.default);
		}
	}, [cursor]);

	return (
		<DeckContext.Provider value={context}>
			<Card
				// texture={l}
				position={[-distance, 1.125, 0]}
				onClick={() => {
					setAnimation('thoughtful');
					setTween('turnback');
				}}
				onPointerOver={() => setCursor(true)}
				onPointerOut={() => setCursor(false)}
			/>
			<Card
				// texture={r}
				position={[distance, 1.125, 0]}
				onClick={() => {
					setAnimation('angry');
					setTween('turnback');
				}}
				onPointerOver={() => setCursor(true)}
				onPointerOut={() => setCursor(false)}
			/>
		</DeckContext.Provider>
	);
}
