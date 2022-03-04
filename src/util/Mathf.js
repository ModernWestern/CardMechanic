export function PowFloor(value) {
	let power = 1;
	while ((value >>= 1)) power <<= 1;
	return power;
}

export function PowCeil(value) {
	if (value <= 1) return 1;
	let power = 2;
	value--;
	while ((value >>= 1)) power <<= 1;
	return power;
}

export function Remap(value, inMin, inMax, outMin, outMax) {
	const a = (value - inMin) / (inMax - inMin);
	const b = outMin + (outMax - outMin) * a;
	return b;
}
