var Twitter = require('twitter-node-client').Twitter;
var CronJob = require('cron').CronJob;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'twitter_reporting'
});

var config = 
{
    "consumerKey": "NoQ3EGZUIzQ882rY25ZkJm5NO",
    "consumerSecret": "HkTZhM55LaN67zwB93wtQ0IqTr5Pfu6wm77bGbUllfXuWxtBE5",
    "accessToken": "1487872400-4adj1WmA6cbXxWqUnF58smfIkpfCtvBJuSKk0q1",
    "accessTokenSecret": "udafoulVwWYPCPonZvKAyF23kU33PThXivHH2efl4ekhm",
    "callBackUrl": "http://localhost/GrowthHackingTwitter/oauth/index.html"
};

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};

var twitter = new Twitter(config);

function saveReport()
{
    twitter.getUser({'screen_name': 'Volokasse'}, error, 
    function(datas)
    {   
        var datas = JSON.parse(datas);

        var Now = parseInt(Date.now() / 1000);
        connection.query('INSERT INTO reports(date, followers, favourites, friends) VALUES(' + Now + ', ' + datas.followers_count + ', ' + datas.favourites_count + ', ' + datas.friends_count +')',
        function(error, results)
        {
            console.log(results);
            if (error) throw error;

            console.log("Database updated with values :");
            console.log("date       => " + Now);
            console.log("followers  => " + datas.followers_count);
            console.log("favourites => " + datas.favourites_count);
            console.log("friends    => " + datas.friends_count);

            connection.end(function(error)
            {
                if (error) throw error;
                process.exit(1);
            });
        });
    });
};
/*
OkPacket 
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 
}
*/

var job = new CronJob({
    cronTime: '00 00 10 * * *',
    onTick: function()
    {
        saveReport();
    },
    start: false,
    timeZone: 'Europe/Paris'
});

job.start();