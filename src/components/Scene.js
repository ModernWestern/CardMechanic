import SceneObject from './SceneObject';
import { Canvas } from '@react-three/fiber';
import { ReinhardToneMapping } from 'three';

const Scene = ({ children, ...props }) => {
	return (
		<Canvas
			onCreated={(renderer) => {
				renderer.toneMapping = ReinhardToneMapping;
				renderer.gl.outputEncoding = 3001; //sRGB
			}}
			shadows={props['shadows'] ?? false}
		>
			<group position={children.props.position}>
				<SceneObject.sun {...props} />
			</group>
			{children}
		</Canvas>
	);
};

export default Scene;
