(function(){
    function csvSubmit(event) {
        console.log(event.target);
        event.preventDefault();
        let formData = new FormData();
        formData.append("data", event.target[1].files[0])
        let csvName = event.target[1].value;
        let fileName = csvName.substring(csvName.lastIndexOf("\\")+1, csvName.lastIndexOf('.'))
        console.log(fileName)
        let actionURL = `/csv/${fileName}`;
        axios.post(actionURL, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (res) {
                console.log(res.data);
            })
            .catch(function(err){
                console.log(err);
            });
    
    }

    let form = document.getElementById("csvform");
    console.log("adding!" + csvSubmit + " to " + form);
    form.addEventListener("submit",csvSubmit);
 }());
