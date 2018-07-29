var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Image = require('./image');


router.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
}
 
 
router.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
router.addImage = function(image, callback) {
 Image.create(image, callback);
}
 
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});
 

 
router.post('/imageupload',upload.any(), function(req, res, next) {
	//res.send('working....!');	
  res.send(req.files);
 

 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
 imagepath['likes']=0;
 imagepath['dislikes']=0;
 
 console.log(imagepath);
 //passing two objects in the addImage method.. which is defined above..
 router.addImage(imagepath, function(err) {
 
 });
 
});


//returns all the images
router.get('/viewimages',function(req,res){
	//console.log('working....');
	Image.find({},function(err,Images){
		
		console.log(Images);
		var pathname = Images[0].path;
		var files = Images[0].originalname;
		console.log(pathname+" "+files);
		res.sendFile("c:/aravind/nodejs/gallery"+"/Uploads/"+files);
	});
});


//likes the images 
router.get('/like/:name',function(req,res){
	console.log('working....!');
	var imagename=req.params.name;
	Image.findOneAndUpdate({originalname:imagename},{$set: {like:like+1}},{new: true},function(err,result){
		
		if(err) throw err;
		console.log(result);
	});
});
	
//dislikes the images	
router.get('/dislike/:name',function(req,res){
	console.log('working....!');
	var imagename=req.params.name;
	Image.findOneAndUpdate({originalname:imagename},{$set: {dislike:dislike+1}},{new: true},function(err,result){
		
		if(err) throw err;
		console.log(result);
	});
});

//to sort and display only 5 images
router.get('/imageratings',VerifyToken,function(req,res){
	console.log('working....!');
	Image.find({}).sort([['likes','desc']]).limit(5,function(err,result){
		if(err) res.send("there was error sorting and returning");
		res.send(result);
	});
});
	
	
	module.exports=router;