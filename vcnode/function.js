// global.dbconfig = require('dbconfig');
// const sql = require("mssql/msnodesqlv8"); 
const sql = require('mssql')
            
function connectDB(){
    (async function () {
        try {
            const server = 'VIVEK\SQLEXPRESSNEW';
            const database = 'VCDetails';
            //Initiallising connection string
            const config = {    
                driver: 'msnodesqlv8',
                connectionString:'Driver={SQL Server Native Client 11.0};Server={server};Database={database};Trusted_Connection={yes};'
            }
            let pool = await sql.connect(config)
            let value = 1;
            let result1 = await pool.request()
                .input('input_parameter', sql.Int, value)
                .query('select * from Users where id = @input_parameter')
                
            console.dir(result1)
        
            // Stored procedure
            
            let result2 = await pool.request()
                .input('input_parameter', sql.Int, value)
                .output('output_parameter', sql.VarChar(50))
                .execute('procedure_name')
            
            console.dir(result2)
        } catch (err) {
            // ... error checks
        }
    })()
     
    sql.on('error', err => {
        // ... error handler
    })
}