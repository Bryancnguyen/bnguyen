import { Vector3 } from "three";

const tempVect = new Vector3();

export const calcRandomPosition = (offset: number = 5000) => {
  tempVect.set(
    (Math.random() - 0.5) * offset,
    (Math.random() - 0.5) * offset,
    (Math.random() - 0.5) * offset
  );
  return tempVect;
};
