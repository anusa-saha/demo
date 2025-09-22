import React, { useEffect, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Avatar(props) {
    const { scene } = useGLTF('/models/Avatar.glb')
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)

    const { animations: IdleAnimation } = useFBX('/animation/Idle.fbx')
    const { animations: GreetingAnimation } = useFBX('/animation/Greeting.fbx')
    const { animations: TalkingAnimation } = useFBX('/animation/Talking.fbx')

    const [animation, setAnimation] = useState("Greeting")
    const group = useRef()

    // Process animations
    const processedAnimations = React.useMemo(() => {
        const animations = []

        if (IdleAnimation && IdleAnimation[0]) {
            IdleAnimation[0].name = 'Idle'
            animations.push(IdleAnimation[0])
        }

        if (GreetingAnimation && GreetingAnimation[0]) {
            GreetingAnimation[0].name = 'Greeting'
            animations.push(GreetingAnimation[0])
        }

        if (TalkingAnimation && TalkingAnimation[0]) {
            TalkingAnimation[0].name = 'Talking'
            animations.push(TalkingAnimation[0])
        }

        return animations
    }, [IdleAnimation, GreetingAnimation, TalkingAnimation])

    const { actions } = useAnimations(processedAnimations, group)

    useEffect(() => {
        if (actions && actions[animation]) {
            // Stop all other actions first
            Object.values(actions).forEach(action => {
                if (action && action !== actions[animation]) {
                    action.stop()
                }
            })

            // Play current animation
            actions[animation].reset().fadeIn(0.5).play()

            return () => {
                if (actions[animation]) {
                    actions[animation].fadeOut(0.5)
                }
            }
        }
    }, [animation, actions])

    // Don't render until we have the required nodes
    if (!nodes || !nodes.Hips) {
        return null
    }

    return (
        <group {...props} dispose={null} ref={group}>
            <primitive object={nodes.Hips} />
            {nodes.Wolf3D_Body && (
                <skinnedMesh
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                />
            )}
            {nodes.Wolf3D_Hair && (
                <skinnedMesh
                    geometry={nodes.Wolf3D_Hair.geometry}
                    material={materials.Wolf3D_Hair}
                    skeleton={nodes.Wolf3D_Hair.skeleton}
                />
            )}
            {nodes.Wolf3D_Outfit_Bottom && (
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                />
            )}
            {nodes.Wolf3D_Outfit_Footwear && (
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                />
            )}
            {nodes.Wolf3D_Outfit_Top && (
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                />
            )}
            {nodes.EyeLeft && (
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                />
            )}
            {nodes.EyeRight && (
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                />
            )}
            {nodes.Wolf3D_Head && (
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                />
            )}
            {nodes.Wolf3D_Teeth && (
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                />
            )}
        </group>
    )
}

useGLTF.preload('/models/Avatar.glb')