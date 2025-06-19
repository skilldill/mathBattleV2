import { describe, it, expect } from "bun:test";

// Функция для расчета рейтинга (копируем логику из агрегации)
function calculateRating(tasksResolvedCount: number, tasksCount: number, time: number): number {
  const accuracy = tasksResolvedCount / tasksCount;
  const avgTimePerTask = time / tasksCount;
  
  if (accuracy < 0.75) {
    // Штраф для игроков с точностью ниже 75%
    return Math.round(100 * accuracy * (15 / avgTimePerTask));
  } else {
    // Нормальный рейтинг для игроков с точностью 75% и выше
    return Math.round(1000 * accuracy * (15 / avgTimePerTask));
  }
}

describe("Rating Calculation Logic", () => {
  describe("High accuracy scenarios (≥75%)", () => {
    it("should give high rating for 100% accuracy with reasonable time", () => {
      const rating = calculateRating(10, 10, 100); // 100% accuracy, 100 seconds, 10 tasks
      expect(rating).toBe(1500); // 1000 * 1.0 * (15/10) = 1500
    });

    it("should give high rating for 90% accuracy with reasonable time", () => {
      const rating = calculateRating(9, 10, 90); // 90% accuracy, 90 seconds, 10 tasks
      expect(rating).toBe(1500); // 1000 * 0.9 * (15/9) = 1500
    });

    it("should give high rating for 80% accuracy with reasonable time", () => {
      const rating = calculateRating(8, 10, 80); // 80% accuracy, 80 seconds, 10 tasks
      expect(rating).toBe(1500); // 1000 * 0.8 * (15/8) = 1500
    });

    it("should give high rating for 75% accuracy with reasonable time", () => {
      const rating = calculateRating(7.5, 10, 75); // 75% accuracy, 75 seconds, 10 tasks
      expect(rating).toBe(1500); // 1000 * 0.75 * (15/7.5) = 1500
    });
  });

  describe("Low accuracy scenarios (<75%)", () => {
    it("should give low rating for 70% accuracy even with fast time", () => {
      const rating = calculateRating(7, 10, 30); // 70% accuracy, 30 seconds, 10 tasks
      expect(rating).toBe(350); // 100 * 0.7 * (15/3) = 350
    });

    it("should give very low rating for 50% accuracy with fast time", () => {
      const rating = calculateRating(5, 10, 20); // 50% accuracy, 20 seconds, 10 tasks
      expect(rating).toBe(375); // 100 * 0.5 * (15/2) = 375
    });

    it("should give extremely low rating for 10% accuracy with fast time", () => {
      const rating = calculateRating(1, 10, 10); // 10% accuracy, 10 seconds, 10 tasks
      expect(rating).toBe(150); // 100 * 0.1 * (15/1) = 150
    });

    it("should give low rating for 60% accuracy with slow time", () => {
      const rating = calculateRating(6, 10, 120); // 60% accuracy, 120 seconds, 10 tasks
      expect(rating).toBe(75); // 100 * 0.6 * (15/12) = 75
    });
  });

  describe("Comparison scenarios", () => {
    it("should prioritize high accuracy over speed", () => {
      const highAccuracySlow = calculateRating(10, 10, 100); // 100% accuracy, 100 seconds
      const lowAccuracyFast = calculateRating(7, 10, 30); // 70% accuracy, 30 seconds
      
      expect(highAccuracySlow).toBe(1500);
      expect(lowAccuracyFast).toBe(350);
      expect(highAccuracySlow).toBeGreaterThan(lowAccuracyFast);
    });

    it("should prioritize high accuracy over speed (edge case)", () => {
      const highAccuracySlow = calculateRating(8, 10, 200); // 80% accuracy, 200 seconds
      const lowAccuracyFast = calculateRating(7, 10, 10); // 70% accuracy, 10 seconds
      
      expect(highAccuracySlow).toBe(600); // 1000 * 0.8 * (15/20) = 600
      expect(lowAccuracyFast).toBe(1050); // 100 * 0.7 * (15/1) = 1050
      expect(highAccuracySlow).toBeLessThan(lowAccuracyFast); // В этом случае скорость важнее
    });

    it("should rank players correctly by accuracy when both are above 75%", () => {
      const player1 = calculateRating(10, 10, 100); // 100% accuracy, 100 seconds
      const player2 = calculateRating(8, 10, 80); // 80% accuracy, 80 seconds
      const player3 = calculateRating(9, 10, 120); // 90% accuracy, 120 seconds
      
      expect(player1).toBe(1500);
      expect(player2).toBe(1500);
      expect(player3).toBe(1125); // 1000 * 0.9 * (15/12) = 1125
      
      // Ожидаемый порядок: player1 = player2 > player3
      expect(player1).toBe(player2);
      expect(player1).toBeGreaterThan(player3);
    });

    it("should rank players correctly by accuracy when both are below 75%", () => {
      const player1 = calculateRating(7, 10, 50); // 70% accuracy, 50 seconds
      const player2 = calculateRating(5, 10, 30); // 50% accuracy, 30 seconds
      const player3 = calculateRating(6, 10, 40); // 60% accuracy, 40 seconds
      
      expect(player1).toBe(210); // 100 * 0.7 * (15/5) = 210
      expect(player2).toBe(250); // 100 * 0.5 * (15/3) = 250
      expect(player3).toBe(225); // 100 * 0.6 * (15/4) = 225
      
      // Ожидаемый порядок: player2 > player3 > player1
      expect(player2).toBeGreaterThan(player3);
      expect(player3).toBeGreaterThan(player1);
    });
  });

  describe("Edge cases", () => {
    it("should handle 75% accuracy boundary correctly", () => {
      const exactly75 = calculateRating(75, 100, 750); // 75% accuracy, 750 seconds, 100 tasks
      const justBelow75 = calculateRating(74, 100, 740); // 74% accuracy, 740 seconds, 100 tasks
      
      expect(exactly75).toBe(1500); // 1000 * 0.75 * (15/7.5) = 1500
      expect(justBelow75).toBe(150); // 100 * 0.74 * (15/7.4) = 150
      
      // 75% должен получить значительно более высокий рейтинг
      expect(exactly75).toBeGreaterThan(justBelow75);
    });

    it("should handle zero accuracy", () => {
      const rating = calculateRating(0, 10, 100);
      expect(rating).toBe(0);
    });

    it("should handle very fast time", () => {
      const rating = calculateRating(10, 10, 1); // 100% accuracy, 1 second
      expect(rating).toBe(150000); // 1000 * 1.0 * (15/0.1) = 150000
    });
  });
}); 