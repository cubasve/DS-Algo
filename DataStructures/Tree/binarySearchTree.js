// function BinaryTreeNode(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
// }

/*
Level 0: 2^0 = 1;
Level 1: 2^1 = 2;
Level 2: 2^2 = 4;
Level 3: 2^3 = 8;

# of nodes = 2^h -1; //NOTE: height(h) starts at 1
log nodes = height/steps

log 100 = 2
10^2 = 100
*/

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while(true) {
                //is the newNode < node we're at in the tree?
                if (value < currentNode.value) {
                    //true? go LEFT
                    if (!currentNode.left) {//does currentNode already have a left node? 
                        //No node to the left
                        currentNode.left = newNode;
                        return this; //can exit out of while loop
                    }
                    //There is a node to the left of currentNode
                    currentNode = currentNode.left; //Go to the next node to find an empty spot in the tree
                } else {
                    //newNode > current node we're at in the tree?
                    //go RIGHT
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return this; //can exit out of while loop
                    }
                    //There is a node to the right of currentNode
                    currentNode = currentNode.right; //Go to the next node to find an empty spot in the tree
                }
            }
        }
    }

    lookup(value) {
        if (!this.root) {//can also do this.root === null
            return false;
        }
        let currentNode = this.root;
        while (currentNode) {//keep looping until we run out of nodes to traverse through
            //if currentNode becomes null, it means the node doesn't exist in the tree
            if (value < currentNode.value) {
                currentNode = currentNode.left; //go to the next left node to find what we're looking for
            } else if (value > currentNode.value) {
                currentNode = currentNode.right; //go to the next right node to find what we're looking for
            } else if (value === currentNode.value) {
                //We got a match - that node exists!
                return currentNode;
            }
        }
        return false; //didn't find the node in the tree - return false
    }

    remove(value) {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        let parentNode = null; //reference to parent
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currenNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (currentNode.value === value) { //We found the node we want to delete!
                //Option 1: Current node has no right child
                if (currentNode.right === null) {

                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        //If parent > current value, make current left child a child of the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left;
                        //If parent < current value, make left child a right child of parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }

                //Option 2: Right child which doesn't have a left child
                } else if (currentNode.right.left === null) {

                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        currentNode.right.left = currentNode.left;
                        //If parent > current node, make right child of the left the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right;
                        //If parent < current node, make right child a right child of the parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.right;
                        }
                    }

                //Option 3: Right child that has a left child
                } else {
                    //Find the right child's leftmost child
                    let leftmost = currentNode.right.left;
                    let leftmostParent = currentNode.right;
                    while (leftmost.left !== leftmost) {
                        leftmostParent = leftmost;
                        leftmost = leftmost.left;
                    }

                    //Parent's left subtree is now leftmost's right subtree
                    leftmostParent.left = leftmost.right;
                    leftmost.left - currentNode.left;
                    leftmost.right = currentNode.right;

                    if (parentNode === null) {
                        this.root = leftmost;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost;
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = leftmost;
                        }
                    }
                }
                return true;
            }
        }
    }
}

function traverse(node) {
    const tree = {value: node.value};
    tree.left = node.left === null ? null : traverse(node.left);
    tree.right = node.right === null ? null : traverse(node.right);
    return tree;
}
//       9
//   4       20
//1    6   15  170
const tree = new BinarySearchTree();
tree.insert(9); 
JSON.stringify(traverse(tree.root));
//'{'value': 9, 'left'L null, 'right': null}'
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
JSON.stringify(traverse(tree.root));
/*
NOTE: Copy and put into Google Developer Tools to better visualize
'{
    'value': 9, 
    'left': { 
        'value': 4, 
        'left': {value: 1, 'left': null, 'right': null},
        'right': {'value': 6, 'left': null, 'right': null}
    },
    'right': {
        'value': 20, 
        'left': {'value': 15, 'left': null, 'right': null},
        'right': {'value': 170, 'left': null, 'right': null}
    }
}'
*/
tree.lookup(9);
/*
Node {
    left: Node {
        left: Node { left: null, right: null, value: 1},
        right: Node {left: null, right: null, value: 6},
        value: 4
    },
    right: Node {
        left: Node {left: null, right: null, value: 15},
        right: Node {left: null, right: null, value: 170},
        value: 20
    },
    value: 9
}
*/

