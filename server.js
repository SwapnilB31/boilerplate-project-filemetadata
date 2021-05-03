const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable')
require('dotenv').config()

var app = express();

app.use(express.json())
app.use(formidable())
app.use(cors());




app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',(req,res)=>{
  //console.log({files : req.files})
  const file = req.files["upfile"] || null
  
  if(file) {
    const size = file.size
    const name = file.name
    const type = file.type
    res.status(200).json({name, type, size})
  } else {
    res.status(404).json({error : "No file was uploaded"})
  }
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
