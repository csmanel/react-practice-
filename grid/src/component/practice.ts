// ts two sum
function twoSum(nums: number[], target: number): number[] | undefined {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return undefined;
}
class Solution {
  maxProfit(prices: number[]): number {
    let buy: number = prices[0];
    let profit: number = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < buy) {
        buy = prices[i];
      } else if (prices[i] - buy > profit) {
        profit = prices[i] - buy;
      }
    }

    return profit;
  }
}
