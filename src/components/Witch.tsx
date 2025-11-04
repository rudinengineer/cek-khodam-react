import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useStore } from '../lib/store'
        
// type GLTFResult = GLTF & {
//     nodes: {
//       druid: THREE.SkinnedMesh
//       root: THREE.Bone
//     }
//     materials: {
//       color_main: THREE.MeshStandardMaterial
//     }
// }

type GLTFResult = any


// type ActionName = "PortalOpen" | "Still" | "Waiting";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;
type GLTFActions = any

export default function Witch(props: JSX.IntrinsicElements['group']) {
        const { actionName } = useStore()
        const group: any = useRef<THREE.Group>()
        const { nodes, materials, animations } = useGLTF('models/witch/model.gltf') as GLTFResult
        const { actions } = useAnimations<GLTFActions>(animations, group)

        React.useEffect(() => {
            actions[actionName]?.reset().fadeIn(0.5).play()
            return () => {
                actions[actionName]?.fadeOut(0.5)
            }
        }, [actionName])

        return (
            <group ref={group} {...props} dispose={null}>
                <group scale={1.91} >
                    <primitive object={nodes.root} />
                    <skinnedMesh geometry={nodes.druid.geometry} material={materials.color_main} skeleton={nodes.druid.skeleton} />
                </group>
            </group>
        )
}

useGLTF.preload('models/witch/model.gltf')