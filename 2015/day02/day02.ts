import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const dimensions: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

function part01() {
    // surface area (2*l*w + 2*w*h + 2*h*l) + area of the smallest side

    const dimensionGroups: number[][] = dimensions
        .split('\n')
        .map( (dimension: string) => {
            return dimension.split('x');
        } )
        .map( (dimensionGroup: string[]) => {
            return dimensionGroup.map(Number);
        } );

    let wrappingPaper: number = 0;
    for (let i=0; i<dimensionGroups.length; i++) {
        const currDimensions: number[] = dimensionGroups[i];

        let smallestArea: number;
        let area1 = smallestArea = currDimensions[0]*currDimensions[1];
        let area2 = currDimensions[0]*currDimensions[2];
        smallestArea = area2 < smallestArea ? area2 : smallestArea;
        let area3 = currDimensions[1]*currDimensions[2];
        smallestArea = area3 < smallestArea ? area3 : smallestArea;
        const totalArea = 2 * (area1 + area2 + area3);

        wrappingPaper += (totalArea + smallestArea);
    }

    console.log(wrappingPaper);
}

function part02() {
    const dimensionGroups: number[][] = dimensions
        .split('\n')
        .map( (dimension: string) => {
            return dimension.split('x');
        } )
        .map( (dimensionGroup: string[]) => {
            return dimensionGroup.map(Number);
        } );

    let ribbonLength: number = 0;
    for (let i=0; i<dimensionGroups.length; i++) {
        let currDimensions: number[] = dimensionGroups[i];

        currDimensions = currDimensions.sort( (a, b) => a-b );

        ribbonLength += 2 * ( currDimensions[0] + currDimensions[1] );
        ribbonLength += currDimensions[0] * currDimensions[1] * currDimensions[2];
    }
    
    console.log(ribbonLength);
}

part01();
part02();
