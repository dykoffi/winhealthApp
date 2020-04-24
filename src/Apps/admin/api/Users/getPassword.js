function getRandomNum(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}

function getRandomChar(number, lower, upper, other, extra) {
    var numberChars = "0123456789";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var otherChars = "!@#%&*()-_=+;,./?";
    var charSet = extra;
    if (number === true) charSet += numberChars;
    if (lower === true) charSet += lowerChars;
    if (upper === true) charSet += upperChars;
    if (other === true) charSet += otherChars;
    return charSet.charAt(getRandomNum(0, charSet.length));
}

function getPassword(
    length = 5,
    extraChars = "",
    firstNumber = true,
    firstLower = true,
    firstUpper = true,
    firstOther = true,
    latterNumber = true,
    latterLower = true,
    latterUpper = true,
    latterOther = true
) {
    var rc = "";
    if (length > 0)
        rc =
            rc +
            getRandomChar(
                firstNumber,
                firstLower,
                firstUpper,
                firstOther,
                extraChars
            );
    for (var idx = 1; idx < length; ++idx) {
        rc =
            rc +
            getRandomChar(
                latterNumber,
                latterLower,
                latterUpper,
                latterOther,
                extraChars
            );
    }
    return rc;
}

export default getPassword