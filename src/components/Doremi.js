import { useGLTF, useAnimations } from '@react-three/drei';
import { useRef, useEffect, useState, useReducer } from 'react';

function useExpression(name, root) {
	const [state, dispatch] = useReducer((state, action = true) => action, false);
	const { animations } = useGLTF(`/models/doremi/${name}.glb`);
	const { actions } = useAnimations(animations, root);

	useEffect(() => {
		if (state) {
			actions.animation_0.reset().play();
			return () => actions.animation_0.stop();
		}
	}, [actions, state]);

	return dispatch;
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
			thoughtful: loader.thoughtful,
		};
	},
};

export default function Model({ ...props }) {
	const root = useRef();
	const { nodes, materials } = useGLTF('/models/doremi/Doremi.glb');

	loader.Set(root);
	const expressions = loader.Get();

	const [toggle, setToggle] = useState(false);
	const [expression, setExpression] = useState('hi');

	useEffect(() => {
		const dispatch = expressions[expression];

		if (dispatch) {
			dispatch();
			return () => dispatch(false);
		}
	}, [expression]);

	return (
		<group
			ref={root}
			{...props}
			dispose={null}
			onClick={() => {
				setToggle(!toggle);
				setExpression(toggle ? 'angry' : 'thoughtful');
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
