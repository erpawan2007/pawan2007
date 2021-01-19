const mssql = require("mssql/msnodesqlv8"); 
//Initiallising connection string
const config = {    
    driver: 'msnodesqlv8',
    connectionString:'Driver={SQL Server Native Client 11.0};Server={VIVEK\\SQLEXPRESSNEW};Database={VCDetails};Trusted_Connection={yes};'
}


// const  mssql   = require('mssql');
   
// const config = 'Driver={SQL Server Native Client 11.0};Server={"VIVEK\SQLEXPRESSNEW"};Database={VCDetails};Trusted_Connection={yes};'

   
/*
 * @sqlConnection
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var sqlConnection = async function  sqlConnection(sql, values, next) {
    const pool = new mssql.ConnectionPool({
        database: "VCDetails",
        server: "VIVEK\\SQLEXPRESSNEW",
        driver: "msnodesqlv8",
        options: {
          trustedConnection: true
        }
      });
    
    pool.on('error', err => {
        // ... error handler
        next.apply(err);
    })
    await pool.connect();
    try {
        const request = pool.request(); // or: new sql.Request(pool)
        const result = await request.query(sql)
        return result;
    } catch (err) {
        console.error('SQL error', err);
        // return err;
        next.apply(err);
    }
    // pool.connect().then(() => {
    //       console.log('connected to the SQL Server')
    //       next.apply(this, arguments);
    //     // ... sproc call, error catching, etc
    //     // example: https://github.com/patriksimek/node-mssql#request
    //   });

    
}

var preparedStatement = async function  preparedStatement(sql, values, next) {
    console.log(sql);
    console.log(values);
    const ps = new mssql.PreparedStatement(/* [pool] */)
    // ps.input('param', sql.Int)
    ps.prepare(sql, err => {
        // ... error checks
    
        ps.execute(values, (err, result) => {
            // ... error checks
            if(err){
                next.apply(err);
            }else{
                next.apply(result);
                // release the connection after queries are executed
                ps.unprepare(err => {
                    // ... error checks
                    if(err){
                        next.apply(err);
                    }
                })
            }
        })
    })
}

module.exports = {sqlConnection, preparedStatement};