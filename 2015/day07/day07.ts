import { readFileSync } from 'fs';
import { exit } from 'process';

const inputFile = 'input.txt';

const input: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

/**
 * AND OR NOT LSHIFT RSHIFT ASSIGN
 */

function part01() {
    function limitTo16bit(signal: number):number {
        let newSignal: number = signal;
        if (signal > 65535) {
            newSignal = signal % 65535;
        }
        else if (signal < 0) {
            newSignal = 65535+signal+1;
        }
        
        return newSignal;
    }

    function findInstructionOfWire(wireName: string, instructions: string[]): string {
        let instruction: string = '';

        for (let i=0; i<instructions.length; i++) {
            let currInstruction: string = instructions[i];
            // -> wireName
            // 3 + wireName.length
            if (currInstruction.slice(-(3+wireName.length)) === ('-> '+wireName)) {
                instruction = currInstruction;
                break;
            }
        }
        if (instruction == '') {
            console.error('COULD NOT FIND INSTRUCTION ' + wireName);
            exit();
        }

        return instruction;
    }

    function calculateInstruction (instruction: string, values: number []): number {
        switch(instruction) {
            case 'AND':
                return limitTo16bit(values[0] & values[1]);
            case 'OR':
                return limitTo16bit(values[0] | values[1]);
            case 'NOT':
                return limitTo16bit(~values[0]);
            case 'LSHIFT':
                return limitTo16bit(values[0] << values[1]);
            case 'RSHIFT':
                return limitTo16bit(values[0] >> values[1]);
        }

        return 0;
    }

    function findSignalOfWire(wire: string, instructions: string[]): number {
        // check if in known inputs, if yes, return the value
        if (knownInputs.has(wire)) return knownInputs.get(wire) as number;
        
        // parse the instruction
        const currInput: string[] = findInstructionOfWire(wire, instructions).split(' ');
        console.log(currInput);
        // calculate the input
        let value: number = 0;
        if (currInput.length == 3) {
            let toCalculateWire = Number(currInput[0]);
            if (isNaN(toCalculateWire)) {
                value = findSignalOfWire(currInput[0], instructions);
            } else {
                value = toCalculateWire;
            }
        } else if (currInput.includes('NOT')) {
            let toCalculateWire: number = findSignalOfWire(currInput[1], instructions);
            value = calculateInstruction('NOT', [toCalculateWire]);
        } else if (currInput.includes('AND')) {
            //  isNaN(+maybeNumber) // returns true if NaN, otherwise false
            // if the value is number, use it. otherwise check for the wires value
            let toCalculate1;
            let toCalculate2;
            if (isNaN(Number(currInput[0]))) {
                toCalculate1 = findSignalOfWire(currInput[0], instructions);
            } else {
                toCalculate1 = Number(currInput[0]);
            }
            if (isNaN(Number(currInput[2]))) {
                toCalculate2 = findSignalOfWire(currInput[2], instructions);
            } else {
                toCalculate2 = Number(currInput[2]);
            }
            value = calculateInstruction('AND', [toCalculate1, toCalculate2]);
        } else if (currInput.includes('OR')) {
            let toCalculate1;
            let toCalculate2;
            if (isNaN(Number(currInput[0]))) {
                toCalculate1 = findSignalOfWire(currInput[0], instructions);
            } else {
                toCalculate1 = Number(currInput[0]);
            }
            if (isNaN(Number(currInput[2]))) {
                toCalculate2 = findSignalOfWire(currInput[2], instructions);
            } else {
                toCalculate2 = Number(currInput[2]);
            }
            value = calculateInstruction('OR', [toCalculate1, toCalculate2]);
        } else if (currInput.includes('LSHIFT')) {
            let toCalculateWire1: number = findSignalOfWire(currInput[0], instructions);
            let toCalculateWire2: number = Number(currInput[2]);
            value = calculateInstruction('LSHIFT', [toCalculateWire1, toCalculateWire2]);
        } else if (currInput.includes('RSHIFT')) {
            let toCalculateWire1: number = findSignalOfWire(currInput[0], instructions);
            let toCalculateWire2: number = Number(currInput[2]);
            value = calculateInstruction('RSHIFT', [toCalculateWire1, toCalculateWire2]);
        }

        //add to known inputs
        knownInputs.set(wire, value);
        return value;
    }

    const instructions: string[] = input.split('\n');
    const knownInputs: Map<string, number> = new Map<string, number>();

    console.log(findSignalOfWire('a', instructions));
}

