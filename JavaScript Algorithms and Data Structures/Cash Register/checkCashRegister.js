const checkCashRegister = (price, cash, cid) => {
    const cashMap = {PENNY: 0.01, NICKEL: 0.05, DIME: 0.1, QUARTER: 0.25, ONE: 1, FIVE: 5, TEN: 10, TWENTY: 20, 'ONE HUNDRED': 100};
    const totalCid = cid.reduce((total, type) => total + type[1] * 100, 0) / 100;
    if(totalCid < cash - price) return {status: "INSUFFICIENT_FUNDS", change: []};
    if(totalCid === cash - price) return {status: "CLOSED", change: cid};
    let change = (cash - price).toFixed(2);
    const result = cid.reverse().map(([type, amount]) => {
        const changeAmount = [type, (cashMap[type] > change) ? 0 : (amount > change) ? cashMap[type] * Math.floor(change / cashMap[type]) : amount];
        change = (change - changeAmount[1]).toFixed(2);
        return changeAmount;
    }).filter(element => element[1] > 0);
    if(change > 0) return {status: "INSUFFICIENT_FUNDS", change: []};
    return {status: "OPEN", change: result};
}

console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));

console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));