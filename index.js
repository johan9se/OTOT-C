let app = require('./app')
var port = process.env.PORT || 8000;

server = app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});