function part02() {
    function limitTo16bit(signal: number):number {
        let newSignal: number = signal;
        if (signal > 65535) {
            newSignal = signal % 65535;
        }
        else if (signal < 0) {
            newSignal = 65535+signal+1;
        }
        
        return newSignal;
    }

    function findInstructionOfWire(wireName: string, instructions: string[]): string {
        let instruction: string = '';

        for (let i=0; i<instructions.length; i++) {
            let currInstruction: string = instructions[i];
            // -> wireName
            // 3 + wireName.length
            if (currInstruction.slice(-(3+wireName.length)) === ('-> '+wireName)) {
                instruction = currInstruction;
                break;
            }
        }
        if (instruction == '') {
            console.error('COULD NOT FIND INSTRUCTION ' + wireName);
            exit();
        }

        return instruction;
    }

    function calculateInstruction (instruction: string, values: number []): number {
        switch(instruction) {
            case 'AND':
                return limitTo16bit(values[0] & values[1]);
            case 'OR':
                return limitTo16bit(values[0] | values[1]);
            case 'NOT':
                return limitTo16bit(~values[0]);
            case 'LSHIFT':
                return limitTo16bit(values[0] << values[1]);
            case 'RSHIFT':
                return limitTo16bit(values[0] >> values[1]);
        }

        return 0;
    }

    function findSignalOfWire(wire: string, instructions: string[]): number {
        // check if in known inputs, if yes, return the value
        if (knownInputs.has(wire)) return knownInputs.get(wire) as number;
        
        // parse the instruction
        const currInput: string[] = findInstructionOfWire(wire, instructions).split(' ');
        console.log(currInput);
        // calculate the input
        let value: number = 0;
        if (currInput.length == 3) {
            let toCalculateWire = Number(currInput[0]);
            if (isNaN(toCalculateWire)) {
                value = findSignalOfWire(currInput[0], instructions);
            } else {
                value = toCalculateWire;
            }
        } else if (currInput.includes('NOT')) {
            let toCalculateWire: number = findSignalOfWire(currInput[1], instructions);
            value = calculateInstruction('NOT', [toCalculateWire]);
        } else if (currInput.includes('AND')) {
            //  isNaN(+maybeNumber) // returns true if NaN, otherwise false
            // if the value is number, use it. otherwise check for the wires value
            let toCalculate1;
            let toCalculate2;
            if (isNaN(Number(currInput[0]))) {
                toCalculate1 = findSignalOfWire(currInput[0], instructions);
            } else {
                toCalculate1 = Number(currInput[0]);
            }
            if (isNaN(Number(currInput[2]))) {
                toCalculate2 = findSignalOfWire(currInput[2], instructions);
            } else {
                toCalculate2 = Number(currInput[2]);
            }
            value = calculateInstruction('AND', [toCalculate1, toCalculate2]);
        } else if (currInput.includes('OR')) {
            let toCalculate1;
            let toCalculate2;
            if (isNaN(Number(currInput[0]))) {
                toCalculate1 = findSignalOfWire(currInput[0], instructions);
            } else {
                toCalculate1 = Number(currInput[0]);
            }
            if (isNaN(Number(currInput[2]))) {
                toCalculate2 = findSignalOfWire(currInput[2], instructions);
            } else {
                toCalculate2 = Number(currInput[2]);
            }
            value = calculateInstruction('OR', [toCalculate1, toCalculate2]);
        } else if (currInput.includes('LSHIFT')) {
            let toCalculateWire1: number = findSignalOfWire(currInput[0], instructions);
            let toCalculateWire2: number = Number(currInput[2]);
            value = calculateInstruction('LSHIFT', [toCalculateWire1, toCalculateWire2]);
        } else if (currInput.includes('RSHIFT')) {
            let toCalculateWire1: number = findSignalOfWire(currInput[0], instructions);
            let toCalculateWire2: number = Number(currInput[2]);
            value = calculateInstruction('RSHIFT', [toCalculateWire1, toCalculateWire2]);
        }

        //add to known inputs
        knownInputs.set(wire, value);
        return value;
    }

    const instructions: string[] = input.split('\n');
    const knownInputs: Map<string, number> = new Map<string, number>();

    const firstSignalOfA = findSignalOfWire('a', instructions);
    //override b with a
    //clear the known inputs
    knownInputs.clear();
    knownInputs.set('b', firstSignalOfA);

    console.log(findSignalOfWire('a', instructions));
}

//part01();
part02();
