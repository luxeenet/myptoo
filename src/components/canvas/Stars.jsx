// import { useState, useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";
// import * as random from "maath/random/dist/maath-random.esm";

// const Stars = (props) => {
//   const ref = useRef();
//   const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10;
//     ref.current.rotation.y -= delta / 15;
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
//         <PointMaterial
//           transparent
//           color='#f272c8'
//           size={0.002}
//           sizeAttenuation={true}
//           depthWrite={false}
//         />
//       </Points>
//     </group>
//   );
// };

// const StarsCanvas = () => {
//   return (
//     <div className='w-full h-auto absolute inset-0 z-[-1]'>
//       <Canvas camera={{ position: [0, 0, 1] }}>
//         <Suspense fallback={null}>
//           <Stars />
//         </Suspense>

//         <Preload all />
//       </Canvas>
//     </div>
//   );
// };

// export default StarsCanvas;




// import { useState, useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload, Sphere } from "@react-three/drei";
// import * as random from "maath/random/dist/maath-random.esm";

// const BlackHole = ({ position }) => {
//   const ref = useRef();

//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.1; // Slow rotation
//       ref.current.rotation.x += delta * 0.08;
//     }
//   });

//   return (
//     <Sphere ref={ref} args={[0.3, 32, 32]} position={position}>
//       <meshStandardMaterial color="black" metalness={1} roughness={0.2} emissive="purple" emissiveIntensity={0.5} />
//     </Sphere>
//   );
// };

// const Stars = () => {
//   const ref = useRef();
//   const sphere = useState(() => random.inSphere(new Float32Array(3000), { radius: 2 }))[0];

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.x -= 0.0005;
//       ref.current.rotation.y -= 0.0008;
//     }
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled>
//         <PointMaterial transparent color="cyan" size={0.002} sizeAttenuation depthWrite={false} />
//       </Points>
//     </group>
//   );
// };

// const StarsCanvas = () => {
//   return (
//     <div className="w-full h-auto absolute inset-0 z-[-1]">
//       <Canvas camera={{ position: [0, 0, 3] }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} intensity={1} />

//         <Suspense fallback={null}>
//           <Stars />
//           <BlackHole position={[0.5, 0.5, -1]} />
//           <BlackHole position={[-0.8, -0.8, -1]} />
//         </Suspense>

//         <Preload all />
//       </Canvas>
//     </div>
//   );
// };

// export default StarsCanvas;
// import { useState, useRef, Suspense } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Points, PointMaterial, Sphere, Ring, Torus, Preload } from "@react-three/drei";
// import * as random from "maath/random/dist/maath-random.esm";
// import { Vector3, Color } from "three";

// // 🌀 High-Speed Black Hole
// const BlackHole = ({ position }) => {
//   const ref = useRef();
//   const diskRef = useRef();
//   const materialRef = useRef();
//   const speed = useRef(0.02);
//   let scaleFactor = useRef(1);

//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 1.5;
//       ref.current.position.z -= delta * speed.current;
//       scaleFactor.current += delta * 0.1;
//       ref.current.scale.set(scaleFactor.current, scaleFactor.current, scaleFactor.current);
//     }

//     if (diskRef.current) {
//       diskRef.current.rotation.z += delta * 2;
//     }

//     if (materialRef.current) {
//       const time = performance.now() * 0.002;
//       materialRef.current.emissive = new Color(`hsl(${(time * 200) % 360}, 100%, 50%)`);
//     }

//     // Reset when black hole moves far
//     if (ref.current.position.z < -10) {
//       ref.current.position.z = 5;
//       scaleFactor.current = 1;
//     }
//   });

//   return (
//     <group position={position}>
//       <Sphere ref={ref} args={[0.3, 64, 64]}>
//         <meshStandardMaterial ref={materialRef} color="black" metalness={1} roughness={0.1} emissive="black" />
//       </Sphere>

