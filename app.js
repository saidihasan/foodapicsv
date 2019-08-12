const csv = require("csvtojson");
const FileSystem = require("fs");

const express = require("express");
const app = express();

const converter = csv({
	delimiter:";"
})


converter.fromFile("./makan_makan.csv").then(source => {
	console.log(source);
	app.get('/', (req,res) => res.send(source));
	
});

app.listen(8080);