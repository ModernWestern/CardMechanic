import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useTexture } from '@react-three/drei';
import { useEffect, useState, useContext, useRef } from 'react';
import { CharacterContext, DeckContext } from '../components/LevelContext';

export default function Deck() {
	const [good, bad] = useTexture(['/models/card/textures/sick.png', '/models/card/textures/burger.png']).map(
		(texture) => {
			texture.encoding = 3001;
			texture.flipY = false;
			return texture;
		},
	);

	const { setAnimation } = useContext(CharacterContext);
	const [hovered, setHover] = useState(false);
	const [tween, setTween] = useState('start');
	const distance = 1.5;

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = Cursor.hovered;
			return () => (document.body.style.cursor = Cursor.default);
		}
	}, [hovered]);

	return (
		<group>
			<DeckContext.Provider value={{ tween, setTween }}>
				<Card
					texture={good}
					position={[-distance, 1.125, 0]}
					onClick={(group) => {
						setAnimation('thoughtful');
					}}
					onPointerOver={() => setHover(true)}
					onPointerOut={() => setHover(false)}
				/>
				<Card
					texture={bad}
					position={[distance, 1.125, 0]}
					onClick={(group) => {
						setAnimation('angry');
					}}
					onPointerOver={() => setHover(true)}
					onPointerOut={() => setHover(false)}
				/>
			</DeckContext.Provider>
		</group>
	);
}
