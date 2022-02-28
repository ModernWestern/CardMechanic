import Card from '../models/Card';
import Cursor from '../util/Cursor';
import { useTexture } from '@react-three/drei';
import Levelcontext from '../components/LevelContext';
import { useEffect, useState, useContext } from 'react';

export default function Cards({ height = 1 }) {
	const [good, bad] = useTexture(['/models/card/textures/safe.png', '/models/card/textures/sick.png']).map(
		(texture) => {
			texture.encoding = 3001;
			texture.flipY = false;
			return texture;
		},
	);

	const { animation, setAnimation } = useContext(Levelcontext);
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
				height={height}
				texture={good}
				position={[-1.5, height, 0]}
				onClick={() => setAnimation('thoughtful')}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => {
					setHover(false);
				}}
			/>
			<Card
				height={height}
				texture={bad}
				position={[1.5, height, 0]}
				onClick={() => setAnimation('angry')}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => {
					setHover(false);
				}}
			/>
		</group>
	);
}
