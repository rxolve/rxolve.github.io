"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

const TreeNodeComponent: React.FC<{ node: TreeNode<number> }> = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
        {node.value}
      </div>
      <div className="flex mt-4">
        {node.left && (
          <div className="mr-2">
            <TreeNodeComponent node={node.left} />
          </div>
        )}
        {node.right && (
          <div className="ml-2">
            <TreeNodeComponent node={node.right} />
          </div>
        )}
      </div>
    </div>
  );
};

const BinaryTreePage: React.FC = () => {
  const [tree] = useState(new BinaryTree<number>());
  const [value, setValue] = useState("");
  const [, setUpdateTrigger] = useState({});

  const handleInsert = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      tree.insert(num);
      setValue("");
      setUpdateTrigger({}); // 강제 리렌더링
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Visual Binary Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a number"
              className="mr-2"
            />
            <Button onClick={handleInsert}>Insert</Button>
          </div>
          <div className="mt-4">
            {tree.root && <TreeNodeComponent node={tree.root} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BinaryTreePage;
