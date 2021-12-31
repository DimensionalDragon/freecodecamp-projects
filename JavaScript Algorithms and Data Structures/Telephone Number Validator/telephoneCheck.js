/* Cases
    /^\d{10}$/ for 10 consecutive digits format
    /^(1\s)?\d{3}[ -]\d{3}[ -]\d{4}$/ for separated by space or hyphen format (with or without the leading "1")
    /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/ for separated by hyphen but the first group is in parenthesis format (with or without the leading "1")
*/
const telephoneCheck = str => /^\d{10}$|^(1\s)?\d{3}[ -]\d{3}[ -]\d{4}$|^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/.test(str);

console.log(telephoneCheck("1 555-555-5555"));
console.log(telephoneCheck("1 (555) 555-5555"));
console.log(telephoneCheck("5555555555"));
console.log(telephoneCheck("55555555555"));
console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("(555)555-5555"));
console.log(telephoneCheck("1(555)555-5555"));
console.log(telephoneCheck("1 555 555 5555"));
console.log(telephoneCheck("1 456 789 4444"));