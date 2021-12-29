const palindrome = str => {
    const strToCheck = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    for(let i = 0; i < strToCheck.length / 2; i++) {
        if(strToCheck[i] !== strToCheck[strToCheck.length - i - 1]) return false;
    }
    return true;
}
console.log(palindrome('abcdedcba'));
console.log(palindrome('A man, a plan, a canal. Panama'));