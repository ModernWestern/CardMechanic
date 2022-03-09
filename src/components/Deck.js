import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useTexture } from '@react-three/drei';
import { CharacterContext, DeckContext } from './Contexts';
import { useEffect, useState, useContext, useRef } from 'react';

export default function Deck(deck) {
	const [cursor, setCursor] = useState(false);
	const [tween, setTween] = useState('start');
	const { setAnimation } = useContext(CharacterContext);

	const distance = 1.5;

	useEffect(() => {
		if (cursor) {
			document.body.style.cursor = Cursor.hovered;
			return () => (document.body.style.cursor = Cursor.default);
		}
	}, [cursor]);

	const [textures, setTextures] = useState(['/models/card/textures/sick.png', '/models/card/textures/burger.png']);

	const [l, r] = useTexture(textures).map((texture) => {
		texture.encoding = 3001;
		texture.flipY = false;
		return texture;
	});

	const context = {
		tween,
		setTween,
		Restart: () => {
			setTextures([
				'/models/card/textures/apple.png',
				'https://res.cloudinary.com/lobsang-white/image/upload/v1646803284/textures/rude.png',
			]);
			setTween('restart');
		},
	};

	return (
		<DeckContext.Provider value={context}>
			<Card
				name={'L'}
				texture={l}
				position={[-distance, 1.125, 0]}
				onClick={() => {
					setAnimation('thoughtful');
					setTween('turnback');
				}}
				onPointerOver={() => setCursor(true)}
				onPointerOut={() => setCursor(false)}
			/>
			<Card
				name={'R'}
				texture={r}
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
