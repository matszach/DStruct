"use strict";
const DStruct = {

    Array2D: class {
        
        constructor(width, height, arrayTypeClass) {
            arrayTypeClass = arrayTypeClass || Array;
            this._validateArgs(width, height, arrayTypeClass);
            this.width = width;
            this.height = height;
            this.baseArrayLength = width * height;
            this.data = new arrayTypeClass(this.baseArrayLength);
        }

        _validateArgs(width, height, arrayTypeClass) {
            if(!width || !height) {
                throw new Error('Width and height of array are required.');
            }
        }

        _toIndex(x, y) {
            return x + y * this.width;
        }

        _toPositionals(index) {
            const arr = new Int32Array(2);
            arr[0] = index % this.width;
            arr[1] = Math.floor(index / this.width);
            return arr;
        }

        get(x, y) {
            return this.data[this._toIndex(x, y)];
        }

        put(value, x, y) {
            return this.data[this._toIndex(x, y)] = value;
        }

        inRange(x, y) {
            return this._toIndex(x, y) < this.baseArrayLength;
        }

        iterate(callback) {
            for(let i = 0; i < this.baseArrayLength; i++) {
                const [x, y] = this._toPositionals(i);
                callback(this.data[i], x, y);
            }
            return this;
        }
        
    }

};