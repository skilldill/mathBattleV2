import { describe, it, expect } from "bun:test";

function calculateRating(tasksResolvedCount: number, tasksCount: number, time: number): number {
  const accuracy = tasksResolvedCount / tasksCount;
  const avgTimePerTask = time / tasksCount;
  
  console.log(`Accuracy: ${accuracy}, AvgTimePerTask: ${avgTimePerTask}`);
  
  if (accuracy < 0.75) {
    const rating = Math.round(100 * accuracy * (15 / avgTimePerTask));
    console.log(`Low accuracy rating: ${rating}`);
    return rating;
  } else {
    const rating = Math.round(1000 * accuracy * (15 / avgTimePerTask));
    console.log(`High accuracy rating: ${rating}`);
    return rating;
  }
}

describe("Debug Rating Calculations", () => {
  it("should calculate 75% vs 74% correctly", () => {
    console.log("=== 75% accuracy ===");
    const exactly75 = calculateRating(75, 100, 750);
    
    console.log("=== 74% accuracy ===");
    const justBelow75 = calculateRating(74, 100, 740);
    
    console.log(`75%: ${exactly75}, 74%: ${justBelow75}`);
    
    expect(exactly75).toBe(1500);
    expect(justBelow75).toBe(150);
  });
}); 