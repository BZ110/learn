import fs from "fs";

class Learn {
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

let data = fs.readFileSync("data.json", {
    encoding: "utf8"
})

data = JSON.parse(data);

let learn = new Learn(data);

learn.learn();

let input = fs.readFileSync("res.json", {
    encoding: "utf8"
})

input = JSON.parse(input);

let output = learn.guess(input);

console.log(output);