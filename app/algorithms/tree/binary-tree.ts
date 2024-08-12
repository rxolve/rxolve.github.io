// 노드 클래스 정의
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 새로운 노드를 이진 탐색 트리에 삽입하는 함수
const insert = (root: TreeNode | null, key: number): TreeNode => {
  // 트리가 비어 있으면 새로운 노드를 반환
  if (!root) {
    return new TreeNode(key);
  }

  // 현재 노드의 값과 삽입할 값을 비교하여 좌우 자식으로 이동
  if (key < root.value) {
    root.left = insert(root.left, key);
  } else {
    root.right = insert(root.right, key);
  }
  return root;
};

// 중위 순회를 통해 트리의 노드를 출력하는 함수
const inorderTraversal = (root: TreeNode | null): void => {
  if (root) {
    // 왼쪽 자식을 먼저 순회
    inorderTraversal(root.left);
    // 현재 노드의 값을 출력
    console.log(root.value);
    // 오른쪽 자식을 순회
    inorderTraversal(root.right);
  }
};

// 노드의 높이를 계산하는 함수
const height = (node: TreeNode | null): number => {
  if (node === null) {
    return 0;
  }
  // 왼쪽 서브트리와 오른쪽 서브트리 중 더 큰 값에 1을 더합니다.
  return Math.max(height(node.left), height(node.right)) + 1;
};

// 노드의 Balance Factor를 계산하는 함수
const getBalanceFactor = (node: TreeNode | null): number => {
  if (node === null) {
    return 0;
  }

  return height(node.left) - height(node.right);
};

// 트리의 각 노드에 대해 Balance Factor를 출력하는 함수
const printBalanceFactors = (root: TreeNode | null): void => {
  if (root !== null) {
    printBalanceFactors(root.left);
    console.log(
      `Node Value: ${root.value}, Balance Factor: ${getBalanceFactor(root)}`
    );
    printBalanceFactors(root.right);
  }
};

// 예제 트리 생성 및 Balance Factor 출력
let root: TreeNode | null = null;
root = insert(root, 10);
root = insert(root, 5);
root = insert(root, 15);
root = insert(root, 3);
root = insert(root, 7);

printBalanceFactors(root);
