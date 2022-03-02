const ShadowPlane = ({ ...props }) => {
	const opacity = props['opacity'] ?? 0.5;
	const size = props['size'] ?? 100;

	return (
		<mesh {...props} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[size, size]} />
			<shadowMaterial attach="material" transparent opacity={opacity} />
		</mesh>
	);
};

const Sun = ({ ...props }) => {
	const hasShadows = props['shadows'] ?? false;
	const intensity = props['intensity'] ?? 0.5;
	const opacity = props['opacity'] ?? null;
	const resolution = props['resolution'] ?? 1000;

	function Remap(value, inMin, inMax, outMin, outMax) {
		const a = (value - inMin) / (inMax - inMin);
		const b = outMin + (outMax - outMin) * a;
		return b;
	}

	const deltaOpacity = Remap(intensity, 0, 2, 0, 1);

	if (hasShadows) {
		return (
			<group>
				<directionalLight
					{...props}
					castShadow
					intensity={intensity}
					shadow-mapSize-width={resolution}
					shadow-mapSize-height={resolution}
				/>
				<ambientLight intensity={0.5} />
				<ShadowPlane {...props} opacity={opacity ?? deltaOpacity} />
			</group>
		);
	}

	return (
		<group>
			<directionalLight {...props} intensity={intensity} />
			<ambientLight intensity={0.5} />
		</group>
	);
};

const Object = {
	Sun: ({ ...props }) => Sun(props),
	Shadows: ({ ...props }) => ShadowPlane(props),
};

export default Object;
