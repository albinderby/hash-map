// i am using classes for this for this project to learn classes

export class LINKED_LIST {
    size = 0;
    head;
    tail;
    getSize() { return this.size; }
    getHead() { return this.head; }
    getTail() { return this.tail; }

    append(value) {
        const newNode = new NODE(value, null);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
        this.size++;
    }
    prepend(value) {
        if (!this.head) {
            this.append(value);
        } else {
            const newNode = new NODE(value);
            let temp = this.head;
            this.head = newNode;
            this.head.next = temp;
            this.size++;
        }
    }

    at(index) {
        if (index > this.size || index < 0) return null;
        let counter = 0;
        let pointer = this.head;
        while (counter !== index && pointer.next) {
            pointer = pointer.next;
            counter++;
        }
        return pointer;
    }

    pop() {
        let pointer = this.head;
        if (this.head === null) return "list is empty";
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.size--;
            return
        }
        while (pointer.next !== this.tail) {
            pointer = pointer.next;
        }
        pointer.next = null;
        this.tail = pointer;
        this.size--;
    }
    contains(value) {
        let pointer = this.head;
        while (pointer) {
            if (pointer.data === value) return true;
            pointer = pointer.next;
        }
        return false;
    }
    find(key) {
        let pointer = this.head;
        while (pointer) {
            if (pointer.data.key === key) {
                return pointer;
            }   
            pointer = pointer.next
        }
        return null;
    }

    toString() {
        let string = "";
        let pointer = this.head;
        while (pointer) {
            string += `( ${pointer.data} ) ->`;
            pointer = pointer.next;
        }
        return string += pointer;
    }
    insertAt(value, index) {

        if (index > this.size || index < 0) {
            console.log("the provided index is not in the list");
            return;
        }
        if (index == 0) {
            this.prepend(value);
            return;
        }
        let prev = this.at(index - 1);
        const newNode = new NODE(value);
        newNode.next = prev.next;
        prev.next = newNode;
        this.size++;
    }
    removeAt(index) {

        if (index < 0 || index >= this.size) return;
        if (this.head === this.tail) {
            this.head = this.tail = null;
            this.size--;
            return
        }
        if (index == 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let prev = this.at(index - 1);
        if (prev.next === this.tail) {
            prev.next = prev.next.next;
            this.tail = prev;
        } else {
            prev.next = prev.next.next;
        }
        this.size--;
    }
}

 class NODE {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}



const linkedlist = new LINKED_LIST();
