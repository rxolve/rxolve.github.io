const Algorithms = () => {
  const input = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

  const dp = new Array(input.length).fill(0);
  const kadane = (arr: number[]) => {
    dp[0] = arr[0];
    dp[1] = arr[0] + arr[1] > arr[1] ? arr[0] + arr[1] : arr[1];
    for (let i = 2; i < arr.length; i++) {
      dp[i] = dp[i - 1] + arr[i] > arr[i] ? dp[i - 1] + arr[i] : arr[i];
    }
    return Math.max(...dp);
  };

  return (
    <div>
      <h1>Algorithms</h1>
      <h2>Kadane's Algorithm</h2>
      <p>
        Given an integer array nums, find the contiguous subarray (containing at
        least one number) which has the largest sum and return its sum.
      </p>
      {kadane(input)}
    </div>
  );
};

export default Algorithms;
