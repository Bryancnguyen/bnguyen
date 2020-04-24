import { Vector3 } from "three";

const tempVect = new Vector3();

export const calcRandomPosition = () => {
  tempVect.set(
    (Math.random() - 0.5) * 5000,
    (Math.random() - 0.5) * 5000,
    (Math.random() - 0.5) * 5000
  );
  return tempVect;
};
