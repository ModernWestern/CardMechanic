import { useGLTF, useAnimations } from '@react-three/drei';
import { useRef, useEffect, useState, useReducer } from 'react';
import * as THREE from 'three';

function useExpression(name, root) {
	const { animations } = useGLTF(`/models/doremi/${name}.glb`);
	const { actions } = useAnimations(animations, root);

	const [state, dispatch] = useReducer(
		(state, action = { name: name, isPlaying: false }) => {
			console.log(state);
			return action;
		},
		{ name: name, isPlaying: true },
	);

	useEffect(() => {
		if (!state.isPlaying) {
			const currentAnimation = actions.animation_0;
			currentAnimation.reset().play();
			return () => currentAnimation.stop();
		}
	}, [actions, state]);

	return { dispatch, state };
}

const loader = {
	hi: null,
	angry: null,
	thoughtful: null,
	Set: (root) => {
		loader.hi = useExpression('Hi', root);
		loader.angry = useExpression('Angry', root);
		loader.thoughtful = useExpression('Thoughtful', root);
	},
	Get: () => {
		return {
			hi: loader.hi,
			angry: loader.angry,
			thoughful: loader.thoughtful,
		};
	},
};

export default function Model({ ...props }) {
	const mixer = THREE.AnimationMixer;

	const root = useRef();
	const { nodes, materials } = useGLTF('/models/doremi/Doremi.glb');

	loader.Set(root);
	const expressions = loader.Get();

	const [toggle, setToggle] = useState(false);
	const [expression, setExpression] = useState('angry');

	useEffect(() => {
		const current = expressions[expression];

		if (current) {
			current.dispatch();
			current.state.isPlaying = true;
			return () => current.dispatch(current.state);
		}
	}, [expression, toggle]);

	return (
		<group
			ref={root}
			{...props}
			dispose={null}
			onClick={() => {
				setToggle(!toggle);
				setExpression(toggle ? 'angry' : 'thoughful');
			}}
		>
			<skinnedMesh
				geometry={nodes.Doremi_1.geometry}
				material={materials.Doremi}
				skeleton={nodes.Doremi_1.skeleton}
				castShadow
				receiveShadow
			/>
			<primitive object={nodes.Hips} />
		</group>
	);
}

useGLTF.preload('/models/doremi/Doremi.glb');
