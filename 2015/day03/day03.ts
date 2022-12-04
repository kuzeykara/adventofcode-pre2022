import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const directions: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

/** north (^), south (v), east (>), or west (<) */

interface Coordinates {
    x: number;
    y: number;
}

function part01() {
    let visitedCoordinates: Coordinates[] = [];
    let currCoordinates: Coordinates = {
        x: 0,
        y: 0
    };

    visitedCoordinates.push(currCoordinates);

    // for every direction
    for (let i=0; i<directions.length; i++) {
        const currDirection = directions.charAt(i);
        //move
        switch (currDirection) {
            case '^':
                currCoordinates = {
                    ...currCoordinates,
                    y: currCoordinates.y+1
                }
                break;
            case 'v':
                currCoordinates = {
                    ...currCoordinates,
                    y: currCoordinates.y-1
                }
                break;
            case '>':
                currCoordinates = {
                    ...currCoordinates,
                    x: currCoordinates.x+1
                }
                break;
            case '<':
                currCoordinates = {
                    ...currCoordinates,
                    x: currCoordinates.x-1
                }
                break;
        }

        //check if visited: if not visited before, add to the list
        let visitedBefore = false;
        for (let a=0; a<visitedCoordinates.length; a++) {
            let currVisited: Coordinates = visitedCoordinates[a];
            if (currCoordinates.x === currVisited.x && currCoordinates.y === currVisited.y) {
                visitedBefore = true;
                break;
            }
        }
        if (!visitedBefore) {
            visitedCoordinates.push(currCoordinates);
        }
    }

    console.log(visitedCoordinates.length);
}

function part02() {
    let visitedCoordinates: Coordinates[] = [];
    let currSantaCoordinates: Coordinates = {
        x: 0,
        y: 0
    };
    let currRoboSantaCoordinates: Coordinates = {
        x: 0,
        y: 0
    };

    function updateVisitedHouses(currCoordinates: Coordinates) {
        let visitedBefore = false;
            for (let a=0; a<visitedCoordinates.length; a++) {
                let currVisited: Coordinates = visitedCoordinates[a];
                if (currCoordinates.x === currVisited.x && currCoordinates.y === currVisited.y) {
                    visitedBefore = true;
                    break;
                }
            }
            if (!visitedBefore) {
                visitedCoordinates.push(currCoordinates);
            }
    }

    visitedCoordinates.push(currSantaCoordinates);

    let roboSantaMoves = true;
    // for every direction
    for (let i=0; i<directions.length; i++) {
        roboSantaMoves = !roboSantaMoves;
        const currDirection = directions.charAt(i);

        if (roboSantaMoves) {
            // robosanta moves
            switch (currDirection) {
                case '^':
                    currRoboSantaCoordinates = {
                        ...currRoboSantaCoordinates,
                        y: currRoboSantaCoordinates.y+1
                    }
                    break;
                case 'v':
                    currRoboSantaCoordinates = {
                        ...currRoboSantaCoordinates,
                        y: currRoboSantaCoordinates.y-1
                    }
                    break;
                case '>':
                    currRoboSantaCoordinates = {
                        ...currRoboSantaCoordinates,
                        x: currRoboSantaCoordinates.x+1
                    }
                    break;
                case '<':
                    currRoboSantaCoordinates = {
                        ...currRoboSantaCoordinates,
                        x: currRoboSantaCoordinates.x-1
                    }
                    break;
            }
            //check if visited: if not visited before, add to the list
            updateVisitedHouses(currRoboSantaCoordinates);
        } else {
            // santa moves
            switch (currDirection) {
                case '^':
                    currSantaCoordinates = {
                        ...currSantaCoordinates,
                        y: currSantaCoordinates.y+1
                    }
                    break;
                case 'v':
                    currSantaCoordinates = {
                        ...currSantaCoordinates,
                        y: currSantaCoordinates.y-1
                    }
                    break;
                case '>':
                    currSantaCoordinates = {
                        ...currSantaCoordinates,
                        x: currSantaCoordinates.x+1
                    }
                    break;
                case '<':
                    currSantaCoordinates = {
                        ...currSantaCoordinates,
                        x: currSantaCoordinates.x-1
                    }
                    break;
            }
            //check if visited: if not visited before, add to the list
            updateVisitedHouses(currSantaCoordinates);
        }
    }

    console.log(visitedCoordinates.length);
}

part01();
part02();
