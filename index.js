import fs from "fs";

export class Learn {
    constructor(input) {
        this.input = input;
        return this;
    }

    learn(){

        let output = [];
        for(let i = 0; i < this.input[0].length; i++){
            let sum = 0;
            for(let j = 0; j < this.input.length; j++){
                // check to see if the number is between -1 and 1
                if(this.input[j][i] > 1 || this.input[j][i] < -1){
                    throw new Error("All numbers must be between -1 and 1, At Array: " + j + " Index: " + i);
                }
                sum += this.input[j][i];
            }
            output.push(sum / this.input.length);
        }
        this.trained = output;
        return this;
    }

    guess(input){
        // The input is an array of numbers that are between -1 and 1, that are the same length as the this.trained array.
        // Basically, we return a number from -1 to 1, and that number tells us how close we are to the actual answer.

        if(input.length !== this.trained.length){
            throw new Error("Input length must be the same as the trained length!");
        }

        let sum = 0;
        for(let i = 0; i < input.length; i++){
            sum += Math.abs(input[i] - this.trained[i]);
        }
        return 1 - (sum / input.length);
    }

    export(){
        return this.trained;
    }
    
    import(input){
        this.trained = input;
        return this;
    }
}

let ourData = [
    1, 0, 0, 0.5, 0.5, 0.5, 0.5, 0, 0, 0,
    0, 0, 0.5, 1, 1, 1, 1, 0.5, 0, 0,
    0, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 0,
    0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0.5,
    0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0.5,
    0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0.5,
    0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0.5,
    0, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 0,
    0, 0, 0.5, 1, 1, 1, 1, 0.5, 0, 0,
    0, 0, 0, 0.5, 0.5, 0.5, 0.5, 0, 0, 1
]; // Super close, but not quite to the circle. (That we have in data.json)


// Fetch the arrays that resemble a circle.
let array = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// Make a Model.
let Model = new Learn(array)

// Train the Model.
Model.learn()

// Now, we can use the model to make guesses.
console.log(Model.guess(ourData)) // 0.98 - Extremely close to the actual answer.


// Now, lets say we want to save the model to a file, so we can use it later.
fs.writeFileSync("./trained.json", JSON.stringify(Model.export()), "utf8");
