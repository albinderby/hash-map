import { LINKED_LIST } from "./linked_list.js";

class HASHMAP {
    loadFactor;
    capcacity = 16;
    filledBuckets = 0;
    bucket = new Array(this.capcacity);
    length = 0;

    set(key, value, skipCapacityCheck = false) {
        const hash = this.#hash(key);
        if (this.bucket[hash] === undefined) {
            const linkedlist = new LINKED_LIST();
            linkedlist.append({ key, value });
            this.bucket[hash] = linkedlist;
            this.filledBuckets++;
            this.length++;
        } else {
            const node = this.bucket[hash].find(key);
            if (node) {
                node.data.value = value;
            } else {
                this.bucket[hash].prepend({ key, value });
                this.length++;
            }
        }
        if (!skipCapacityCheck) {
            this.#checkTheCapacity();
        }


    }

    get(key) {
        const hash = this.#hash(key);
        if (!this.bucket[hash]) return null;
        const result = this.bucket[hash].find(key);
        return result ? result.data.value : null;
    }

    has(key) {
        const hash = this.#hash(key);
        return this.bucket[hash] ? !!this.bucket[hash].find(key) : false;
    }

    remove(key) {
        const hash = this.#hash(key);
        const index = this.bucket[hash].findIndex(key);
        if (index !== null) {
            this.bucket[hash].removeAt(index);
            this.length--;
            return true;
        }
        return false;
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.capcacity = 16;
        this.filledBuckets = 0;
        this.bucket = new Array(this.capcacity);
        this.length = 0;
    }
    keys() {
        const array = [];
        for (const element of this.bucket) {
            if (element) {
                let pointer = element.getHead();
                while (pointer) {
                    array.push(pointer.data.key);
                    pointer = pointer.next;
                }
            }
        }
        return array;
    }
    values() {
        const array = [];
        for (const element of this.bucket) {
            if (element) {
                let pointer = element.getHead();
                while (pointer) {
                    array.push(pointer.data.value);
                    pointer = pointer.next;
                }
            }
        }
        return array;
    }
    entries() {
        const array = [];
        for (const element of this.bucket) {
            if (element) {
                let pointer = element.getHead();
                while (pointer) {
                    const pair = [pointer.data.key, pointer.data.value];
                    array.push(pair);
                    pointer = pointer.next;
                }
            }
        }
        return array;
    }
    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capcacity;
        }
        return hashCode;
    }

    #checkTheCapacity() {
        this.loadFactor = this.filledBuckets / this.capcacity;
        if (this.loadFactor >= 0.75) {
            this.capcacity = this.capcacity * 2;
            this.#rehash();
        }

    }

    #rehash() {
        const oldbucket = this.bucket;
        this.length = 0;
        this.bucket = new Array(this.capcacity);
        oldbucket.forEach((list) => {
            if (!list) return;
            let pointer = list.getHead();
            while (pointer) {
                this.set(pointer.data.key, pointer.data.value, true);
                pointer = pointer.next;
            }
        })
    }
}


const map = new HASHMAP();
map.set("name", "albin");

console.log(map.entries());
console.log(map.values());
console.log(map.keys());
console.log(map.has("name"));
console.log(map.getLength());