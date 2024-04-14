const request=require('request')


const geocode=(address,callback)=>{
    const url="https://geocode.maps.co/search?q="+encodeURIComponent(address)+"&api_key=661636fe82b5e351826410vdlc9339d&limit=1"

    request({url,json:true},(err,{body})=>{
        if(err){
            callback("unable to connect!!",undefined)
        }
        else if(body.length==0){
            callback("no such place exists",undefined)
        }
        else{
            callback(undefined,{
                latitude:body[0].lat,
                longitude:body[0].lon,
                location:body[0].display_name
            })
        }  
    })
}


module.exports=geocode