import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const instructions: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

enum _Instruction {
    TURN_ON = 1,
    TURN_OFF = 2,
    TOGGLE = 3
}

function part01() {
    function initializeGrid(row: number, column: number): string[] {
        let grid: string[] = [];

        for (let i=0; i<row; i++) {
            let row: string = '';
            for (let j=0; j<column; j++) {
                row += '0';
            }
            grid.push(row);
        }

        return grid;
    }

    function printGrid(grid: string[]) {
        for (let i=0; i<grid.length; i++) {
            console.log(grid[i]);
        }
    }

    function calculateLitLights(grid: string[]): number {
        let litLights: number = 0;
        for (let i=0; i<grid.length; i++) {
            let currLine: string = grid[i];
            for(let j=0; j<currLine.length; j++) {
                let currChar = currLine.charAt(j);
                if (currChar === '1') {
                    litLights++;
                }
            }
        }

        return litLights;
    }

    const instructionGroups: string[][] = instructions
    .split('\n')
    .map( (instructions: string) => {
        return instructions.split(' ');
    } );
    // 0=off - 1=on
    let grid: string[] = initializeGrid(1000, 1000);
    //printGrid(grid);

    // parsing
    let parsedInstructions: number[][] = [];
    instructionGroups.forEach( (instructionsSeperate: string[]) => {
        if (instructionsSeperate[0] === 'turn') {
            let firstCoords: number[] = instructionsSeperate[2].split(',').map(Number);
            let secondCoords: number[] = instructionsSeperate[4].split(',').map(Number);
            if (instructionsSeperate[1] === 'on') {
                //turn on
                parsedInstructions.push( [1, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
            } else {
                //turn off
                parsedInstructions.push( [2, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
            }
        } else {
            //toggle
            let firstCoords: number[] = instructionsSeperate[1].split(',').map(Number);
            let secondCoords: number[] = instructionsSeperate[3].split(',').map(Number);
            parsedInstructions.push( [3, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
        }
    } );

    parsedInstructions.forEach( (instruction: number[]) => {
        let fromRow = instruction[1];
        let fromCol = instruction[2];
        let toRow = instruction[3];
        let toCol = instruction[4];

        switch(instruction[0]) {
            case _Instruction.TURN_ON:
                for (let row=fromRow; row<toRow+1; row++) {
                    let currLine = grid[row];
                    for (let col=fromCol; col<toCol+1; col++) {
                        // replace a character with 1
                        currLine = currLine.substring(0, col)
                        + '1' 
                        + currLine.substring(col+1);
                    }
                    grid[row] = currLine;
                }
                break;
            case _Instruction.TURN_OFF:
                for (let row=fromRow; row<toRow+1; row++) {
                    let currLine = grid[row];
                    for (let col=fromCol; col<toCol+1; col++) {
                        // replace a character with 0
                        currLine = currLine.substring(0, col)
                        + '0' 
                        + currLine.substring(col+1);
                    }
                    grid[row] = currLine;
                }
                break;
            case _Instruction.TOGGLE:
                for (let row=fromRow; row<toRow+1; row++) {
                    let currLine = grid[row];
                    for (let col=fromCol; col<toCol+1; col++) {
                        // check the character
                        let currChar = currLine.charAt(col);
                        // flip the character
                        currLine = currLine.substring(0, col)
                        + (currChar === '0' ? '1' : '0') 
                        + currLine.substring(col+1);
                    }
                    grid[row] = currLine;
                }
                break;
        }
    } );

    console.log(calculateLitLights(grid));
}

function part02() {
    function initializeGrid(row: number, column: number): number[][] {
        let grid: number[][] = [];

        for (let i=0; i<row; i++) {
            let currLine: number[] = []
            for (let j=0; j<column; j++) {
                currLine.push(0);
            }
            grid.push(currLine);
        }

        return grid;
    }

    function printGrid(grid: number[][]) {
        for (let i=0; i<grid.length; i++) {
            console.log(grid[i]);
        }
    }

    function calculateBrightness(grid: number[][]): number {
        let brightness = 0;

        for (let i=0; i<grid.length; i++) {
            let currRow: number[] = grid[i];
            for (let j=0; j<currRow.length; j++) {
                brightness += currRow[j];
            }
        }

        return brightness;
    }

    function parseInstructions(instructionGroups: string[][]): number[][] {
        let result: number[][] = [];
        instructionGroups.forEach( (instructionsSeperate: string[]) => {
            if (instructionsSeperate[0] === 'turn') {
                let firstCoords: number[] = instructionsSeperate[2].split(',').map(Number);
                let secondCoords: number[] = instructionsSeperate[4].split(',').map(Number);
                if (instructionsSeperate[1] === 'on') {
                    //turn on
                    result.push( [1, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
                } else {
                    //turn off
                    result.push( [2, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
                }
            } else {
                //toggle
                let firstCoords: number[] = instructionsSeperate[1].split(',').map(Number);
                let secondCoords: number[] = instructionsSeperate[3].split(',').map(Number);
                result.push( [3, firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]] );
            }
        } );

        return result;
    }

    function turnOnPortion(grid: number[][], fromRow: number, fromCol: number, toRow: number, toCol: number): number[][] {
        let newGrid = grid;

        for (let i=fromRow; i<=toRow; i++) {
            let currRow = newGrid[i];
            for (let j=fromCol; j<=toCol; j++) {
                let prevLight = currRow[j];
                currRow[j] = prevLight + 1;
            }
            newGrid[i] = currRow;
        }

        return newGrid;
    }

    function turnOffPortion(grid: number[][], fromRow: number, fromCol: number, toRow: number, toCol: number): number[][] {
        let newGrid = grid;

        for (let i=fromRow; i<=toRow; i++) {
            let currRow = newGrid[i];
            for (let j=fromCol; j<=toCol; j++) {
                let prevLight = currRow[j];
                if (prevLight != 0) {
                    currRow[j] = prevLight - 1;
                }
            }
            newGrid[i] = currRow;
        }

        return newGrid;
    }

    function togglePortion(grid: number[][], fromRow: number, fromCol: number, toRow: number, toCol: number): number[][] {
        let newGrid = grid;

        for (let i=fromRow; i<=toRow; i++) {
            let currRow = newGrid[i];
            for (let j=fromCol; j<=toCol; j++) {
                let prevLight = currRow[j];
                currRow[j] = prevLight + 2;
            }
            newGrid[i] = currRow;
        }

        return newGrid;
    }

    function setLightsGrid(grid: number[][], instructionGroup: number[][]): number[][] {
        let newGrid = grid;
        
        instructionGroup.forEach( (instruction: number[]) => {
            let operation: number = instruction[0];
            let fromCol: number = instruction[1];
            let fromRow: number = instruction[2];
            let toCol: number = instruction[3];
            let toRow: number = instruction[4];

            switch(operation) {
                case _Instruction.TURN_ON:
                    newGrid = turnOnPortion(newGrid, fromRow, fromCol, toRow, toCol);
                    break;
                case _Instruction.TURN_OFF:
                    newGrid = turnOffPortion(newGrid, fromRow, fromCol, toRow, toCol);
                    break;
                case _Instruction.TOGGLE:
                    newGrid = togglePortion(newGrid, fromRow, fromCol, toRow, toCol);
                    break;
            }

        } );

        return newGrid;
    }

    const instructionGroups: string[][] = instructions
    .split('\n')
    .map( (instructions: string) => {
        return instructions.split(' ');
    } );
    // 0=off - 1=on
    const parsedInstructions: number[][] = parseInstructions(instructionGroups);
    let grid: number[][] = initializeGrid(1000, 1000);
    grid = setLightsGrid(grid, parsedInstructions);
    //printGrid(grid);
    console.log(calculateBrightness(grid));
}

//part01();
part02();
