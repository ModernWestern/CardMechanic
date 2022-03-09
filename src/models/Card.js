import { useGLTF } from '@react-three/drei';
import { useTween } from '../customHooks/Tween';
import { DeckContext } from '../components/Contexts';
import { useRef, useState, useEffect, useContext } from 'react';

const loader = {
	start: null,
	restart: null,
	hovered: null,
	turnback: null,
	Get: () => {
		return {
			start: loader.start,
			restart: loader.restart,
			hovered: loader.hovered,
			turnback: loader.turnback,
		};
	},
	Set: (group, deps, callback, props) => {
		const [x, y, z] = props['position'];

		loader.start = useTween(group, deps, {
			duration: 2.5,
			position: [x, y, z],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
		loader.restart = useTween(group, deps, {
			delay: 3,
			duration: 2.5,
			position: [x, y, z],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
		loader.hovered = useTween(group, deps, {
			duration: 1.5,
			position: [x, y + 0.25, z],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
		});
		loader.turnback = useTween(group, deps, {
			delay: 0.5,
			duration: 2.5,
			position: [x, y, z],
			rotation: [0, x > 0 ? -Math.PI : Math.PI, 0],
			position_ease: 'elastic',
			rotation_ease: 'elastic',
			onComplete: () => callback(),
		});
	},
};

function Behaviour({ ...props }) {
	useEffect(() => {
		const tween = props.expressions[props.tween];

		if (tween) {
			const { play, clear } = tween;

			play();

			if (props['clear']) {
				return () => clear();
			}
		}
	}, props['deps'] ?? null);
}

export default function Card({ texture, castShadow, receiveShadow, ...props }) {
	const group = useRef();
	const [hovered, setHover] = useState(false);
	const [localTween, setLocalTween] = useState();
	const { nodes, materials } = useGLTF('/models/card/Card.glb');
	const { Restart, tween: globalTween } = useContext(DeckContext);

	loader.Set(group, [globalTween, hovered], () => Restart(), props);

	const expressions = loader.Get();

	Behaviour({ expressions: expressions, tween: globalTween });
	Behaviour({ expressions: expressions, tween: localTween });

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			onPointerOver={() => {
				setHover(true);
				props.onPointerOver();
				setLocalTween('hovered');
			}}
			onPointerOut={() => {
				setHover(false);
				props.onPointerOut();
				setLocalTween('start');
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
