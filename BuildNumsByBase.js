/**********************************************
* The purpose of this code is to give the class BuildNumsByBase
* the base of our mathmatical system, and then use BuildRange
* to produce a range of numbers between a starting and stopping position.
* 
* The accompanying function stringMustHaveThisManyThat is just a simple filter
* to allow one to weed numbers out of the range based upon their existence in
* each producted number in the range.

Example
Lets say one wants to produce an array of numbers where each one consists of
three '0', three '1', and three '2'.
1. instantiate class and construct
    let myNums = BuildNumsByBase(3);
2. build the range of all possible before filter, ie. '000111222' to '222111000'
    let myArray = myNums.BuildRange('000111222', '222111000');
3. filter out the strings that don't contain three '0' --> three '1' --> three '2'
    myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '0'));
    myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '1'));
    myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '2'));
*/


const POSSIBLE_DIGITS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
];

class BuildNumsByBase {
    constructor(iBase) {
        this.iBase = iBase;
        this.aDigits = POSSIBLE_DIGITS.slice(0, iBase);
    }

    BuildRange(strStart, strStop) {
        let strNextNum = strStart;
        let aRange = [];

        if (this.isThisBaseNum(strStart) && this.isThisBaseNum(strStop) && (strStart <= strStop)) {
            while (strNextNum <= strStop) {
                aRange.push(strNextNum);
                strNextNum = this.getNextNum(strNextNum);
            }
        }
        return aRange;
    }

    isThisBaseNum(strNum) {
        for (let i = strNum.length; i > 0; i--) {
            if (this.aDigits.findIndex(k => k == strNum[i - 1]) < 0) {
                return false;
            }
        }
        return true;
    }

    getNextNum(strNum) {
        let aBuf = strNum.split('');
        let iNumIndex = strNum.length;
        let iDigIndex = -1;

        for (let i = iNumIndex; i > 0; i--) {
            iDigIndex = this.aDigits.findIndex(k => k == aBuf[i - 1]);
            aBuf[i - 1] = this.aDigits[((iDigIndex + 1) % this.iBase)];
            // if we don't have carry-over, then we're done
            if (((iDigIndex + 1) % this.iBase) > 0) {
                i = 0;
            }
        }

        return aBuf.join('');
    }
}

function stringMustHaveThisManyThat(strIn, iNum, strThat) {
    let regExp = '';

    for (let i = 0; i < iNum; i++) {
        regExp = regExp + strThat + '.*';
    }
    return (strIn.search(regExp) > -1);
}

let myNums = new BuildNumsByBase(3);

let myArray = myNums.BuildRange('000111222', '222111000');

myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '0'));
myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '1'));
myArray = myArray.filter(word => stringMustHaveThisManyThat(word, 3, '2'));

process.stdout.write('done');