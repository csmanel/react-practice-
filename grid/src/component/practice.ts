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

const romanToInt = (s: string): number => {
  let res: number = 0;
  const roman: Record<string, number> = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
  };

  for (let i = 0; i < s.length - 1; i++) {
      if (roman[s[i]] < roman[s[i + 1]]) {
          res -= roman[s[i]];
      } else {
          res += roman[s[i]];
      }
  }

  return res + roman[s[s.length - 1]];
};

class Solution {
  longestCommonPrefix(v: string[]): string {
      let ans = "";
      v.sort(); 
      let first = v[0];
      let last = v[v.length - 1];

      for (let i = 0; i < Math.min(first.length, last.length); i++) {
          if (first[i] !== last[i]) {
              return ans;
          }
          ans += first[i];
      }
      return ans;
  }
}

function threeSum(nums: number[]): number[][] {
  let res: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
          continue;
      }

      let j = i + 1;
      let k = nums.length - 1;

      while (j < k) {
          let total = nums[i] + nums[j] + nums[k];

          if (total > 0) {
              k--;
          } else if (total < 0) {
              j++;
          } else {
              res.push([nums[i], nums[j], nums[k]]);
              j++;

              while (j < k && nums[j] === nums[j - 1]) {
                  j++;
              }
          }
      }
  }
  return res;
}

class Solution {
  threeSumClosest(nums: number[], target: number): number {
      nums.sort((a, b) => a - b);
      let n: number = nums.length;
      let minDiff: number = Number.MAX_VALUE;
      let ans: number = 0;

      for (let i = 0; i < n - 2; i++) {
          let low: number = i + 1,
              high: number = n - 1;

          while (low < high) {
              let temp: number = nums[i] + nums[low] + nums[high];

              if (Math.abs(target - temp) < minDiff) {
                  ans = temp;
                  minDiff = Math.abs(target - temp);
              }

              if (temp === target) {
                  return target;
              } else if (temp > target) {
                  high--;
              } else {
                  low++;
              }
          }
      }
      return ans;
  }
}

function letterCombinations(digits: string): string[] {
  if (!digits.length) {
      return [];
  }
  
  const digitToLetters: Record<string, string> = {
      '2': 'abc',
      '3': 'def',
      '4': 'ghi',
      '5': 'jkl',
      '6': 'mno',
      '7': 'pqrs',
      '8': 'tuv',
      '9': 'wxyz'
  };
  
  const res: string[] = [];
  
  function backtrack(idx: number, comb: string): void {
      if (idx === digits.length) {
          res.push(comb);
          return;
      }
      
      for (const letter of digitToLetters[digits[idx]]) {
          backtrack(idx + 1, comb + letter);
      }
  }
  
  backtrack(0, "");
  
  return res;    
}

function fourSum(nums: number[], target: number): number[][] {
  const res: number[][] = [];
  nums.sort((a, b) => a - b);
  const seen = new Set<string>(); 

  for (let i = 0; i < nums.length - 3; i++) {
      for (let j = i + 1; j < nums.length - 2; j++) {
          let li = j + 1;
          let ri = nums.length - 1;

          while (li < ri) {
              const sum = nums[i] + nums[j] + nums[li] + nums[ri];

              if (sum > target) {
                  ri--;
              } else if (sum < target) {
                  li++;
              } else {
                  const quad = [nums[i], nums[j], nums[li], nums[ri]];
                  const key = quad.join(","); 

                  if (!seen.has(key)) {
                      seen.add(key);
                      res.push(quad);
                  }

                  ri--;
                  li++;
              }
          }
      }
  }

  return res;
}

class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val?: number, next?: ListNode | null) {
      this.val = val ?? 0;
      this.next = next ?? null;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let res = new ListNode(0, head); 
  let dummy: ListNode | null = res;
  let fast: ListNode | null = head;

  for (let i = 0; i < n; i++) {
      if (fast) fast = fast.next;
  }

  while (fast) {
      fast = fast.next;
      dummy = dummy!.next;
  }

  if (dummy && dummy.next) {
      dummy.next = dummy.next.next;
  }

  return res.next; 
}

const isValid = (s: string): boolean => {
  const stack: string[] = [];
  const mapping: Record<string, string> = {
      ')': '(',
      '}': '{',
      ']': '['
  };

  for (const c of s) {
      if (Object.values(mapping).includes(c)) {
          stack.push(c);
      } else if (mapping.hasOwnProperty(c)) {
          if (!stack.length || mapping[c] !== stack.pop()) {
              return false;
          }
      }
  }

  return stack.length === 0;
};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
  }
}

const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
  let dummy = new ListNode();
  let cur = dummy;

  while (list1 && list2) {
      if (list1.val > list2.val) {
          cur.next = list2;
          list2 = list2.next;
      } else {
          cur.next = list1;
          list1 = list1.next;
      }
      cur = cur.next;
  }

  cur.next = list1 || list2;

  return dummy.next;
};

