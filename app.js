const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const query = require('./query');
const port = 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })

        await client.connect()
        //         const res = await client.query('SELECT * FROM employees')
        //         console.log(res)
        const now = await client.query("SELECT NOW()");
        await client.end();
        return now;
    } catch (error) {
        console.log(error)
    }
}

connectDb();

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

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
