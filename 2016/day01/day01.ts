import { readFileSync } from 'fs';
import { exit } from 'process';

/** PART 2 NOT CORRECT */

const inputFile = 'input.txt';

const input: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

function day01() {
    function moveToDirection(currCoords: number[], direction: string, blocksToMove: number): number[] {
        let newCoords: number[] = currCoords;

        switch (direction) {
            case 'north':
                // y+
                newCoords[1] += blocksToMove;
                break;
            case 'east':
                // x+
                newCoords[0] += blocksToMove;
                break;
            case 'south':
                // y-
                newCoords[1] -= blocksToMove;
                break;
            case 'west':
                // x-
                newCoords[0] -= blocksToMove;
                break;
        }

        return newCoords;
    }
    
    function calculatePosition(instructions: string[]): number[] {
        let finalCoords: number[] = [0, 0]
        let currDirection: string = 'north';

        instructions.forEach( (instruction: string) => {
            let currTurn: string = instruction.charAt(0);
            let currBlocksToMove: number = Number(instruction.slice(1));

            switch (currDirection) {
                case 'north':
                    if (currTurn === 'R') {
                        currDirection = 'east';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    } else if (currTurn === 'L') {
                        currDirection = 'west';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    }
                    break;
                case 'east':
                    if (currTurn === 'R') {
                        currDirection = 'south';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    } else if (currTurn === 'L') {
                        currDirection = 'north';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    }
                    break;
                case 'south':
                    if (currTurn === 'R') {
                        currDirection = 'west';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    } else if (currTurn === 'L') {
                        currDirection = 'east';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    }
                    break;
                case 'west':
                    if (currTurn === 'R') {
                        currDirection = 'north';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    } else if (currTurn === 'L') {
                        currDirection = 'south';
                        finalCoords = moveToDirection(finalCoords, currDirection, currBlocksToMove);
                    }
                    break;
                default:
                    console.error('Something went wrong!');
                    exit();
            }
        } );

        return finalCoords;
    }

    const instructions: string[] = input.split(', ');
    const finalCoords: number[] = calculatePosition(instructions);
    const shortestDistance: number = Math.abs(finalCoords[0]) + Math.abs(finalCoords[1]);

    console.log(shortestDistance);
}

function day02() {
    function moveToDirection(visitedCoords: number[][], currCoords: number[], direction: string, blocksToMove: number) {
        let newCoords: number[] = currCoords;
        let newVisitedCoords: number[][] = visitedCoords;

        switch (direction) {
            case 'north':
                // y+
                for (let i=0; i<blocksToMove; i++) {
                    newCoords[1]++;
                    newVisitedCoords.push(newCoords);
                }
                break;
            case 'east':
                // x+
                for (let i=0; i<blocksToMove; i++) {
                    newCoords[0]++;
                    newVisitedCoords.push(newCoords);
                }
                break;
            case 'south':
                // y-
                for (let i=0; i<blocksToMove; i++) {
                    newCoords[1]--;
                    newVisitedCoords.push(newCoords);
                }
                break;
            case 'west':
                // x-
                for (let i=0; i<blocksToMove; i++) {
                    newCoords[0]--;
                    newVisitedCoords.push(newCoords);
                }
                break;
        }
        newVisitedCoords.forEach( (visited: number[]) => {
            if (visited[0] == newCoords[0] && visited[1] == newCoords[1]) {
                // found it!
                //console.log([ [newCoords[0], newCoords[1]] ]);
                newVisitedCoords = [newCoords];
                return {newVisitedCoords, newCoords};
            }
        } );

        return {newVisitedCoords, newCoords};
    }
    
    function calculatePosition(instructions: string[]): number[] {
        let visited: number[][] = [ [0, 0] ];
        let finalCoords: number[] = [0, 0]
        let currDirection: string = 'north';
        let obj = {
            newVisitedCoords: [[0,0]],
            newCoords: [0,0]
        };

        instructions.forEach( (instruction: string) => {
            let currTurn: string = instruction.charAt(0);
            let currBlocksToMove: number = Number(instruction.slice(1));

            switch (currDirection) {
                case 'north':
                    if (currTurn === 'R') {
                        currDirection = 'east';
                    } else if (currTurn === 'L') {
                        currDirection = 'west';
                    }
                    break;
                case 'east':
                    if (currTurn === 'R') {
                        currDirection = 'south';
                    } else if (currTurn === 'L') {
                        currDirection = 'north';
                    }
                    break;
                case 'south':
                    if (currTurn === 'R') {
                        currDirection = 'west';
                    } else if (currTurn === 'L') {
                        currDirection = 'east';
                    }
                    break;
                case 'west':
                    if (currTurn === 'R') {
                        currDirection = 'north';
                    } else if (currTurn === 'L') {
                        currDirection = 'south';
                    }
                    break;
            }
            obj = moveToDirection(visited, finalCoords, currDirection, currBlocksToMove);
            finalCoords = obj.newCoords;
            visited = obj.newVisitedCoords;
            // check if visited before
            console.log(visited);
            if (visited.length == 1) {
                console.log('yooo');
                return finalCoords;
            }
        } );

        return finalCoords;
    }

    const instructions: string[] = input.split(', ');
    const finalCoords: number[] = calculatePosition(instructions);
    const shortestDistance: number = Math.abs(finalCoords[0]) + Math.abs(finalCoords[1]);

    console.log(finalCoords);
}

//day01();
day02();
