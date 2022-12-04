import { readFileSync } from 'fs';
import md5 from 'md5';

const inputFile = 'input.txt';

const secretKey: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

function part01() {
    let positiveNumber: number = 1;
    let currHash: string = '';
    
    while (true) {
        let currKey: string = `${secretKey}${positiveNumber}`
        currHash = md5(currKey);
        console.log(`${currKey}) ${currHash}`);
        let firstFive = currHash.slice(0, 5);
        if (firstFive === '00000') {
            break;
        }
        positiveNumber++;
    }

    console.log(`The lowest number to match: ${positiveNumber}`);
}

function part02() {
    let positiveNumber: number = 1;
    let currHash: string = '';
    
    while (true) {
        let currKey: string = `${secretKey}${positiveNumber}`
        currHash = md5(currKey);
        console.log(`${currKey} -> ${currHash}`);
        let firstSix = currHash.slice(0, 6);
        if (firstSix === '000000') {
            break;
        }
        positiveNumber++;
    }

    console.log(`The lowest number to match: ${positiveNumber}`);
}

//part01();

// 3938038
part02();
