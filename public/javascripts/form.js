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

    function csvGet(event){
        event.preventDefault();
        console.log(event.target);
        axios.get("/csv/"+event.target.name.value).then((res)=>{
            console.log(res.data);
            document.getElementById("resultDiv").innerHTML = res.data
        })
        .catch((err)=>{
            console.log(err.message);
            document.getElementById("resultDiv").innerHTML = err.message
        });  
    }
    function jsonGet(event){
        event.preventDefault();
        axios.get("/json/"+event.target.name.value).then((res)=>{
            console.log(res.data);
            document.getElementById("resultDiv").innerHTML = JSON.stringify(res.data);
        })
        .catch((err)=>{
            console.log(err.message);
            document.getElementById("resultDiv").innerHTML = err.message
        });  
    }
    let csvform = document.getElementById("csvform");
    csvform.addEventListener("submit",csvSubmit);
    let csvget = document.getElementById("csvget");
    csvget.addEventListener("submit",csvGet);
    let jsonget = document.getElementById("jsonget");
    jsonget.addEventListener("submit",jsonGet);
 }());
