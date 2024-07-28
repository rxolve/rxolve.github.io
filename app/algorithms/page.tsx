const Algorithms = () => {
  const input = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

  const timSort = (array: number[]): number[] => {
    const MIN_MERGE = 64;

    const merge = (left: number[], right: number[]): number[] => {
      const result: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      // 두 배열을 비교하여 작은 값부터 결과 배열에 추가합니다.
      while (leftIndex < left.length && rightIndex < right.length) {
        const leftItem = left[leftIndex];
        const rightItem = right[rightIndex];

        if (leftItem < rightItem) {
          result.push(leftItem);
          leftIndex += 1;
        } else {
          result.push(rightItem);
          rightIndex += 1;
        }
      }

      // 남은 요소들을 결과 배열에 추가합니다.
      return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
    };

    const insertionSort = (arr: number[], left: number, right: number) => {
      for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = temp;
      }
    };

    const timSort = (arr: number[], n: number) => {
      for (let i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
      }

      for (let size = MIN_MERGE; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
          let mid = Math.min(left + size - 1, n - 1);
          let right = Math.min(left + 2 * size - 1, n - 1);

          if (mid < right) {
            const leftPart = arr.slice(left, mid + 1);
            const rightPart = arr.slice(mid + 1, right + 1);
            const mergedPart = merge(leftPart, rightPart);
            for (let i = 0; i < mergedPart.length; i++) {
              arr[left + i] = mergedPart[i];
            }
          }
        }
      }
    };

    timSort(array, array.length);

    return array;
  };

  return (
    <div>
      <h1>Algorithms</h1>
      <h2>Tim Sort</h2>
      <p>
        <strong>Input:</strong> {input.join(", ")}
      </p>
      <p>
        <strong>Output:</strong> {timSort(input).join(", ")}
      </p>
    </div>
  );
};

export default Algorithms;
