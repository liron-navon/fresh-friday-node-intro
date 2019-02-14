/**
    Write a script that will ask for a "colors array" separated by commas, a "number" and a "character".
    Print lines by the number, with the given color and character:

    It's OK to allow only two color options.

    INPUT:
    -------
    number: 5
    character: X
    colors: green,red

    OUTPUT
    ------
    1. X        (green)
    2. XX       (red)
    3. XXX      (green)
    4. XXXX     (red)
    5. XXXXX    (green)

    Remember:
    you can use the color codes from: https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    for example - 
    Red FG code 32, escaped for terminal: \x1b[31m
 */

 // transforms " green,red " to ["green", "red"]
 function commaSeparatedStringToArray(commaSeperatedString){
     const withNoSpaces = commaSeparatedString.replace(/ +/g);
     const array = withNoSpaces.split(',');
     return array;
 }