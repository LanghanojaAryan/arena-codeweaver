// Mock data for the CodeArena application

export const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    company: "Amazon",
    acceptanceRate: 89.2,
    status: "Solved",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: "2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ]
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    topic: "Linked List",
    company: "Microsoft",
    acceptanceRate: 76.5,
    status: "Attempted",
    description: "You are given two non-empty linked lists representing two non-negative integers.",
    constraints: "The number of nodes in each linked list is in the range [1, 100].\n0 ≤ Node.val ≤ 9",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      }
    ]
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    company: "Google",
    acceptanceRate: 45.8,
    status: "Unsolved",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    constraints: "nums1.length == m\nnums2.length == n\n0 ≤ m ≤ 1000\n0 ≤ n ≤ 1000",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      }
    ]
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "String",
    company: "Facebook",
    acceptanceRate: 68.3,
    status: "Solved",
    description: "Given a string s, return the longest palindromic substring in s.",
    constraints: "1 ≤ s.length ≤ 1000\ns consist of only digits and English letters.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: 'Note: "aba" is also a valid answer.'
      }
    ]
  },
  {
    id: 5,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Two Pointers",
    company: "Apple",
    acceptanceRate: 72.1,
    status: "Solved",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
    constraints: "n == height.length\n2 ≤ n ≤ 10⁵\n0 ≤ height[i] ≤ 10⁴",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      }
    ]
  }
];

export const mockContests = [
  {
    id: 1,
    title: "Weekly Contest 382",
    status: "Live",
    startTime: "2024-01-15T14:30:00Z",
    duration: 90,
    participants: 15420,
    problems: [
      { id: 1, title: "Find Missing and Repeated Values", points: 3, status: "Submitted" },
      { id: 2, title: "Divide Array Into Arrays With Max Difference", points: 4, status: "Attempted" },
      { id: 3, title: "Minimum Number of Operations to Make Array Empty", points: 5, status: "Unattempted" },
      { id: 4, title: "Minimum Window Substring", points: 6, status: "Unattempted" }
    ]
  },
  {
    id: 2,
    title: "Biweekly Contest 121",
    status: "Upcoming",
    startTime: "2024-01-20T18:30:00Z",
    duration: 120,
    participants: 8750,
    problems: [
      { id: 5, title: "Distribute Candies Among Children I", points: 3, status: "Unattempted" },
      { id: 6, title: "Distribute Candies Among Children II", points: 4, status: "Unattempted" },
      { id: 7, title: "Distribute Candies Among Children III", points: 5, status: "Unattempted" },
      { id: 8, title: "Count Subarrays Where Max Element Appears at Least K Times", points: 7, status: "Unattempted" }
    ]
  },
  {
    id: 3,
    title: "Educational Round 162",
    status: "Ended",
    startTime: "2024-01-10T15:30:00Z",
    duration: 135,
    participants: 12340,
    problems: [
      { id: 9, title: "Cyclic Permutations", points: 3, status: "Submitted" },
      { id: 10, title: "Robots", points: 4, status: "Submitted" },
      { id: 11, title: "Candy Party", points: 5, status: "Attempted" },
      { id: 12, title: "Subsequence Covering", points: 6, status: "Unattempted" }
    ]
  }
];

export const mockSubmissions = [
  {
    id: 1,
    problemTitle: "Two Sum",
    language: "JavaScript",
    status: "Accepted",
    runtime: "68 ms",
    memory: "44.2 MB",
    submittedAt: "2024-01-15T10:30:00Z",
    code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
  },
  {
    id: 2,
    problemTitle: "Add Two Numbers",
    language: "Python",
    status: "Wrong Answer",
    runtime: "N/A",
    memory: "N/A",
    submittedAt: "2024-01-14T16:45:00Z",
    code: `def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    
    while l1 or l2:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        total = val1 + val2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next
        
        if l1: l1 = l1.next
        if l2: l2 = l2.next
    
    return dummy.next`
  }
];

export const mockActivityData = [
  { date: '2024-01-01', count: 2 },
  { date: '2024-01-02', count: 1 },
  { date: '2024-01-03', count: 4 },
  { date: '2024-01-04', count: 0 },
  { date: '2024-01-05', count: 3 },
  { date: '2024-01-06', count: 1 },
  { date: '2024-01-07', count: 2 },
  { date: '2024-01-08', count: 5 },
  { date: '2024-01-09', count: 2 },
  { date: '2024-01-10', count: 3 },
  { date: '2024-01-11', count: 1 },
  { date: '2024-01-12', count: 4 },
  { date: '2024-01-13', count: 2 },
  { date: '2024-01-14', count: 1 },
  { date: '2024-01-15', count: 3 },
];

export const mockRatingHistory = [
  { date: '2024-01-01', rating: 1200 },
  { date: '2024-01-03', rating: 1245 },
  { date: '2024-01-07', rating: 1289 },
  { date: '2024-01-10', rating: 1356 },
  { date: '2024-01-15', rating: 1398 },
  { date: '2024-01-20', rating: 1445 },
  { date: '2024-01-25', rating: 1512 },
  { date: '2024-01-30', rating: 1578 },
  { date: '2024-02-05', rating: 1634 },
  { date: '2024-02-10', rating: 1689 },
  { date: '2024-02-15', rating: 1745 },
  { date: '2024-02-20', rating: 1801 },
  { date: '2024-02-25', rating: 1847 },
];

export const mockTopicSkills = [
  { topic: 'Array', proficiency: 85 },
  { topic: 'String', proficiency: 78 },
  { topic: 'Dynamic Programming', proficiency: 65 },
  { topic: 'Graph', proficiency: 72 },
  { topic: 'Tree', proficiency: 80 },
  { topic: 'Binary Search', proficiency: 68 },
  { topic: 'Two Pointers', proficiency: 82 },
  { topic: 'Hash Map', proficiency: 90 },
];

export const mockSubmissionStats = [
  { verdict: 'Accepted', count: 892, percentage: 71 },
  { verdict: 'Wrong Answer', count: 156, percentage: 12.4 },
  { verdict: 'Time Limit Exceeded', count: 89, percentage: 7.1 },
  { verdict: 'Runtime Error', count: 67, percentage: 5.3 },
  { verdict: 'Memory Limit Exceeded', count: 34, percentage: 2.7 },
  { verdict: 'Compilation Error', count: 18, percentage: 1.4 },
];

export const difficulty = {
  Easy: { solved: 156, total: 178 },
  Medium: { solved: 156, total: 1679 },
  Hard: { solved: 30, total: 689 }
};