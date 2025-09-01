import { LINKED_LIST } from "./linked_list";

class HASHMAP {
    loadFactor;
    capcacity = 16;
    filledBuckets = 0;
    bucket = new Array(this.capcacity);


    set(key, value, skipCapacityCheck = false) {
        const hash = this.#hash(key);
        if (this.bucket[hash] === undefined) {
            const linkedlist = new LINKED_LIST();
            linkedlist.append({ key, value });
            this.bucket[hash] = linkedlist;
            this.filledBuckets++;
        } else {
            const node = this.bucket[hash].find(key);
            if (node) {
                node.data.value = value;
            } else {
                this.bucket[hash].prepend({ key, value });
            }
        }
        if (!skipCapacityCheck) {
            this.#checkTheCapacity();
        }


    }

    get(key) {
        const hash = this.#hash(key);
        if(!this.bucket[hash])return null;
        const result = this.bucket[hash].find(key);
        return result ? result.data.value : null;
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


