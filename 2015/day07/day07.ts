import { readFileSync } from 'fs';

const inputFile = 'input.txt';

/**
 * 
    123 -> x means that the signal 123 is provided to wire x.
    x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
    p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
    NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
    OR (bitwise OR) and RSHIFT (right-shift)
 */

const circuitInstructions: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

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

    const instructions: string[][] = circuitInstructions.split('\n')
    .map( (inst: string) => {
        return inst.split(' ');
    } );

    let wires = new Map<string, number>();
    
    instructions.forEach( (instruction: string[]) => {
        if (instruction.length == 3) {
            // set value
            let signal: number = Number(instruction[0]);
            wires.set(instruction[2], limitTo16bit(signal));
        } else if (instruction[0] === 'NOT') {
            let signal: number = wires.get(instruction[1]) as number;
            wires.set(instruction[3], limitTo16bit(~ signal));
        } else if (instruction[1] === 'AND') {
            let signal1: number = wires.get(instruction[0]) as number;
            let signal2: number = wires.get(instruction[2]) as number;
            wires.set(instruction[4], limitTo16bit(signal1 & signal2));
        } else if (instruction[1] === 'OR') {
            let signal1: number = wires.get(instruction[0]) as number;
            let signal2: number = wires.get(instruction[2]) as number;
            wires.set(instruction[4], limitTo16bit(signal1 | signal2));
        } else if (instruction[1] === 'LSHIFT') {
            let signal1: number = wires.get(instruction[0]) as number;
            let signal2: number = Number(instruction[2]);
            wires.set(instruction[4], limitTo16bit(signal1 << signal2));
        } else if (instruction[1] === 'RSHIFT') {
            let signal1: number = wires.get(instruction[0]) as number;
            let signal2: number = Number(instruction[2]);
            wires.set(instruction[4], limitTo16bit(signal1 >> signal2));
        }
    } );

    console.log(wires.get('a'));
}

function part02() {

}

part01();
//part02();
