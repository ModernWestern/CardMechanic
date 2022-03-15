import { useTexture } from '@react-three/drei';

export default function Texture() {}

export function useSRGBTexture(cards) {
	return useTexture(cards).map((texture) => {
		texture.encoding = 3001;
		texture.flipY = false;
		return texture;
	});
}
