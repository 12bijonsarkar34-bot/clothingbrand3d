'use client';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Stage, useGLTF } from '@react-three/drei';
function Dress(){const {scene}=useGLTF('/models/dress1.glb');return <primitive object={scene} position={[0,-1,0]} />}
export default function ModelViewer(){return <div className="model-viewer"><Canvas dpr={[1,1.5]} frameloop="demand" camera={{position:[0,0,4],fov:40}}><ambientLight intensity={0.65}/><directionalLight position={[3,4,3]} intensity={2.2}/><Stage environment="studio" intensity={0.55} adjustCamera={false}><Dress/></Stage><ContactShadows position={[0,-1.2,0]} opacity={0.32} scale={5} blur={2.5}/><Environment preset="studio"/><OrbitControls enablePan={false} minDistance={2} maxDistance={7} autoRotate={false}/></Canvas><span className="viewer-hint">DRAG TO ROTATE · 360° VIEW</span></div>}
