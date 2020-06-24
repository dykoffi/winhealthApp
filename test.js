var { readCSV } = require('nodecsv');
readCSV('./excel.csv', function(error, data) {
    //data is a array of array
    //if csv_sample.csv is like this:
    //1,2,3
    //4,5,6
    //data will be:
    //[ [ '1', ' 2', ' 3' ], [ '4', ' 5', ' 6' ] ]
    console.log(data);
});