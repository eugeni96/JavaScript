/**
 * Created by Eugen on 12.10.2015.
 */

var Node = function(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
};
var DLL = function(){

    this.h = null;
    this.t = null;

    this.length = 0;
};

DLL.prototype = {

    constructor: DLL,

    //+head (returns head of the list)
    //+tail (returns tail of the list)
    //+append (param: new data; add new item to the end of the list)
    //+deleteAt (param: index; deletes item by index; error handling)
    //+at (returns item by index; error handling)
    //+insertAt (inserts item by index; new item should be placed at the specified index)
    //reverse (rearranges the list's items back-to-front)
    //+each (param: function; applies specified function to each item of the list)
    //+indexOF(param: item; return index of the specified item (first entry))

    head: function() {
        return this.h;
    },

    tail: function () {
        return this.t;
    },

    append: function(value) {

        var newNode = new Node(value);

        if(this.length === 0) {
            this.h = newNode;
            this.t = newNode;
        }
        else {
            this.t.next = newNode;
            newNode.prev = this.t;
            this.t = newNode;
        }
        this.length++;
        return this;
    },

    at: function(index){

        if(index === this.length -1){
            return this.t;
        }

        if(index >= 0 && index < this.length) {
            var k = 0;
            var pointer = this.h;
            while(k < index){
                pointer = pointer.next;
                k++;
            }
            return pointer;
        }
        return null;
    },

    deleteAt: function (index) {
        var pointer = this.at(index);
        var isHead = this.h === pointer;
        var isTail = this.t === pointer;

        if (pointer !== null) {
            if (isHead) {
                this.h = pointer.next;
            }
            if (isTail) {
                this.t = pointer.prev;
            }
            if (pointer.next) {
                pointer.next.prev = pointer.prev;
            }
            if (pointer.prev) {
                pointer.prev.next = pointer.next;
            }
            this.length--;

            return this;
        }
        return null;
    },

    reverse: function() {
        var temp =  this.h;
        this.h = this.t;
        this.t = temp;
        var p = this.h;
        while(p!=null)
        {
            temp = p.next;
            p.next = p.prev;
            p.prev = temp;
            p = p.next;
        }
        return this;
    },

    insertAt: function(index, value) {
        var pointer = this.at(index);

        var newNode = new Node(value);

        if(pointer !== null) {
            pointer.prev = newNode;
            newNode.next = pointer;
            if(pointer.prev) {
                pointer.prev.next = newNode;
                newNode.prev = pointer.prev;
            }
        }
    },

    indexOF: function(value){
        var pointer = this.t;
        while(pointer) {
            if(pointer.value === value) {
                return pointer;
            }
            pointer = pointer.next;
        }
        return null;
    },

    each: function(func) {
        var pointer = this.h;
        while(pointer){
            func(pointer);
            pointer = pointer.next;
        }
        return this;
    }


};

A = new DLL();

A.append(3).append(6).append(5).reverse().deleteAt(2).at(0);