//       <Ring ref={diskRef} args={[0.35, 0.7, 64]}>
//         <meshStandardMaterial color="purple" emissive="blue" emissiveIntensity={5} transparent opacity={0.9} />
//       </Ring>
//     </group>
//   );
// };

// // ✨ Infinite Moving Stars
// const Stars = () => {
//   const ref = useRef();
//   const [positions] = useState(() => random.inSphere(new Float32Array(6000), { radius: 12 }));

//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x -= delta * 0.002;
//       ref.current.rotation.y -= delta * 0.005;

//       for (let i = 0; i < positions.length; i += 3) {
//         const pos = new Vector3(positions[i], positions[i + 1], positions[i + 2]);
//         pos.z -= delta * 1.5; // Stars move backward to create illusion of motion

//         positions[i] = pos.x;
//         positions[i + 1] = pos.y;
//         positions[i + 2] = pos.z;

//         if (pos.z < -15) {
//           positions[i] = (Math.random() - 0.5) * 20;
//           positions[i + 1] = (Math.random() - 0.5) * 20;
//           positions[i + 2] = 10 + Math.random() * 10;
//         }
//       }

//       ref.current.geometry.attributes.position.needsUpdate = true;
//     }
//   });

//   return (
//     <Points ref={ref} positions={positions} stride={3} frustumCulled>
//       <PointMaterial transparent color="white" size={0.005} sizeAttenuation depthWrite={false} opacity={0.7} />
//     </Points>
//   );
// };

// // 🌌 Moving Outer Space Borders (Floating Cosmic Rings)
// const CosmicBorders = () => {
//   const ref1 = useRef();
//   const ref2 = useRef();

//   useFrame((_, delta) => {
//     if (ref1.current) {
//       ref1.current.rotation.x += delta * 0.2;
//       ref1.current.rotation.y += delta * 0.15;
//       ref1.current.position.z -= delta * 0.5;

//       if (ref1.current.position.z < -12) ref1.current.position.z = 12;
//     }

//     if (ref2.current) {
//       ref2.current.rotation.x -= delta * 0.15;
//       ref2.current.rotation.y += delta * 0.1;
//       ref2.current.position.z -= delta * 0.5;

//       if (ref2.current.position.z < -12) ref2.current.position.z = 12;
//     }
//   });

//   return (
//     <>
//       <Torus ref={ref1} args={[6, 0.2, 16, 100]} position={[0, 0, 8]}>
//         <meshStandardMaterial color="darkblue" emissive="blue" emissiveIntensity={3} />
//       </Torus>

//       <Torus ref={ref2} args={[5, 0.1, 16, 100]} position={[0, 0, 10]}>
//         <meshStandardMaterial color="darkred" emissive="red" emissiveIntensity={2} />
//       </Torus>
//     </>
//   );
// };

// // 🎥 Hyper-Speed Camera Motion
// const CameraEffects = () => {
//   const { camera } = useThree();
//   useFrame((_, delta) => {
//     camera.position.z -= delta * 0.2;
//   });
//   return null;
// };

// // 🌌 Main StarsCanvas Component
// const StarsCanvas = () => {
//   return (
//     <div className="w-full h-auto absolute inset-0 z-[-1]">
//       <Canvas camera={{ position: [0, 0, 15] }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} intensity={1} />

//         <Suspense fallback={null}>
//           <Stars />
//           <BlackHole position={[0, 0, 5]} />
//           <CosmicBorders />
//           <CameraEffects />
//         </Suspense>

//         <Preload all />
//       </Canvas>
//     </div>
//   );
// };

// export default StarsCanvas;
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Ring, Torus, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { Vector3, Color } from "three";

