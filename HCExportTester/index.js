// JavaScript source code
var http = require('http');
const exporter = require('highcharts-export-server');

//Set up a pool of PhantomJS workers
exporter.initPool();
//Export settings 
var exportSettings = {
    type: 'image/png',
    options: {
        title: {
            text: 'My Chart'
        },
        xAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        series: [
            {
                type: 'line',
                data: [1, 3, 2, 4]
            },
            {
                type: 'line',
                data: [5, 3, 4, 2]
            }
        ]
    }
};

function fn(httpres, exres) {

    

    //Kill the pool when we're done with it, and exit the application
    exporter.killPool();
    //process.exit(1);
   // console.log(exres.filename);
    httpres.writeHead(200, { 'Content-Type': 'image/png' });
    httpres.write(exres.data, 'base64');
    httpres.end();


}

http.createServer(function (req, res) {


    exporter.export(exportSettings, function (err, exres) {

        fn(res, exres);

    
    });

    


    //res.writeHead(200, { 'Content-Type': 'image/png' });;
}).listen(process.env.PORT); 



