
const {PythonShell} =require('python-shell');

async function predict(script, params) {
    console.log('running ml '+script+' script with '+params);
    let dataToSend = [];

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'ml/', //If you are having the script in same folder, then it's optional.
        args: [params] //An argument which can be accessed in the script using sys.argv[1]
    };
    
    let runPy = new Promise(function(success, nosuccess) {
        let shell = new PythonShell("predict.py", options);
        shell.on('error', function (error) {
            console.error("ml error: "+stderr);
            nosuccess(stderr);
        });
        shell.on('message', function (message) {
            console.log("new data")
            dataToSend.push(message);
        });
        shell.on('close', (message) => {
            console.log(message)
            console.log("ml done")
            console.log(dataToSend)
            success(dataToSend);
            return dataToSend
         });
    });
    

    let res = await runPy;
    return res+dataToSend;
}


module.exports = predict;