class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
  }
}

class Solution {
  mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
      if (!l1) return l2;
      if (!l2) return l1;
      
      if (l1.val < l2.val) {
          l1.next = this.mergeTwoLists(l1.next, l2);
          return l1;
      } else {
          l2.next = this.mergeTwoLists(l1, l2.next);
          return l2;
      }
  }
  
  mergeKLists(lists: Array<ListNode | null>): ListNode | null {
      if (lists.length === 0) return null;
      return this.divideAndConquer(lists, 0, lists.length - 1);
  }
  
  private divideAndConquer(lists: Array<ListNode | null>, left: number, right: number): ListNode | null {
      if (left === right) return lists[left];
      
      const mid = left + Math.floor((right - left) / 2);
      const l1 = this.divideAndConquer(lists, left, mid);
      const l2 = this.divideAndConquer(lists, mid + 1, right);
      
      return this.mergeTwoLists(l1, l2);
  }
}

function swapPairs(head: ListNode | null): ListNode | null {
  let dummy: ListNode = new ListNode(0, head);
  let prev: ListNode | null = dummy;
  let cur: ListNode | null = head;

  while (cur && cur.next) {
      let npn: ListNode | null = cur.next.next;
      
      let second: ListNode | null = cur.next;
      
      second.next = cur;
      cur.next = npn;
      prev.next = second;

      prev = cur;
      cur = npn;
  }

  return dummy.next;
}

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
  }
}

const swapPairs = (head: ListNode | null): ListNode | null => {
  let dummy = new ListNode(0, head);
  let prev = dummy;
  let cur = head;

  while (cur && cur.next) {
      let npn = cur.next.next;
      let second = cur.next;

      second.next = cur;
      cur.next = npn;
      prev.next = second;

      prev = cur;
      cur = npn;
  }

  return dummy.next;
};

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
  }
}

class Solution {
  reverseKGroup(head: ListNode | null, k: number): ListNode | null {
      if (head === null) return null;

      let tail: ListNode | null = head;
      for (let i = 0; i < k; i++) {
          if (tail === null) return head;
          tail = tail.next;
      }

      let newHead = this.reverse(head, tail);
      head.next = this.reverseKGroup(tail, k);
      return newHead;
  }

  private reverse(head: ListNode | null, tail: ListNode | null): ListNode | null {
      let prev: ListNode | null = null;
      let curr: ListNode | null = head;

      while (curr !== tail) {
          let next: ListNode | null = curr!.next;
          curr!.next = prev;
          prev = curr;
          curr = next;
      }

      return prev;
  }
}

// 27
function removeDuplicates(nums: number[]): number {
  let j: number = 1;
  for (let i: number = 1; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1]) {
          nums[j] = nums[i];
          j++;
      }
  }
  return j;
}

// 28 
function removeElement(nums: number[], val: number): number {
  let index: number = 0;
  for (let i: number = 0; i < nums.length; i++) {
      if (nums[i] !== val) {
          nums[index] = nums[i];
          index++;
      }
  }
  return index;
}

// 29 
function divide(dividend: number, divisor: number): number {
  if (dividend === divisor) {
      return 1;
  }
  
  const isPositive: boolean = (dividend < 0) === (divisor < 0);
  
  let a: number = Math.abs(dividend);
  const b: number = Math.abs(divisor);
  let ans: number = 0;
  
  while (a >= b) {
      let q: number = 0;
      while (a > (b << (q + 1))) {
          q++;
      }
      ans += (1 << q);
      a = a - (b << q);
  }
  
  if (ans === (1 << 31) && isPositive) {
      return Number.MAX_SAFE_INTEGER;
  }
  
  return isPositive ? ans : -ans;
}

// 30

class Solution {
  private map: Map<string, number>;

  findSubstring(s: string, words: string[]): number[] {
      const result: number[] = [];
      const length: number = words[0].length;

      this.map = new Map();
      for (const word of words) {
          this.map.set(word, (this.map.get(word) || 0) + 1);
      }

      for (let offset = 0; offset < length; ++offset) {
          let size = 0;
          const seen: Map<string, number> = new Map();

          for (let i = offset; i + length <= s.length; i += length) {
              const sub = s.substring(i, i + length);

              if (!this.map.has(sub)) {
                  seen.clear();
                  size = 0;
                  continue;
              }

              seen.set(sub, (seen.get(sub) || 0) + 1);
              size++;

              while (seen.get(sub)! > this.map.get(sub)!) {
                  const first = s.substring(i - (size - 1) * length, i - (size - 1) * length + length);
                  seen.set(first, seen.get(first)! - 1);
                  size--;
              }

              if (size === words.length) {
                  result.push(i - (size - 1) * length);
              }
          }
      }

      return result;
  }
}