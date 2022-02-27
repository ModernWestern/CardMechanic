import Cursor from './util/Cursor';
import Cards from './components/Cards';
import Doremi from './components/Doremi';
import Scene from './components/Scene';

export default function Level() {
	document.body.style.cursor = Cursor.default;
	return (
		<div style={{ height: '100vh', overflow: 'hidden' }}>
			<Scene position={[2.5, 12, 8]} shadows intensity={0.25} resolution={10000}>
				<group position={[0, -1.5, 2.75]}>
					<Doremi position={[0, 0, 0]} scale={1.5} />
					<Cards deck={require('./db/cards.json').deck} height={1.25} />
				</group>
			</Scene>
		</div>
	);
}
