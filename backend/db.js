var mongoose = require('mongoose');
var uri = 'mongodb+srv://dbRobo:3ZLyF8iZ5MVrVFn@robodoc.tshsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });