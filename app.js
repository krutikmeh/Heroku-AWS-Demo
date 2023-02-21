const dotenv = require("dotenv")
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const postgresQuery = require('./query');
const port = 3000;
const dbConnection = require('./config/db.config');
var client = dbConnection.myConnection;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {

    function subsetPairNotDivisibleByK(arr, N, K) {

        let f = new Array(K);
        for (let i = 0; i < K; i++) {
            f[i] = 0;
        }

        for (let i = 0; i < N; i++)
            f[arr[i] % K]++;

        if (K % 2 == 0) {
            console.log('hii', f[K / 2])
            f[K / 2] = Math.min(f[K / 2], 1);
        }

        let res = Math.min(f[0], 1);

        for (let i = 1; i <= K / 2; i++)
            res += Math.max(f[i], f[K - i]);

        return res;
    }

    let arr = [3, 7, 2, 9, 1];
    let N = arr.length;
    let K = 3;
    console.log(subsetPairNotDivisibleByK(
        arr, N, K));

});

app.get('/getFunctionData', (req, res) => {
    try {
        client.query(postgresQuery.functionQuery).then(data=>{
            res.json({
                status: 200,
                data: data.rows
            })
        }).catch (err=>{
            console.log('errorr', err);
        })
    } catch (error) {
        console.log('getFunctionData error==', error);
    }
});

app.get('/getJoinData', (req, res) => {
    try {
        client.query(postgresQuery.joinQuery).then(data=>{
            res.json({
                status: 200,
                data: data.rows
            })
        }).catch (err=>{
            console.log('errorr', err);
        })
    } catch (error) {
        console.log('getJoinData error==', error);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
