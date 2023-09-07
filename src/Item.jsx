import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useIntersect, Image } from '@react-three/drei';

const Item = ({ url, scale, ...props }) => {
	const visible = useRef(false);
	const [hovered, hover] = useState(false);
	const ref = useIntersect((isVisible) => (visible.current = isVisible));
	const { height } = useThree((state) => state.viewport);

	useFrame((state, delta) => {
		ref.current.position.y = THREE.MathUtils.damp(
			ref.current.position.y,
			visible.current ? 0 : -height / 2 + 1,
			4,
			delta
		);
		ref.current.material.zoom = THREE.MathUtils.damp(
			ref.current.material.zoom,
			visible.current ? 1 : 1.5,
			4,
			delta
		);
		ref.current.material.grayscale = THREE.MathUtils.damp(
			ref.current.material.grayscale,
			hovered ? 1 : 0,
			4,
			delta
		);
	});
	return (
		<group {...props}>
			<Image
				ref={ref}
				onPointerOver={() => hover(true)}
				onPointerOut={() => hover(false)}
				scale={scale}
				url={url}
			/>
		</group>
	);
};

export default Item;
