import React, { useRef } from 'react';
import {
	useGLTF,
	Environment,
	MeshTransmissionMaterial,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	BrightnessContrast,
} from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Scene3 = (props) => {
	const group = useRef();
	const ring1 = useRef();
	const ring2 = useRef();
	const ring3 = useRef();
	const ring4 = useRef();
	const earth = useRef();
	const satellite = useRef();
	const control = useRef();
	const { nodes, materials } = useGLTF('./models/the_universe.glb');

	useFrame((state, delta) => {
		const [x, y] = state.mouse;
		const dist = Math.sqrt(x * x + y * y);
		const speed = dist * 2;
		ring1.current.rotation.z += delta * speed;
		ring2.current.rotation.x += delta * speed;
		ring3.current.rotation.x += delta * speed;
		ring4.current.rotation.z += delta * speed;
		satellite.current.rotation.z += delta * speed;
	});
	return (
		<>
			<OrbitControls
				ref={control}
				enableZoom={false}
				enablePan={false}
				minPolarAngle={Math.PI * 0.475}
				maxPolarAngle={Math.PI * 0.525}
				target={[0, 0, -3.5]}
			/>
			<EffectComposer disableNormalPass multisampling={8}>
				<Bloom
					luminanceThreshold={0}
					mipmapBlur
					luminanceSmoothing={0.0}
					intensity={0.2}
				/>
				<BrightnessContrast
					brightness={0.2}
					contrast={0.5}
				/>
			</EffectComposer>
			<color attach={'background'} args={['black']} />
			<Environment files={'./textures/universe.hdr'} />
			<group ref={group} {...props} dispose={null}>
				<group name="Sketchfab_Scene">
					<group
						name="Sketchfab_model"
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, 0, -3.5]}
					>
						<group
							name="4a9d9c70ef3344299ddbb524fe702fc7fbx"
							rotation={[Math.PI / 2, 1, 0]}
							scale={0.055}
						>
							<group name="Object_2">
								<group name="RootNode">
									<group name="pPipe2">
										{/* 圆环 */}
										<group name="polySurface1" scale={3}>
											<mesh
												ref={ring2}
												name="polySurface1_Mat_Aro_0"
												castShadow
												receiveShadow
												geometry={
													nodes.polySurface1_Mat_Aro_0
														.geometry
												}
												material={materials.Mat_Aro}
											/>
										</group>
										<group
											name="polySurface6"
											rotation={[Math.PI / 4, 0, 0]}
											scale={4}
										>
											<mesh
												ref={ring1}
												name="polySurface6_Mat_Aro_0"
												castShadow
												receiveShadow
												geometry={
													nodes.polySurface6_Mat_Aro_0
														.geometry
												}
												material={materials.Mat_Aro}
											/>
										</group>
										<group
											name="polySurface8"
											rotation={[-Math.PI / 4, 0, 0]}
										>
											<mesh
												ref={ring4}
												name="polySurface8_Mat_Aro_0"
												castShadow
												receiveShadow
												geometry={
													nodes.polySurface8_Mat_Aro_0
														.geometry
												}
												material={materials.Mat_Aro}
											/>
										</group>
										<group
											name="polySurface4"
											rotation={[Math.PI / 2, 0, 0]}
											scale={2}
										>
											<mesh
												ref={ring3}
												name="polySurface4_Mat_Aro_0"
												castShadow
												receiveShadow
												geometry={
													nodes.polySurface4_Mat_Aro_0
														.geometry
												}
												material={materials.Mat_Aro}
											/>
										</group>
									</group>
									{/* 地球 */}
									<group
										name="pSphere2"
										position={[0.034, 0, 0.083]}
									>
										<mesh
											ref={earth}
											name="pSphere2_Mat_Nucleo_0"
											castShadow
											receiveShadow
											geometry={
												nodes.pSphere2_Mat_Nucleo_0
													.geometry
											}
											material={materials.Mat_Nucleo}
										/>
										<mesh
											scale={0.9}
											geometry={
												nodes.pSphere2_Mat_Nucleo_0
													.geometry
											}
										>
											<meshStandardMaterial
												color={'#ffffff'}
												emissive={'#250000'}
												emissiveIntensity={1}
											/>
										</mesh>
									</group>
									{/* 卫星 */}
									<group name="pSphere5">
										<mesh
											ref={satellite}
											name="pSphere5_Mat_Esferas2_0"
											castShadow
											receiveShadow
											geometry={
												nodes.pSphere5_Mat_Esferas2_0
													.geometry
											}
											material={materials.Mat_Esferas2}
										/>
									</group>
									{/* 外层球壳 */}
									<group name="pSphere6" scale={1.0}>
										<mesh
											name="pSphere6_Mat_Orb2_0"
											castShadow
											receiveShadow
											geometry={
												nodes.pSphere6_Mat_Orb2_0
													.geometry
											}
											material={materials.Mat_Orb2}
										>
											<MeshTransmissionMaterial
												envMapIntensity={5}
											/>
										</mesh>
									</group>
								</group>
							</group>
						</group>
					</group>
				</group>
			</group>
		</>
	);
};

useGLTF.preload('./models/the_universe.glb');

export default Scene3;
