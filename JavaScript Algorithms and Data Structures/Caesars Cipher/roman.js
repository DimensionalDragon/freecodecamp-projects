const rot13 = str => str.split('').map(character => character.match(/[A-Z]/) ? String.fromCharCode((character.charCodeAt(0) - 65 + 13) % 26 + 65) : character).join(''); // (char - 'A' + 13) % 26 + 'A' {ASCII calculation}

console.log(rot13("SERR PBQR PNZC"));
console.log(rot13("SERR CVMMN!"));
console.log(rot13("SERR YBIR?"));
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));