"use strict";
const DStruct = {

    MultiDimensionalArray: class {
        
        constructor(dimensions, arrayTypeClass) {
            arrayTypeClass = arrayTypeClass || Array;
            this._validateArgs(dimensions, arrayTypeClass);
            this.dimensions = dimensions;
            this.nofDimensions = dimensions.length;
            this.baseArrayLength = this._calcBaseArrayLength(dimensions);
            this.data = new arrayTypeClass(this.baseArrayLength);
        }

        _validateArgs(dimensions, arrayTypeClass) {
            if(!dimensions) {
                throw new Error('Dimensions array is required.');
            }
        }

        _calcBaseArrayLength(dimensions) {
            let length = 1;
            dimensions.forEach(v => length *= v);
            return length;
        }

        _toIndex(...positionals) {
            let index = 0;
            for(let di = 0; di < positionals.length; di++) {
                let add = positionals[di];
                for(let dj = 0; dj < di; dj++) {
                    add *= this.dimensions[dj];
                }
                index += add;
            }
            return index;
        }

        _toPositionals(index) {
            let positionals = new Int32Array(this.nofDimensions);
            positionals[0] = index % this.dimensions[0];
            for(let di = 1; di < this.nofDimensions; di++) {
                let toFloor = index;
                for(let dj = 0; dj < di; dj++) {
                    toFloor /= this.dimensions[dj];
                }
                positionals[di] = Math.floor(toFloor);
            }
            return positionals;
        }

        get(...positionals) {
            return this.data[this._toIndex(...positionals)];
        }

        put(value, ...positionals) {
            return this.data[this._toIndex(...positionals)] = value;
        }

        inRange(...positionals) {
            return this._toIndex(...positionals) < this.baseArrayLength;
        }

        iterate(callback) {
            for(let i = 0; i < this.baseArrayLength; i++) {
                callback(this.data[i], this._toPositionals(i));
            }
            return this;
        }
        
    }



};