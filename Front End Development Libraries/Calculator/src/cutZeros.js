export default function cutZeros(float) {
    const reverseStringFloat = float.toString().split('').reverse();
    while(reverseStringFloat[0] === '0') {
        reverseStringFloat.shift();
    }
    if(reverseStringFloat[0] === '.') reverseStringFloat.shift();
    return parseFloat(reverseStringFloat.reverse().join(''));
}