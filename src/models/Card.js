import gsap from 'gsap';
import { MathUtils } from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

export default function Card({ texture, height = 1, castShadow, receiveShadow, ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF('/models/card/Card.glb');
	const [hovered, setHover] = useState(false);

	// useFrame(() => {
	// 	const rotation = group.current.position.x > 0 ? -Math.PI / 8 : Math.PI / 8;
	// 	group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, hovered ? rotation : 0, 0.025);
	// 	group.current.position.y = MathUtils.lerp(group.current.position.y, hovered ? height + 0.25 : height, 0.05);
	// });

	const timeline = useRef();
	const [state, setState] = useState('');

	useEffect(() => {
		timeline.current = gsap.timeline({ paused: true });

		timeline.current.addLabel('start');
		timeline.current.to(group.current.position, {
			y: 1.25,
			duration: 15,
			ease: 'sine.inOut',
		});
		timeline.current.addPause();
		// timeline.current.addPause('+=0.1');

		timeline.current.addLabel('hovered');
		timeline.current.to(group.current.position, {
			y: 1.5,
			duration: 0.5,
			ease: 'back.inOut',
			onStart: () => console.log('tween start...'),
		});

		timeline.current.addPause();
	}, []);

	useEffect(() => {
		switch (state) {
			case 'hovered':
				goToAndAnimate('hovered');
				break;
			default:
				goToAndAnimate('start');
				break;
		}
	}, [state]);

	const goToAndAnimate = (labelName) => {
		const label = timeline.current.labels[labelName];
		timeline.current.resume();
		timeline.current.play(label);
	};

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			onPointerOver={() => {
				setHover(true);
				setState('hovered');
				props.onPointerOver();
			}}
			onPointerOut={() => {
				setHover(false);
				setState('');
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
