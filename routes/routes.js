const S3BUCKET = 'csvchallenge';

module.exports = function (app, lambda, s3, upload) {
   
    
   
    app.route("/csv")
        .get(function (req, res, next) {
            console.log("CSV")
            res.render('index', { title: 'Challenge' });
        })
        .post(upload.single('data'), function (req, res, next) {
            console.log(req)
            if (req.file) {
                console.log(req.file);
                res.send(Object.keys(req.file))

            } else {
                res.send("FAILURE!");
            }

        })

    app.route("/csv/:name")
        .get(function (req, res, next) {
           
            s3.getObject({
                Bucket: S3BUCKET,
                Key: "csv/"+ req.params.name +".csv"    
            }, (err, data)=>{
                if(err){
                    console.log(err);
                    res.render('showcsv', { file: 'Failure' });

                }else{
                    console.log(data.Body);
                res.render('showcsv', { file: 'Success' });

                }
                
            })
           

        })
        .post(upload.single('data'), function (req, res, next) {
           console.log(req.file); 
            res.send(200);  
        })

    app.route("/json")  .get(function (req, res, next) {
        console.log("JSON")
        res.render('index', { title: 'Challenge' });
    })
    .post(upload.single('data'), function (req, res, next) {
        console.log(req)
        if (req.file) {
            console.log(req.file);
            res.send(Object.keys(req.file))

        } else {
            res.send("FAILURE!");
        }

    })

app.route("/json/:name")
    .get(function (req, res, next) {
       
        s3.getObject({
            Bucket: S3BUCKET,
            Key: "json/" + req.params.name +".json"    
        }, (err, data)=>{
            if(err){
                console.log(err);
                res.render('showjson', { file: 'Failure' });

            }else{
                console.log(data.Body);
            res.render('showjson', { file: 'Success' });

            }
            
        })
       

    })
    .post(upload.single('data'), function (req, res, next) {
       console.log(req.body); 
        res.send(200);  
    })


};


