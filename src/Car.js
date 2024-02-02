import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();
  const isUpPressed = useRef(false);
  const isDownPressed = useRef(false);
  const isLeftPressed = useRef(false);
  const isRightPressed = useRef(false);
  const movingDirection = useRef("STOPPED");
  const count = useRef(0.4);
  const { nodes, materials } = useGLTF("/car.glb");

  useEffect(() => {
    document.addEventListener("keydown", startMoving);
    document.addEventListener("keyup", stopMoving);

    return () => {
      document.removeEventListener("keydown", startMoving);
      document.removeEventListener("keyup", stopMoving);
    };
  }, []);

  useFrame(() => {
    if (isUpPressed.current) {
      group.current.position.z += 0.5 * Math.cos(group.current.rotation.y);

      group.current.position.x += 0.5 * Math.sin(group.current.rotation.y);

      movingDirection.current = "FORWARDS";
    }

    if (movingDirection.current === "FORWARDS_STOPPED") {
      console.log("here");
      if (count.current <= 0) {
        movingDirection.current = "STOPPED";
      } else {
        group.current.position.z +=
          count.current * Math.cos(group.current.rotation.y);
        group.current.position.x +=
          count.current * Math.sin(group.current.rotation.y);

        count.current -= 0.01;
      }
    }

    if (movingDirection.current === "BACKWARDS_STOPPED") {
      console.log("here");
      if (count.current <= 0) {
        movingDirection.current = "STOPPED";
      } else {
        group.current.position.z -=
          count.current * Math.cos(group.current.rotation.y);
        group.current.position.x -=
          count.current * Math.sin(group.current.rotation.y);

        count.current -= 0.01;
      }
    }

    if (isDownPressed.current) {
      group.current.position.z -= 0.5 * Math.cos(group.current.rotation.y);

      group.current.position.x -= 0.5 * Math.sin(group.current.rotation.y);

      movingDirection.current = "BACKWARDS";
    }

    if (isLeftPressed.current) {
      if (
        movingDirection.current === "BACKWARDS" ||
        movingDirection.current === "BACKWARDS_STOPPED"
      )
        group.current.rotation.y -= 0.05;
      else if (
        movingDirection.current === "FORWARDS" ||
        movingDirection.current === "FORWARDS_STOPPED"
      )
        group.current.rotation.y += 0.05;
    }

    if (isRightPressed.current) {
      if (
        movingDirection.current === "BACKWARDS" ||
        movingDirection.current === "BACKWARDS_STOPPED"
      )
        group.current.rotation.y += 0.05;
      else if (
        movingDirection.current === "FORWARDS" ||
        movingDirection.current === "FORWARDS_STOPPED"
      )
        group.current.rotation.y -= 0.05;
    }
  });

  const startMoving = ({ key }) => {
    if (key === "w" || key === "W") {
      isUpPressed.current = true;
    }

    if (key === "s" || key === "S") {
      isDownPressed.current = true;
    }

    if (key === "a" || key === "A") {
      isLeftPressed.current = true;
    }

    if (key === "d" || key === "D") {
      isRightPressed.current = true;
    }
  };

  console.log(movingDirection.current);

  const stopMoving = ({ key }) => {
    if (key === "w" || key === "W") {
      isUpPressed.current = false;
      movingDirection.current = "FORWARDS_STOPPED";
      count.current = 0.4;
    }

    if (key === "s" || key === "S") {
      isDownPressed.current = false;
      movingDirection.current = "BACKWARDS_STOPPED";
      count.current = 0.4;
    }

    if (key === "a" || key === "A") {
      isLeftPressed.current = false;
    }

    if (key === "d" || key === "D") {
      isRightPressed.current = false;
    }
  };

  return (
    <group ref={group} {...props} dispose={null} position={[0, 1.5, -10]}>
      <mesh geometry={nodes.Cube.geometry} material={materials.base} />
      <mesh geometry={nodes.Cube_1.geometry} material={materials.glass} />
      <mesh geometry={nodes.Cube_2.geometry} material={materials.bumper} />
      <mesh geometry={nodes.Cube_3.geometry} material={materials.tire} />
      <mesh geometry={nodes.Cube_4.geometry} material={materials.grey} />
      <mesh geometry={nodes.Cube_5.geometry} material={materials.headlight} />
    </group>
  );
}

useGLTF.preload("/car.glb");
