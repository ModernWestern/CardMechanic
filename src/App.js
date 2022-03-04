import { useState } from 'react';
import Cursor from './util/Cursor';
import Deck from './components/Deck';
import Doremi from './models/Doremi';
import Scene from './components/Scene';
import { CharacterContext } from './components/LevelContext';

export default function Level() {
	document.body.style.cursor = Cursor.default;

	const [animation, setAnimation] = useState('hi');

	return (
		<div style={{ height: '100vh', overflow: 'hidden' }}>
			<Scene position={[2.5, 12, 8]} shadows intensity={0.25} resolution={8192} color={'pink'} ignoreAmbientColor>
				<group position={[0, -1.25, 2.75]}>
					<CharacterContext.Provider value={{ animation, setAnimation }}>
						{/* <Deck deck={require('./db/cards.json').deck} /> */}
						<Deck />
						<Doremi position={[0, 0, 0]} scale={1.5} />
					</CharacterContext.Provider>
				</group>
			</Scene>
		</div>
	);
}
