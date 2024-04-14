const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()

//define paths for express config
const dirPath=path.join(__dirname,'../frontend')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up static directory to serve
app.use(express.static(dirPath))

//setting up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// app.get('',(req,res)=>{
//     res.send('<h2>welcome to weather forecast<h2>')
// })
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Forecast',
        name:'Jahnavi Varaganti'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        // task:"weather",
        // place:'location',
        name:'Jahnavi Varaganti'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name:'Jahnavi Varaganti',
        message:'Search for the area to know its weather conditions!!!'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You need to provide a location!!!"
        })
    }
    
    geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send(err)
        }
    
        forecast(latitude,longitude,(err,forcastData)=>{
            if(err){
                return res.send(err)
            }
            
            res.send({
                address:req.query.address,
                location,
                weather_report:forcastData
            })
        })
    })
    // res.send({
    //     address:req.query.address,
    //     forecast:"the temp is good"
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404-Page Not Found',
        name:"error",
        errorMessage:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404-Page Not Found',
        name:"error",
        errorMessage:'page not found'
    })
})
app.listen(3000,()=>{
    console.log("connected to server")
})