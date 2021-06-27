
const {PythonShell} =require('python-shell');

async function predict(params) {
    console.log('running ml script with '+params);
    let dataToSend = [];

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'predicter/', //If you are having python_test.py script in same folder, then it's optional.
        args: [params] //An argument which can be accessed in the script using sys.argv[1]
    };
    
    let runPy = new Promise(function(success, nosuccess) {
        let shell = new PythonShell('predict.py', options);
        shell.on('error', function (error) {
            console.error("ml error: "+stderr);
            nosuccess(stderr);
        });
        shell.on('message', function (message) {
           dataToSend.push(message);
        });
        shell.on('close', (message) => {
            console.log("ml done")
            success(dataToSend);
         });
    });
    

    let res = await runPy;
    return dataToSend;
}

module.exports = predict;
