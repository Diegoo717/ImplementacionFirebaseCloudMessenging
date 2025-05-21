const input1 = document.querySelector("#input1")
const input2 = document.querySelector("#input2")
const input3 = document.querySelector("#input3")
const button = document.querySelector(".button-form-index")

button.addEventListener("click", function(event){
    event.preventDefault();
    const title = input1.value
    const body = input2.value
    const token = input3.value
    const data = ""

    fetch("http://localhost:3000/send-to-device",{
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
            title: title,
            body: body,
            data: data
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))   
})