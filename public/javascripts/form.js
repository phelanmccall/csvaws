(function () {
    function csvSubmit(event) {

        event.preventDefault();
        let formData = new FormData();
        formData.append("data", event.target[0].files[0])
        let csvName = event.target[0].value;
        let fileName = csvName.substring(csvName.lastIndexOf("\\") + 1, csvName.lastIndexOf('.'))
        let actionURL = `/csv/${fileName}`;
        axios.post(actionURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (res) {
                document.getElementById("postConfirm").innerHTML = "Success";


            })
            .catch(function (err) {
                console.log(err);
                document.getElementById("postConfirm").innerHTML = err.message;

            });

    }

    function csvGet(event) {
        event.preventDefault();
        axios.get("/csv/" + event.target.name.value).then((res) => {
            document.getElementById("resultDiv").innerHTML = res.data
        })
            .catch((err) => {
                console.log(err);
                document.getElementById("resultDiv").innerHTML = err.message
            });
    }
    function jsonGet(event) {
        event.preventDefault();
        axios.get("/json/" + event.target.name.value).then((res) => {
            document.getElementById("resultDiv").innerHTML = JSON.stringify(res.data);
        })
            .catch((err) => {
                console.log(err);
                document.getElementById("resultDiv").innerHTML = err.message
            });
    }
    let csvform = document.getElementById("csvform");
    csvform.addEventListener("submit", csvSubmit);
    let csvget = document.getElementById("csvget");
    csvget.addEventListener("submit", csvGet);
    let jsonget = document.getElementById("jsonget");
    jsonget.addEventListener("submit", jsonGet);
}());
