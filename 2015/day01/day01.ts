import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const instructions: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');


function part01() {
    let floor: number = 0;
    for (let i=0; i<instructions.length; i++) {
        let currChar = instructions.charAt(i);
        floor += currChar === '(' ? 1 : -1 ;
    }

    console.log(floor);
}

function part02() {
    let position: number = -1;
    let floor: number = 0;
    for (let i=0; i<instructions.length; i++) {
        let currChar = instructions.charAt(i);
        floor += currChar === '(' ? 1 : -1 ;
        if (floor < 0) {
            position = i+1;
            break;
        }
    }

    console.log(position);
}

part01();
part02();
