
const {PythonShell} =require('python-shell');

async function predict(script, params) {
    console.log('running ml '+script+' script with "'+params+'"');
    let dataToSend = [];

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'ml/', //If you are having the script in same folder, then it's optional.
        args: [params] //An argument which can be accessed in the script using sys.argv[1]
    };
    
    let runPy = new Promise(function(success, nosuccess) {
        let shell = new PythonShell(script, options);
        shell.on('error', function (error) {
            console.error("ml error: "+error);
        });
        shell.on('stderr', function (stderr) {
            console.error("ml error: "+stderr);
        });
        shell.on('message', function (message) {
            dataToSend.push(message);
        });
        shell.on('close', (message) => {
            console.log("ml done")
            console.log("result: "+dataToSend)
            success(dataToSend);
         });
    });
    
    try {
        let res = await runPy;
    } catch(err) {
        console.log(err)
    }
    return dataToSend
}


module.exports = predict;
