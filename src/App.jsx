import Scene3 from './chapter3/Scene3';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

function App() {
	return (
		<Suspense fallback={null}>
			<Canvas shadows>
				<Scene3 />
			</Canvas>
		</Suspense>
	);
}

export default App;
