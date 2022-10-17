class Node {
    constructor(val){
        this.val=val;
        this.next=null;
        this.prev=null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head=null;
        this.tail=null;
        this.length=0;
    }
    push(val){
        var newNode = new Node(val);
        if(!this.head){
            this.head=newNode;
            this.tail=this.head;
        }else{
            var prevTail=this.tail
            prevTail.next = newNode;
            this.tail= newNode;
            this.tail.prev=prevTail;
        }
        this.length++;
        return this;
    }
    
    pop(){
         if(this.length===0){
            return undefined;
        }
        if(this.length===1){
            this.head=null;
            this.tail=null;
            
        }else{
            var poppedTail = this.tail
            this.tail=poppedTail.prev;
            this.tail.next=null;
            poppedTail.prev=null;
            
        }
        this.length--;
        return poppedTail;
    }

    shift(){
        if(this.length===0){
            return undefined;
        }
        if(this.length===1){
            this.head=null;  
            this.tail=null;
            
        }else{
            var poppedHead = this.head;
            this.head=this.head.next;
            this.head.prev=null;
            poppedHead.next=null;
        }
        this.length--;
        return poppedHead;
    }
    unShift(val){
        var newNode = new Node(val);
        if(this.length===0){
            this.head=newNode;  
            this.tail=newNode;
        }else{
            var oldHead= this.head;
            this.head=newNode;
            oldHead.prev=newNode;
            this.head.next=oldHead;
            this.head.prev=null;
        }
        this.length++;
        return this
    }

    get(index){
        if(index<0 || index>=this.length){
            return null;
        }
        var node =this.head;
        for(var i=0; i<this.length; i++){
            if(i===index){
                return node;
            }
            node = node.next;
        }
    }
    set(val, index){
        var node= this.get(index);
        if(node){
            node.val = val;
            return true
        }
        return false
    }
}

var dll = new DoublyLinkedList();

dll.push(1);
dll.push(2);
dll.push(3);
dll.push(4);