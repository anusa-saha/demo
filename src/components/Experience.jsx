import { OrbitControls, Environment } from "@react-three/drei";
import { Avatar } from "./Avatar.jsx";

export const Experience = () => {
    return (
        <>
            {/* Controls */}
            <OrbitControls enablePan={false} />

            {/* Lights */}
            <directionalLight castShadow position={[5, 5, 5]} intensity={1.5} />
            <ambientLight intensity={0.3} />

            {/* Model */}
            <Avatar scale={1.5} position={[0, -1.5, 0]} />

            {/* Environment */}
            <Environment preset="sunset" />
        </>
    );
};
