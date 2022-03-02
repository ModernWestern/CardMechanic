import { useState } from 'react';
import Cursor from './util/Cursor';
import Deck from './components/Deck';
import Doremi from './models/Doremi';
import Scene from './components/Scene';
import Levelcontext from './components/LevelContext';

export default function Level() {
	document.body.style.cursor = Cursor.default;

	const [animation, setAnimation] = useState('hi');

	return (
		<div style={{ height: '100vh', overflow: 'hidden' }}>
			<Scene position={[2.5, 12, 8]} shadows intensity={0.25} resolution={4096}>
				<group position={[0, -1.25, 2.75]}>
					<Levelcontext.Provider value={{ animation, setAnimation }}>
						<Doremi position={[0, 0, 0]} scale={1.5} />
						<Deck height={1.25} />
						{/* <Deck deck={require('./db/cards.json').deck} height={1.25} /> */}
					</Levelcontext.Provider>
				</group>
			</Scene>
		</div>
	);
}
