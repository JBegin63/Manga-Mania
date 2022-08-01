const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/users', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Established connection to the database`))
    .catch((err) => console.log(`Error in connection to db`, err));