const CM_TO_POINTS = 28.3465;

export function cmToPoints(cm: number): number {
  return Math.round(cm * CM_TO_POINTS * 100) / 100;
}

export function pointsToCm(points: number): number {
  return Math.round((points / CM_TO_POINTS) * 100) / 100;
}
