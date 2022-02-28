import { useState } from 'react';
import Cursor from './util/Cursor';
import Doremi from './models/Doremi';
import Scene from './components/Scene';
import Cards from './components/Cards';
import Levelcontext from './components/LevelContext';

export default function Level() {
	document.body.style.cursor = Cursor.default;

	const [animation, setAnimation] = useState('hi');

	return (
		<div style={{ height: '100vh', overflow: 'hidden' }}>
			<Scene position={[2.5, 12, 8]} shadows intensity={0.25} resolution={4096}>
				<group position={[0, -1.5, 2.75]}>
					<Levelcontext.Provider value={{ animation, setAnimation }}>
						<Doremi position={[0, 0, 0]} scale={1.5} />
						<Cards height={1.25} />
						{/* <Cards deck={require('./db/cards.json').deck} height={1.25} /> */}
					</Levelcontext.Provider>
				</group>
			</Scene>
		</div>
	);
}
