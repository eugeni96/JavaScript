/**
 * Created by Eugen on 05.10.2015.
 */

var Node = function(value){
    return {
        value: value,
        left: null,
        right: null
    };
};

var BST = function () {

    this.root = null;

};

BST.prototype = {

    constructor: BST,

    insertNode: function(value, node) {
    if (value < node.value) {
        if (node.left !== null)
            this.insertNode(value, node.left);
        else
            node.left = new Node(value);
    }
    else {
        if (node.right !== null)
            this.insertNode(value, node.right);
        else
            node.right = new Node(value);
        }
    },


    findNode: function(value, node) {
        if (node === null)
            return null;
        if (value === node.value) {
            return node;
        }
        else {
            if (value < node.value) {
                return this.findNode(value, node.left);
            }
            else {
                return this.findNode(value, node.right);
            }
        }
    },


    traverseNode: function(node) {
        if (node !== null) {
            this.traverseNode(node.left);
            alert(node.value);
            this.traverseNode(node.right);
        }
    },


    insert: function (value) {
        //value check must be added here
        if (this.root !== null) {
            this.insertNode(value, this.root);
        }
        else {
            this.root = new Node(value);
        }
        return this;
    },

    traverse: function() {
        this.traverseNode(this.root);
    },

    find: function(value) {
        //some value check
        return this.findNode(value, this.root);
    }

};


var extendedBST = function() {
    BST.apply(this,arguments);
};

extendedBST.prototype = Object.create(BST.prototype);



extendedBST.prototype.findMin = function(node) {
    var pointer = node;
    while(pointer.left){
        pointer = pointer.left;
    }
    return pointer;
};

extendedBST.prototype.removeNode = function(value, node) {
    var exist = false;
    var pointer = node;
    var parent = null;
    while(!exist && pointer){
        if(value < pointer.value){
            parent = pointer;
            pointer = pointer.left;
        }
        if(value > pointer.value){
            parent = pointer;
            pointer = pointer.right;
        }
        else {
            exist = true;
        }

        if(exist){
            if(!pointer.left && !pointer.right){
                pointer = null;
                return this;
            }

            if(pointer.left && !pointer.right){
                if(pointer.value < parent.value) {
                    parent.left = pointer.left;
                }
                else{
                    parent.right = pointer.left;
                }
                return this;
            }
            if(pointer.right && !pointer.left){
                if(pointer.value < parent.value) {
                    parent.left = pointer.right;
                }
                else{
                    parent.right = pointer.right;
                }
                return this;
            }

            if(pointer.right && pointer.left){

                var temp;
                temp = this.findMin(pointer.right);
                pointer.value = temp.value;
                this.removeNode(temp);
                return this;
            }
        }
    }
};

extendedBST.prototype.remove = function(value){
    this.removeNode(value, this.root);
};



extendedBST.prototype.constructor = BST;

var t = new extendedBST();
t.insert(8);
t.insert(3);
t.insert(10);
t.insert(1);
t.insert(6);
t.insert(4);
t.insert(7);
t.insert(14);
t.insert(13);

//t.traverse();

t.find(7);

t.remove(4);