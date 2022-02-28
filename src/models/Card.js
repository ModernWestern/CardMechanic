import { MathUtils } from 'three';
import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Card({ height = 1, texture, ...props }) {
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
