const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const requestForm = "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const key           ='&appid=be9835a5db808c17f4218354f247a0e2&units=imperial'
const inputcountry  =document.getElementById('country')
const inputzip      =document.getElementById('zip')
const feeling       =document.getElementsByClassName('feelings')
const chekhbutton   =document.getElementById('generate')
const error         =document.getElementById('#error')
const d=new Date()
const date=d.toDateString()
// input value



// functionlatiy of checkbutton

const getdata=async (url)=>{
    try{
    const response=await fetch(url)
    const data    =await response.json()
    if(data.cod !=200){
        return data
    }
    return data
    }
    catch(error){
        console.log(error.message)
    }
    
}
// modify to what we need
const projectData = async(data)=>{
    try{
        if(data.cod != 200){
            return data;
        }
        
            const info = {
                date: date,
                temp: Math.round(data.main.temp),
                content: feeling.value,
                city: data.name,
                weather: data.weather[0].description,
                country: data.sys.country,
             };
             return info;
        
    }catch(e){
        console.log(e);
    }
};
// send data to sever
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
        
    });
    console.log(response)
    try {
        const result = await response.json();
        return result;
    }catch (err) {
        console.error(err);
    }
};


// redirect
const retriveData=async(url)=>{
    const response=await fetch(url)
    try{
        const data=await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
    
}
// data from server
const updateUI=async(data)=>{
    const response=await data;
    if(response.date){
        const feeling       = document.querySelector('.feelings')
        const inputfeeling  =document.querySelector('#feeling')
        const weather       =document.querySelector('.weather')
        console.log(response)
        document.querySelector('#error').style.dispaly='block'
        currentdate.innerHTML=response.date;
        temp.innerHTML       =response.temp;
        weather.innerHTML    =response.weather ? response.weather : 'no weather ';
        feeling.innerHTML=inputfeeling.value
        document.querySelector('#error').style.dispaly='none'
    }
    else{
        document.querySelector('#error').style.dispaly='none'
        document.querySelector('#error').innerHTML=response.message
    }
}
// button which show result
chekhbutton.addEventListener("click", (e)=>{
    e.preventDefault();
    const zipValue=inputzip.value
    console.log(zipValue)
    const madeURL = `${baseURI}${zipValue}${key}`;
    
    getdata(madeURL).
    then((data)=>{
    
    projectData(data).then((info)=>{
        console.log(info)
        console.log(postData('/add',info))
    postData("/add", info).
    
    then((data)=>{
        retriveData("/all").
        then(data=>{
        updateUI(data);
        });
    });
    });
    
    });
});