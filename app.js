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

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})
 client.connect()

// const connectDb = async () => {
//     try {
//         const client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         })

//         await client.connect()
//         //         const res = await client.query('SELECT * FROM employees')
//         //         console.log(res)
//         const now = await client.query("SELECT NOW()");
//         await client.end();
//         return now;
//     } catch (error) {
//         console.log(error)
//     }
// }

// connectDb();

app.get('/', (req, res) => {
    console.log('here');

    function subsetPairNotDivisibleByK(arr, N, K) {
        // Array for storing frequency of modulo
        // values
        let f = new Array(K);
        for (let i = 0; i < K; i++) {
            f[i] = 0;
        }



        // Fill frequency array with values modulo K
        for (let i = 0; i < N; i++)
            f[arr[i] % K]++;

        // if K is even, then update f[K/2]
        if (K % 2 == 0) {
            console.log('hii', f[K / 2])
            f[K / 2] = Math.min(f[K / 2], 1);
        }

        // Initialize result by minimum of 1 or
        // count of numbers giving remainder 0
        let res = Math.min(f[0], 1);

        // Choose maximum of count of numbers
        // giving remainder i or K-i
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

app.get('/details', (req, res, next)=>{
    // console.log('query.getData==', query.getData);
    // client.query(query.getData).then(function (data) {
    //     console.log('getData', data);
    //     res.status(200)
    //       .json({
    //         status: 'success',
    //         message: 'Insert Task',
    //         data: data
    //       });
    //   })
    //   .catch(function (err) {
    //     return next(err);
    //   });

    // client.query(`create or replace view myview 
    //     as 
    //     select row_to_json(t) as document
    //     from (
    //       SELECT e.employee_id,
    //         e.first_name,
    //            e.last_name,
    //            e.department_id,
    //            d.department_name,
    //             e.created_at
    //     FROM employees e,
    //          department d
    //     WHERE e.department_id = d.department_id ORDER by e.created_at DESC
    //     )t ;`).then(function(viewData){
    //         client.query(`create or replace function myfunc()
    //         returns table (document json) 
    //       as $$
    //       BEGIN
    //       return query
    //         select row_to_json(${employeesView}) 
    //         from myview;
    //         END;
    //       $$
    //       language 'plpgsql';`).then(function(employeeFunction){

    //       })
    //     })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
