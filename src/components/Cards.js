import { MathUtils } from 'three';
import Cursor from '../util/Cursor';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useRef, useState, useReducer } from 'react';

export default function Cards({ deck = [], height = 1 }) {
	const cards = deck;

	const [good, bad] = useTexture(['/models/card/textures/saint.png', '/models/card/textures/rude.png']).map(
		(texture) => {
			texture.encoding = 3001;
			texture.flipY = false;
			return texture;
		},
	);

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
				onClick={() => {
					console.log('good');
				}}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => {
					setHover(false);
				}}
			/>
			<Card
				height={height}
				texture={bad}
				position={[1.5, height, 0]}
				onClick={() => {
					console.log('bad');
				}}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => {
					setHover(false);
				}}
			/>
		</group>
	);
}

function Card({ height = 1, texture, ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF('/models/card/Card.glb');
	const [hovered, setHover] = useState(false);

	function useHover() {
		useFrame(() => {
			group.current.position.y = MathUtils.lerp(group.current.position.y, hovered ? height + 0.25 : height, 0.05);
		});
	}

	function useRotation() {
		useFrame(() => {
			const rotation = group.current.position.x > 0 ? -Math.PI : Math.PI;
			group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, hovered ? rotation : 0, 0.025);
		});
	}

	useHover();
	// useRotation();

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			// onClick={() => {
			// 	props.onClick();
			// }}
			onPointerOver={() => {
				setHover(true);
				props.onPointerOver();
			}}
			onPointerOut={() => {
				setHover(false);
				props.onPointerOut();
			}}
		>
			<mesh ref={group} geometry={nodes.Card.geometry} material={materials.Card} castShadow receiveShadow>
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
