import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export default function Tween() {}

export function useTween(group, deps, { ...props }) {
	const timeline = useRef();
	const delay = props['delay'] ?? 0;
	const blend = props['blend'] ?? true;
	const duration = props['duration'] ?? 1;
	const onStart = props['onStart'] ?? null;
	const onComplete = props['onComplete'] ?? null;
	const [px, py, pz] = props['position'] ?? [0, 0, 0];
	const [rx, ry, rz] = props['rotation'] ?? [0, 0, 0];
	const position_ease = props['position_ease'] ?? 'sine.inOut';
	const rotation_ease = props['rotation_ease'] ?? 'sine.inOut';

	useEffect(() => {
		timeline.current = gsap.timeline({ paused: true, onStart: onStart, onComplete: onComplete });

		timeline.current
			.to(group.current.position, {
				delay: delay,
				duration: duration,
				ease: position_ease,
				x: px,
				y: py,
				z: pz,
			})
			.to(
				group.current.rotation,
				{
					delay: delay,
					duration: duration,
					ease: rotation_ease,
					x: rx,
					y: ry,
					z: rz,
				},
				blend ? `-=${duration + delay}` : `${duration + delay}`,
			);

		return () => timeline.current.clear();
	}, deps);

	return {
		play: () => timeline.current.play(),
		pause: () => timeline.current.pause(),
		clear: () => timeline.current.clear(),
	};
}
