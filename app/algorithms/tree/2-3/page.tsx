"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Node {
  values: number[];
  children: Node[];
}

class TwoThreeTree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  insert(value: number): void {
    if (!this.root) {
      this.root = { values: [value], children: [] };
      return;
    }

    const insertHelper = (node: Node): void => {
      if (node.values.length < 2) {
        node.values.push(value);
        node.values.sort((a, b) => a - b);
      } else {
        if (node.children.length === 0) {
          node.values.push(value);
          node.values.sort((a, b) => a - b);
          this.split(node);
        } else {
          const index =
            value < node.values[0] ? 0 : value < node.values[1] ? 1 : 2;
          insertHelper(node.children[index]);
        }
      }
    };

    insertHelper(this.root);
  }

  split(node: Node): void {
    const middleValue = node.values[1];
    const leftNode: Node = { values: [node.values[0]], children: [] };
    const rightNode: Node = { values: [node.values[2]], children: [] };

    if (node === this.root) {
      this.root = { values: [middleValue], children: [leftNode, rightNode] };
    } else {
      const parent = this.findParent(this.root!, node);
      if (parent) {
        const index = parent.children.indexOf(node);
        parent.children.splice(index, 1, leftNode, rightNode);
        parent.values.push(middleValue);
        parent.values.sort((a, b) => a - b);
        if (parent.values.length > 2) {
          this.split(parent);
        }
      }
    }
  }

  findParent(currentNode: Node, targetNode: Node): Node | null {
    if (currentNode.children.includes(targetNode)) {
      return currentNode;
    }
    for (let child of currentNode.children) {
      const result = this.findParent(child, targetNode);
      if (result) return result;
    }
    return null;
  }
}

const TwoThreeTreeAnimation: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [tree, setTree] = useState<TwoThreeTree | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = (): void => {
    const newNumbers = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * 1000)
    );
    setNumbers(newNumbers);
    setTree(new TwoThreeTree());
    setCurrentIndex(0);
    console.log("newNumbers", newNumbers);
  };

  const startAnimation = (): void => {
    setIsAnimating(true);
    animateInsertion();
  };

  const animateInsertion = (): void => {
    if (currentIndex < numbers.length && tree) {
      tree.insert(numbers[currentIndex]);
      setTree({
        ...tree,
        insert: tree.insert,
        split: tree.split,
        findParent: tree.findParent,
      });
      setCurrentIndex(currentIndex + 1);
      setTimeout(animateInsertion, 500);
    } else {
      setIsAnimating(false);
    }
  };

  const renderNode = (
    node: Node | null,
    x: number,
    y: number,
    width: number
  ): JSX.Element | null => {
    if (!node) return null;
    const nodeWidth = 60;
    const nodeHeight = 30;
    const childSpacing = width / (node.children.length || 1);

    return (
      <g key={node.values.join("-")}>
        <rect
          x={x - nodeWidth / 2}
          y={y}
          width={nodeWidth}
          height={nodeHeight}
          fill="white"
          stroke="black"
        />
        <text
          x={x}
          y={y + nodeHeight / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {node.values.join(",")}
        </text>
        {node.children.map((child, index) => (
          <React.Fragment key={index}>
            <line
              x1={x}
              y1={y + nodeHeight}
              x2={x - width / 2 + childSpacing * (index + 0.5)}
              y2={y + 70}
              stroke="black"
            />
            {renderNode(
              child,
              x - width / 2 + childSpacing * (index + 0.5),
              y + 70,
              childSpacing
            )}
          </React.Fragment>
        ))}
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Button onClick={startAnimation} disabled={isAnimating}>
        Create 2-3 Tree
      </Button>
      <div className="mt-4">Current Index: {currentIndex}</div>
      <svg width="1000" height="600">
        {tree && renderNode(tree.root, 500, 30, 1000)}
      </svg>
    </div>
  );
};

export default TwoThreeTreeAnimation;
