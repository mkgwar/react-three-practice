import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Car from "./Car";

function App() {
  return (
    <main>
      <Canvas camera={{ fov: 45, position: [20, 20, 20] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight intensity={1} position={[20, 30, 40]} />
          <Text
            rotation={[0, 45, 0]}
            position={[-20, 2, -15]}
            scale={50}
            color="black"
          >
            Use WASD to move
          </Text>
          <mesh scale={50} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="rgb(254,254,34)" />
          </mesh>
          <Car />
        </Suspense>
      </Canvas>
    </main>
  );
}

export default App;
