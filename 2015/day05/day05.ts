import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const input: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

function part01() {
    /** A nice string is one with all of the following properties:
    * It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
    * It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
    * It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
    */
    const wordList: string[] = input.split('\n');
    let niceWordCount: number = 0;

    function hasThreeVowels(word: string): boolean {
        let vowelCount: number = 0;
        for (let i=0; i<word.length; i++) {
            let currChar = word.charAt(i);
            if (currChar === 'a' || currChar === 'e' || currChar === 'i'
            || currChar === 'o' || currChar === 'u') {
                vowelCount++;
            }
        }

        return vowelCount >= 3;
    }

    function hasBackToBackLetter(word: string): boolean {
        for (let i=1; i<word.length; i++) {
            let currChar = word.charAt(i);
            let prevChar = word.charAt(i-1);
            if (currChar === prevChar) {
                return true;
            }
        }

        return false;
    }

    wordList.forEach( (word) => {
        let isNice = true;
        if (word.includes('ab') || word.includes('cd') || word.includes('pq') || word.includes('xy')) {
            isNice = false;
        } else {
            if (!hasThreeVowels(word)) {
                isNice = false;
            } else {
                if (!hasBackToBackLetter(word)) {
                    isNice = false;
                }
            }
        }

        if (isNice) niceWordCount++;
    } );

    console.log(niceWordCount);
}

function part02() {
    /** Now, a nice string is one with all of the following properties:
    * It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
    * It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
    */
    const wordList: string[] = input.split('\n');
    let niceWordCount: number = 0;

    function hasPairAppearTwice(word: string): boolean {
        for (let i=0; i<word.length-1; i++) {
            //get pair
            let pairChar1 = word.charAt(i);
            let pairChar2 = word.charAt(i+1);
            for (let j=0; j<word.length-1; j++) {
                // no overlapping
                if (j != i && j != i-1 && j != i+1) {
                    //get pair2
                    let pair2Char1 = word.charAt(j);
                    let pair2Char2 = word.charAt(j+1);
                    //check pair
                    if (pairChar1 === pair2Char1 && pairChar2 === pair2Char2) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    function hasSandwichLetter(word: string): boolean {
        for (let i=0; i<word.length-2; i++) {
            let firstBread = word.charAt(i);
            let secondBread = word.charAt(i+2);
            
            if (firstBread === secondBread) {
                return true;
            }
        }

        return false;
    }

    wordList.forEach( (word) => {
        let isNice = true;

        if (!hasPairAppearTwice(word)) {
            isNice = false;
        } else {
            //2nd check
            if (!hasSandwichLetter(word)) {
                isNice = false;
            }
        }

        if (isNice) niceWordCount++;
    } );

    console.log(niceWordCount);
}

//part01();
part02();
