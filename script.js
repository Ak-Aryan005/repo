// const url =("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=4556de4512fef8fb9fb58d5455e4b0cf")
const url ="https://api.openweathermap.org/data/2.5/weather?q=mandi&appid=4556de4512fef8fb9fb58d5455e4b0cf&units=metric"
// const key ="4556de4512fef8fb9fb58d5455e4b0cf"
  
let tt=document.querySelector("#txt")
let bt=document.querySelector("#bb")
let pp=document.querySelector("#ph")
let nam =document.querySelector("#name")
let hm=document.querySelector("#hm")
let wd=document.querySelector("#wd")
let deg=document.querySelector("#deg")
let im=document.querySelector("#mg")
let p=document.querySelector("#p")
let sr=document.querySelector("#sr")
let ss=document.querySelector("#ss")

async function  weather(){
	const response =await fetch(url)
	let data = await response.json()
	console.log(data)
	
nam.innerHTML=data.name
deg.innerHTML=Math.round(data.main.temp)+"°"
hm.innerHTML=`<span id="io"><i class="fa-solid fa-droplet"></i></span> Humidity <br> ${data.main.humidity}%`
if(data.wind.speed<=1){
	wd.innerHTML=`<span id="io"><i class="fa-solid fa-wind"></i></span>wind-speed<p>${data.wind.speed}m/hr</p>`

}else{

	wd.innerHTML=`<span id="io"><i id="ip" class="fa-solid fa-wind"></i></span><span><p>wind speed</p><p id="ip">${data.wind.speed}km/hr</p></span>`
}   

if(data.weather[0].id=='800'){
	im.src="pg/clear.png"
	p.innerHTML=data.weather[0].main     

}
else if(data.weather[0].main=='Clouds'){
	im.src="pg/cloud.png"
	im.style.height="100px";
   im.style.width= "190px";
   p.innerHTML=data.weather[0].main

}
else if(data.weather[0].main=='Smoke'){
	im.src="pg/smoke.png"
	p.innerHTML=data.weather[0].main

}
else if(data.weather[0].main=='Rain'){
	im.src="pg/rainy.png"
	p.innerHTML=data.weather[0].main

}

function convertUnixToReadableTime(unixTimestamp) {
    // Convert the timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);
    
    // Format the date to a readable string
    const options = {
    
        hour: '2-digit', // '2-digit' => "03"
        minute: '2-digit', // '2-digit' => "30"
        
    };
    
    return date.toLocaleString('en-US', options); // You can change locale as per need
}

// Example usage:

const sunriseTime = convertUnixToReadableTime(data.sys.sunrise); // Use the actual sunrise timestamp
const sunrsetTime = convertUnixToReadableTime(data.sys.sunset); // Use the actual sunrise timestamp
console.log(sunriseTime);
console.log(sunrsetTime);

sr.innerHTML=`Sunrise Time${sunriseTime}`
ss.innerHTML=`Sunset Time${sunrsetTime}`

}
weather()

bt.addEventListener("click",async()=>{
   let url=`https://api.openweathermap.org/data/2.5/weather?q=${tt.value}&cnt=7&appid=4556de4512fef8fb9fb58d5455e4b0cf&units=metric`
   const response =await fetch(url)
	let data = await response.json()
	console.log(data)
tt.value=""
nam.innerHTML=data.name
deg.innerHTML=Math.round(data.main.temp)+"°"
hm.innerHTML=`<span id="io"><i class="fa-solid fa-droplet"></i></span> Humidity  \n  ` +data.main.humidity+"% "

if(data.wind.speed<=1){
	wd.innerHTML=`<span id="io"><i class="fa-solid fa-wind"></i></span> wind speed  \n   ` +data.wind.speed+"m/hr"

}else{
	wd.innerHTML=`<span id="io"><i class="fa-solid fa-wind"></i></span> wind speed  \n  `+Math.round(data.wind.speed)+"km/hr"
}

if(data.weather[0].id=='800'){
	im.src="pg/clear.png"
	im.style.width= "100px";
	p.innerHTML=data.weather[0].main

}
else if(data.weather[0].main=='Clouds'){
	im.src="pg/cloud.png"
	im.style.height="100px";
   im.style.width= "190px";
   p.innerHTML=data.weather[0].main

}
else if(data.weather[0].main=='Smoke'){
	im.src="pg/smoke.png"
	im.style.width= "100px";
	p.innerHTML=data.weather[0].main

}
else if(data.weather[0].main=='Rain'){
	im.src="pg/rainy.png"
	im.style.width= "100px";
	p.innerHTML=data.weather[0].main

}


function convertUnixToReadableTime(unixTimestamp) {
    // Convert the timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);
    
    // Format the date to a readable string
    const options = {
    
        hour: '2-digit', // '2-digit' => "03"
        minute: '2-digit', // '2-digit' => "30"
        
    };
    
    return date.toLocaleString('en-US', options); // You can change locale as per need
}

const sunriseTime = convertUnixToReadableTime(data.sys.sunrise); // Use the actual sunrise timestamp
const sunrsetTime = convertUnixToReadableTime(data.sys.sunset);

sr.innerHTML=`Sunrise Time${sunriseTime}`
ss.innerHTML=`Sunset Time${sunrsetTime}`
})	




