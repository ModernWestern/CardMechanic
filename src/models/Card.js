import { useGLTF } from '@react-three/drei';
import { useTween } from '../customHooks/Tween';
import { DeckContext } from '../components/LevelContext';
import { useRef, useState, useEffect, useContext } from 'react';

const loader = {
	start: null,
	hovered: null,
	turnback: null,
	Get: () => {
		return {
			start: loader.start,
			hovered: loader.hovered,
			turnback: loader.turnback,
		};
	},
	Set: (group, deps, props) => {
		const position = props['position'];

		loader.start = useTween(group, deps, {
			duration: 2.5,
			position: position,
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
		loader.hovered = useTween(group, deps, {
			duration: 1.5,
			position: [position[0], position[1] + .25, position[2]],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
		loader.turnback = useTween(group, deps, {
			duration: 2.5,
			position: position,
			rotation: [0, position[0] > 0 ? -Math.PI : Math.PI, 0],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
	},
};

export default function Card({ texture, castShadow, receiveShadow, ...props }) {
	const group = useRef();
	const [hovered, setHover] = useState(false);
	const { tween, setTween } = useContext(DeckContext);
	const { nodes, materials } = useGLTF('/models/card/Card.glb');

	loader.Set(group, [hovered], props);
	const expressions = loader.Get();

	useEffect(() => {
		const dispatch = expressions[tween];

		if (dispatch) {
			dispatch();
		}
	}, [tween, expressions]);

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			onClick={() => {
				setTween('turnback');
				props.onClick(group.current);
			}}
			onPointerOver={() => {
				setHover(true);
				setTween('hovered');
				props.onPointerOver();
			}}
			onPointerOut={() => {
				setHover(false);
				setTween('start');
				props.onPointerOut();
			}}
		>
			<mesh
				ref={group}
				geometry={nodes.Card.geometry}
				material={materials.Card}
				castShadow={castShadow}
				receiveShadow={receiveShadow}
			>
				<meshStandardMaterial
					map={texture}
					metalness={0}
					emissive={'white'}
					emissiveIntensity={0.015}
				></meshStandardMaterial>
			</mesh>
		</group>
	);
}

useGLTF.preload('/models/card/Card.glb');
