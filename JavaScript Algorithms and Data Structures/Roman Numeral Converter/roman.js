function convertDigitToRoman(digit, position) { // Position means 10^n-th position (starts from 0)
    const romanMap = {1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M'}; // Map
    if(digit < 4) return romanMap[Math.pow(10, position)].repeat(digit); // 0 - 3
    if(digit < 9) return (digit === 4) ? romanMap[Math.pow(10, position)] + romanMap[5 * Math.pow(10, position)] : romanMap[5 * Math.pow(10, position)] + romanMap[Math.pow(10, position)].repeat(digit - 5); // 4, 5 - 8
    return romanMap[Math.pow(10, position)] + romanMap[Math.pow(10, position + 1)]; // 9
}

const romanConvert = num => num.toString().split('').reverse().reduce((result, element, index) => convertDigitToRoman(parseInt(element), index) + result, '');

console.log(romanConvert(4));
console.log(romanConvert(7));
console.log(romanConvert(1984));
console.log(romanConvert(1084));