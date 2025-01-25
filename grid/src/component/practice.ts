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

Copyclass ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
      const x = l1 ? l1.val : 0;
      const y = l2 ? l2.val : 0;
      
      const total = x + y + carry;
      carry = Math.floor(total / 10);
      
      current.next = new ListNode(total % 10);
      current = current.next;
      
      l1 = l1 ? l1.next : null;
      l2 = l2 ? l2.next : null;
  }

  return dummy.next;
}

function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
      while (charSet.has(s[right])) {
          charSet.delete(s[left]);
          left++;
      }
      
      charSet.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
      return findMedianSortedArrays(nums2, nums1);
  }

  const n1 = nums1.length;
  const n2 = nums2.length;
  const total = n1 + n2;
  const half = Math.floor((n1 + n2 + 1) / 2);

  let low = 0;
  let high = n1;

  while (low <= high) {
      const mid1 = Math.floor((low + high) / 2); 
      const mid2 = half - mid1; 

      const l1 = mid1 > 0 ? nums1[mid1 - 1] : Number.NEGATIVE_INFINITY;
      const r1 = mid1 < n1 ? nums1[mid1] : Number.POSITIVE_INFINITY;
      const l2 = mid2 > 0 ? nums2[mid2 - 1] : Number.NEGATIVE_INFINITY;
      const r2 = mid2 < n2 ? nums2[mid2] : Number.POSITIVE_INFINITY;

      if (l1 <= r2 && l2 <= r1) {
          if (total % 2 === 1) {
              return Math.max(l1, l2); 
          } else {
              return (Math.max(l1, l2) + Math.min(r1, r2)) / 2; 
          }
      } else if (l1 > r2) {
          high = mid1 - 1;
      } else {
          low = mid1 + 1;
      }
  }

  throw new Error("Input arrays are not sorted or invalid.");
}
