const request=require('request')


const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherapi.com/v1/current.json?key=b245b7b8d814474cb1882816240704&q="+latitude+","+longitude+"&lang=ja"

    request({url,json:true},(err,{body})=>{
        if(err){
            callback("unable to connect to the web",undefined)
        }
        else if(body.error){
            callback("unable to detect location",undefined)
        }
        else{
            callback(undefined,{
                temp_c:body.current.temp_c,
                humidity:body.current.humidity,
                cloudy:body.current.cloud
            })
        }
    })
}


module.exports=forecast