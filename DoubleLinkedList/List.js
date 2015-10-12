/**
 * Created by Eugen on 12.10.2015.
 */

var Node = function(value) {
    this.value = value;
    this.top = null;
    this.bot = null;
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
            this.t.bot = newNode;
            newNode.top = this.t;
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
                pointer = pointer.bot;
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
                this.h = pointer.bot;
            }
            if (isTail) {
                this.t = pointer.top;
            }
            if (pointer.bot) {
                pointer.bot.top = pointer.top;
            }
            if (pointer.top) {
                pointer.top.bot = pointer.bot;
            }
            this.length--;

            return this;
        }
        return null;
    },

    insertAt: function(index, value) {
        var pointer = this.at(index);

        var newNode = new Node(value);

        if(pointer !== null) {
            pointer.top = newNode;
            newNode.bot = pointer;
            if(pointer.top) {
                pointer.top.bot = newNode;
                newNode.top = pointer.top;
            }
        }
    },

    indexOF: function(value){
        var pointer = this.t;
        while(pointer) {
            if(pointer.value === value) {
                return pointer;
            }
            pointer = pointer.bot;
        }
        return null;
    },

    each: function(func) {
        var pointer = this.h;
        while(pointer){
            func(pointer);
            pointer = pointer.bot;
        }
        return this;
    }


};

A = new DLL();

A.append(3).append(6).append(5).deleteAt(2).at(0);