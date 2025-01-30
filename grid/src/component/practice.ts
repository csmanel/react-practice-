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

function longestPalindrome(s: string): string {
  const n = s.length;
  if (n <= 1) return s;

  let maxLen = 1;
  let maxStr = s[0];
  const dp: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
      dp[i][i] = true;
  }
  for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (s[j] === s[i] && (i - j <= 2 || dp[j + 1][i - 1])) {
              dp[j][i] = true;

              if (i - j + 1 > maxLen) {
                  maxLen = i - j + 1;
                  maxStr = s.substring(j, i + 1);
              }
          }
      }
  }

  return maxStr;
}

const convert = (s: string, numRows: number): string => {
  if (numRows === 1 || numRows >= s.length) {
      return s;
  }

  const rows: string[] = Array.from({ length: numRows }, () => '');
  let idx = 0;
  let direction = 1; 

  for (const char of s) {
      rows[idx] += char;

      if (idx === 0) {
          direction = 1;
      } else if (idx === numRows - 1) {
          direction = -1;
      }

      idx += direction;
  }

  return rows.join('');
};

const reverse = (x: number): number => {
  const isNegative = x < 0;
  x = Math.abs(x);

  let reversed = 0;

  while (x > 0) {
      const digit = x % 10;
      x = Math.floor(x / 10);

      if (reversed > Math.floor((2 ** 31 - 1) / 10) || 
         (reversed === Math.floor((2 ** 31 - 1) / 10) && digit > 7)) {
          return 0;
      }

      reversed = reversed * 10 + digit;
  }

  return isNegative ? -reversed : reversed;
};

import { computed } from 'vue'

interface Drive {
  model: string
  serial?: string
  guid?: string
}

interface Server {
  hostid: string
}

export const useDriveNaming = (server: Server) => {
  const driveIndexKey = (drive: Drive) => {
    // Create a unique key for the drive within this server
    const driveId = drive.serial || drive.guid
    return `drive_index_${driveId}`
  }

  const getNextDriveIndex = (variables: Map<string, string>) => {
    // Find the highest existing index for this server
    let maxIndex = 0
    variables.forEach((value, key) => {
      if (key.startsWith(`${server.hostid}drive_index_`)) {
        const index = parseInt(value)
        if (!isNaN(index) && index > maxIndex) {
          maxIndex = index
        }
      }
    })
    return maxIndex + 1
  }

  const getDriveIndex = (
    drive: Drive,
    getVariable: (id: string) => string | null,
    setVariable: (params: { id: string, value: string | null }) => void
  ) => {
    const key = driveIndexKey(drive)
    let index = getVariable(key)
    
    if (!index) {
      // If no index exists, get the next available one
      const nextIndex = getNextDriveIndex(variables.value)
      setVariable({ id: key, value: nextIndex.toString() })
      index = nextIndex.toString()
    }
    
    return index
  }

  const createDriveTitle = (
    drive: Drive,
    getVariable: (id: string) => string | null,
    setVariable: (params: { id: string, value: string | null }) => void
  ) => {
    return computed(() => {
      const index = getDriveIndex(drive, getVariable, setVariable)
      return `Disk ${index}`
    })
  }

  return {
    getDriveIndex,
    createDriveTitle
  }
}

const title = computed(() => {                                    // Creates a reactive computed property
  const driveKey = `drive_${props.drive.serial || props.drive.guid}`  // Creates unique key for this drive using serial or guid
  let number = getVariable(driveKey)                             // Checks if this drive already has a number assigned
  
  if (!number) {                                                 // If this drive doesn't have a number yet...
    const counterKey = 'drive_counter'                           // Key for storing the overall drive count
    const currentCount = getVariable(counterKey) || '0'          // Get current count (or '0' if none exists)
    const newCount = (parseInt(currentCount) + 1).toString()     // Increment the count by 1
    
    setVariable({ id: counterKey, value: newCount })            // Save the new count for future drives
    setVariable({ id: driveKey, value: newCount })              // Assign this number to our drive
    number = newCount                                           // Use this new number for our title
  }

  return `Disk ${number}`                                       // Format the final disk name
})

class Solution {
  isMatch(s: string, p: string): boolean {
      const m = s.length;
      const n = p.length;
      const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
      dp[0][0] = true; 

      for (let j = 1; j <= n; ++j) {
          if (p[j - 1] === '*' && j >= 2) {
              dp[0][j] = dp[0][j - 2];
          }
      }
      for (let i = 1; i <= m; ++i) {
          for (let j = 1; j <= n; ++j) {
              if (p[j - 1] === '*' && j >= 2) {
                  dp[i][j] = dp[i][j - 2];
                  if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                      dp[i][j] = dp[i][j] || dp[i - 1][j];
                  }
              } else {
                  if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                      dp[i][j] = dp[i - 1][j - 1];
                  }
              }
          }
      }

      return dp[m][n];
  }
}

function maxArea(height: number[]): number {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
      maxArea = Math.max(maxArea, (right - left) * Math.min(height[left], height[right]));

      if (height[left] < height[right]) {
          left++;
      } else {
          right--;
      }
  }

  return maxArea;
}

const intToRoman = (num: number): string => {
  const valueSymbols: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  
  let res: string = '';

  for (const [value, symbol] of valueSymbols) {
      if (num === 0) break;
      const count: number = Math.floor(num / value);
      res += symbol.repeat(count);
      num -= count * value;
  }

  return res;
};
