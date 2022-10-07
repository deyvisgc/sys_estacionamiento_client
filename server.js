
let express = require('express')
let app = express()
app.use(express.static(__dirname+'/dist/coreui-free-angular-admin-template'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname+'/dist/coreui-free-angular-admin-template')
})
app.listen(process.env.PORT || 4200);
