import ReactDOM from 'react-dom';
import React from 'react';
import Level from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback={null}>
			<Level />
		</React.Suspense>
	</React.StrictMode>,
	rootElement,
);
