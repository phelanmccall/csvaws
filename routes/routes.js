const S3_BUCKET = process.env.S3_BUCKET;

module.exports = function (app, lambda, s3, upload) {



    app.route("/csv")
        .post(upload.single('data'), function (req, res, next) {
            if (req.file) {
                res.sendStatus(200)

            } else {
                res.sendStatus(500);
            }
        })

    app.route("/csv/:name")
        .get(function (req, res, next) {

            s3.getObject({
                Bucket: S3_BUCKET,
                Key: "csv/" + req.params.name + ".csv"
            }, (err, data) => {
                if (err) {
                    console.log(err);
                   res.sendStatus(404);
                } else {
                    res.send(data.Body.toString());

                }

            })


        })
        .post(upload.single('data'), function (req, res, next) {
            res.sendStatus(200);
        })

    app.route("/json")
        .post(upload.single('data'), function (req, res, next) {
            if (req.file) {
                res.sendStatus(200)

            } else {
                res.sendStatus(500);
            }

        })

    app.route("/json/:name")
        .get(function (req, res, next) {

            s3.getObject({
                Bucket: S3_BUCKET,
                Key: "json/" + req.params.name + ".json"
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(404);
                } else {

                   res.json(JSON.parse(data.Body.toString()));
                }

            })


        })
        .post(upload.single('data'), function (req, res, next) {
            res.sendStatus(200);
        })


};


