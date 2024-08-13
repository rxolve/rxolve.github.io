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

// 오른쪽 회전 함수
const rightRotate = (y: TreeNode): TreeNode => {
  const x = y.left!; // y의 왼쪽 자식
  const T2 = x.right; // x의 오른쪽 서브트리

  // 회전 수행
  x.right = y; // y를 x의 오른쪽 자식으로
  y.left = T2; // T2를 y의 왼쪽 자식으로

  return x;
};

// 왼쪽 회전 함수
const leftRotate = (x: TreeNode): TreeNode => {
  const y = x.right!; // x의 오른쪽 자식
  const T2 = y.left; // y의 왼쪽 서브트리

  // 회전 수행
  y.left = x; // x를 y의 왼쪽 자식으로
  x.right = T2; // T2를 x의 오른쪽 자식으로

  return y;
};

// 노드의 균형을 맞추는 함수
const balanceNode = (node: TreeNode): TreeNode => {
  const balanceFactor = getBalanceFactor(node);

  // 왼쪽-왼쪽 케이스
  if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
    return rightRotate(node);
  }

  // 오른쪽-오른쪽 케이스
  if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
    return leftRotate(node);
  }

  // 왼쪽-오른쪽 케이스
  if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
    node.left = leftRotate(node.left!);
    return rightRotate(node);
  }

  // 오른쪽-왼쪽 케이스
  if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
    node.right = rightRotate(node.right!);
    return leftRotate(node);
  }

  return node;
};

// AVL 트리에 새로운 노드를 삽입하는 함수
const insertAVL = (root: TreeNode | null, key: number): TreeNode => {
  // 일반적인 BST 삽입 수행
  if (!root) {
    return new TreeNode(key);
  }

  if (key < root.value) {
    root.left = insertAVL(root.left, key);
  } else if (key > root.value) {
    root.right = insertAVL(root.right, key);
  } else {
    // 중복 키는 허용하지 않음
    return root;
  }

  // 노드의 균형을 맞춤
  return balanceNode(root);
};

let avlRoot: TreeNode | null = null;
avlRoot = insertAVL(avlRoot, 10);
avlRoot = insertAVL(avlRoot, 20);
avlRoot = insertAVL(avlRoot, 30);
avlRoot = insertAVL(avlRoot, 40);
avlRoot = insertAVL(avlRoot, 50);
avlRoot = insertAVL(avlRoot, 25);

console.log("AVL Tree 중위 순회:");
inorderTraversal(avlRoot);

console.log("\nAVL Tree 균형 인수:");
printBalanceFactors(avlRoot);