// 🌀 High-Speed Black Hole (Does NOT affect stars)
const BlackHole = ({ position }) => {
  const ref = useRef();
  const diskRef = useRef();
  const materialRef = useRef();
  const speed = useRef(0.02);
  let scaleFactor = useRef(1);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 1.5;
      ref.current.position.z -= delta * speed.current;
      scaleFactor.current += delta * 0.1;
      ref.current.scale.set(scaleFactor.current, scaleFactor.current, scaleFactor.current);
    }

    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 2;
    }

    if (materialRef.current) {
      const time = performance.now() * 0.002;
      materialRef.current.emissive = new Color(`hsl(${(time * 200) % 360}, 100%, 50%)`);
    }

    // Reset when black hole moves far
    if (ref.current.position.z < -10) {
      ref.current.position.z = 5;
      scaleFactor.current = 1;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={ref} args={[0.3, 64, 64]}>
        <meshStandardMaterial ref={materialRef} color="black" metalness={1} roughness={0.1} emissive="black" />
      </Sphere>

      <Ring ref={diskRef} args={[0.35, 0.7, 64]}>
        <meshStandardMaterial color="purple" emissive="blue" emissiveIntensity={5} transparent opacity={0.9} />
      </Ring>
    </group>
  );
};

// ✨ **Realistic Stars (Larger & Denser)**
const Stars = () => {
  const ref = useRef();
  const [positions] = useState(() => random.inSphere(new Float32Array(15000), { radius: 15 })); // Increased number

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.002;
      ref.current.rotation.y -= delta * 0.005;

      for (let i = 0; i < positions.length; i += 3) {
        const pos = new Vector3(positions[i], positions[i + 1], positions[i + 2]);
        pos.z -= delta * 1.2; // Stars move backward

        positions[i] = pos.x;
        positions[i + 1] = pos.y;
        positions[i + 2] = pos.z;

        // Reset stars when they move too far
        if (pos.z < -15) {
          positions[i] = (Math.random() - 0.5) * 25;
          positions[i + 1] = (Math.random() - 0.5) * 25;
          positions[i + 2] = 10 + Math.random() * 10;
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="white"
        size={0.015} // Larger stars
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

// 🌌 **Floating Cosmic Borders (Rings to Create Depth)**
const CosmicBorders = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  useFrame((_, delta) => {
    if (ref1.current) {
      ref1.current.rotation.x += delta * 0.2;
      ref1.current.rotation.y += delta * 0.15;
      ref1.current.position.z -= delta * 0.6;
      if (ref1.current.position.z < -12) ref1.current.position.z = 12;
    }

    if (ref2.current) {
      ref2.current.rotation.x -= delta * 0.15;
      ref2.current.rotation.y += delta * 0.1;
      ref2.current.position.z -= delta * 0.5;
      if (ref2.current.position.z < -12) ref2.current.position.z = 12;
    }

    if (ref3.current) {
      ref3.current.rotation.y += delta * 0.1;
      ref3.current.position.z -= delta * 0.7;
      if (ref3.current.position.z < -12) ref3.current.position.z = 12;
    }
  });

  return (
    <>
      <Torus ref={ref1} args={[6, 0.3, 16, 100]} position={[0, 0, 8]}>
        <meshStandardMaterial color="blue" emissive="blue" emissiveIntensity={2} />
      </Torus>

      <Torus ref={ref2} args={[5, 0.2, 16, 100]} position={[0, 0, 10]}>
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
      </Torus>

      <Torus ref={ref3} args={[7, 0.4, 16, 100]} position={[0, 0, 12]}>
        <meshStandardMaterial color="purple" emissive="purple" emissiveIntensity={2} />
      </Torus>
    </>
  );
};

// 🎥 **Immersive 3D Camera Motion**
const CameraEffects = () => {
  const { camera } = useThree();
  useFrame((_, delta) => {
    camera.position.z -= delta * 0.2;
  });
  return null;
};

// 🌌 **Main StarsCanvas Component**
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[1, 1, 1]} intensity={1} />

        <Suspense fallback={null}>
          <Stars />
          <BlackHole position={[0, 0, 5]} />
          <CosmicBorders />
          <CameraEffects />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
