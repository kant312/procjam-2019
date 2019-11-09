export function randomiser(sketch) {
  return (max) => {
    return sketch.random(max);
  }
} 