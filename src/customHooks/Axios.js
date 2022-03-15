import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Axios() {}

const instance = axios.create({
	baseURL: 'https://run.mocky.io/v3',
});

export function useFetch(url) {
	const [state, dispatch] = useState();

	useEffect(() => {
		instance.get(url).then((res) => dispatch(res.data));
	}, [url]);

	return state;
}
