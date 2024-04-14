console.log("javascript page of front end ie client side server page")

const form=document.querySelector('form')
const input=document.querySelector('input')
const msgOne=document.querySelector('#msg-one')
const msgTwo=document.querySelector('#msg-two')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log("event listener of button")
    const location=input.value

    msgOne.textContent='loading...'
    msgTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error
        }
        else{
            console.log(data)
            msgOne.textContent="location:"+data.location
            msgTwo.textContent="Temperature: "+data.weather_report.temp_c + ", Humidity: " + data.weather_report.humidity
            // console.log(data.location)
            // console.log(data.weather_report)
        }
    })
})
})

