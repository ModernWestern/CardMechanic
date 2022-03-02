import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useTexture } from '@react-three/drei';
import Levelcontext from '../components/LevelContext';
import { useEffect, useState, useContext } from 'react';

export default function Deck({ height = 1 }) {
	const [good, bad] = useTexture(['/models/card/textures/saint.png', '/models/card/textures/rude.png']).map(
		(texture) => {
			texture.encoding = 3001;
			texture.flipY = false;
			return texture;
		},
	);

	const { setAnimation } = useContext(Levelcontext);
	const [hovered, setHover] = useState(false);

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = Cursor.hovered;
			return () => (document.body.style.cursor = Cursor.default);
		}
	}, [hovered]);

	return (
		<group>
			<Card
				texture={good}
				height={height}
				position={[-1.5, height, 0]}
				onClick={() => setAnimation('thoughtful')}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
			/>
			<Card
				texture={bad}
				height={height}
				position={[1.5, height, 0]}
				onClick={() => setAnimation('angry')}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
			/>
		</group>
	);
}
