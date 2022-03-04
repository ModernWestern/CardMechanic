import gsap from 'gsap';
import { useRef, useEffect, useReducer } from 'react';

export default function Tween() {}

export function useTween(group, deps, { ...props }) {
	const timeline = useRef();
	const delay = props['delay'] ?? 0;
	const duration = props['duration'] ?? 1;
	const position = props['position'] ?? [0, 0, 0];
	const rotation = props['rotation'] ?? [0, 0, 0];
	const position_ease = props['position_ease'] ?? 'sine.inOut';
	const rotation_ease = props['rotation_ease'] ?? 'sine.inOut';
	const onStart = props['onStart'] ?? null;
	const onComplete = props['onComplete'] ?? null;

	const [state, dispatch] = useReducer(
		(state, action) => {
			timeline.current.play();
			return state;
		},
		{ tween: 'start' },
	);

	useEffect(() => {
		timeline.current = gsap.timeline({ paused: true, onStart: onStart, onComplete: onComplete });

		timeline.current
			.to(group.current.position, {
				delay: delay,
				duration: duration,
				ease: position_ease,
				x: position[0],
				y: position[1],
				z: position[2],
				// x: group.current.position.x + position[0],
				// y: group.current.position.y + position[1],
				// z: group.current.position.z + position[2],
			})
			.to(
				group.current.rotation,
				{
					delay: delay,
					duration: duration,
					ease: rotation_ease,
					x: rotation[0],
					y: rotation[1],
					z: rotation[2],
					// x: group.current.rotation.x + rotation[0],
					// y: group.current.rotation.y + rotation[1],
					// z: group.current.rotation.z + rotation[2],
				},
				`-=${duration}`,
			);

		return () => timeline.current.clear();
	}, [...deps, state]);

	return dispatch;
}

// function useTween(group, tween, hovered) {
// 	const timeline = useRef();

// 	useEffect(() => {
// 		timeline.current = gsap.timeline({ paused: true });

// 		// Start
// 		timeline.current.addLabel('start');
// 		timeline.current.to(group.current.position, {
// 			y: 1.125,
// 			duration: 3,
// 			ease: 'elastic.out',
// 		});
// 		timeline.current.to(
// 			group.current.rotation,
// 			{
// 				y: 0,
// 				duration: 1.25,
// 				ease: 'elastic.inOut',
// 			},
// 			'0',
// 		);
// 		timeline.current.addPause();

// 		// Hovered
// 		timeline.current.addLabel('hovered');
// 		timeline.current.to(group.current.position, {
// 			y: 1.5,
// 			duration: 2,
// 			ease: 'elastic.out',
// 		});
// 		timeline.current.addPause();

// 		// Turnback
// 		timeline.current.addLabel('turnback');
// 		timeline.current.to(group.current.rotation, {
// 			duration: 2.5,
// 			y: group.current.position.x > 0 ? -Math.PI : Math.PI,
// 			ease: 'elastic.out',
// 			onComplete: () => {
// 				console.log('completed...');
// 			},
// 		});
// 		timeline.current.addPause();
// 	}, [hovered]);

// 	useEffect(() => {
// 		goToAndAnimate(tween);
// 	}, [tween]);

// 	const goToAndAnimate = (labelName) => {
// 		const label = timeline.current.labels[labelName];
// 		timeline.current.play(label);
// 	};
// }

// function useTween(
// 	group,
// 	delay = 0,
// 	duration = 1,
// 	position = [0, 0, 0],
// 	rotation = [0, 0, 0],
// 	position_ease = 'sine.inOut',
// 	rotation_ease = 'sine.inOut',
// 	onStart,
// 	onCompleted,
// 	deps = [],
// ) {
// 	const timeline = useRef();

// 	useEffect(() => {
// 		timeline.current = gsap.timeline({ paused: true });

// 		timeline.current.clear();

// 		timeline.current.to(group.current.position, {
// 			delay: delay,
// 			duration: duration,
// 			ease: position_ease,
// 			onStart: onStart,
// 			onCompleted: onCompleted,
// 			x: group.current.position.x + position[0],
// 			y: group.current.position.y + position[1],
// 			z: group.current.position.z + position[2],
// 		});

// 		timeline.current.to(
// 			group.current.rotation,
// 			{
// 				delay: delay,
// 				duration: duration,
// 				ease: rotation_ease,
// 				onStart: onStart,
// 				onCompleted: onCompleted,
// 				x: group.current.rotation.x + rotation[0],
// 				y: group.current.rotation.y + rotation[1],
// 				z: group.current.rotation.z + rotation[2],
// 			},
// 			0,
// 		);

// 		timeline.current.play();

// 		return () => timeline.current.clear();
// 	}, deps);
// }
