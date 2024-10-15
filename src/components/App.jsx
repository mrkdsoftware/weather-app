import { useState, useEffect } from 'react'

import searchLogo from '@/img/search.png'
import humidityLogo from '@/img/humidity.png'
import windLogo from '@/img/wind.png'

function App() {
    const weatherImgUrl = "https://openweathermap.org/img/wn/"

    const [temperature, setTemperature] = useState(16)
    const [city, setCity] = useState("Budapest")
    const [humidity, setHumidity] = useState(91)
    const [windSpeed, setWindSpeed] = useState(3.6)
    const [weather, setWeather] = useState("01d")
    const [currentImage, setImage] = useState(weatherImgUrl + weather + "@2x.png")
    const [country, setCountry] = useState("HU")



    const search = async (city)=>{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()

            setTemperature(data.main.temp.toFixed(1))
            setCity(data.name)
            setCountry(data.sys.country)
            setHumidity(data.main.humidity)
            setWindSpeed(data.wind.speed)
            setWeather(data.weather[0].icon)
            setImage(weatherImgUrl + weather + "@2x.png")
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        search("Budapest")
    },[])

  return (
    <>
      <div className="flex justify-center items-center h-screen">
            <div className="w-[90vw] sm:w-[30vw] h-[80vh] backdrop-blur-sm bg-indigo-700/30 rounded-2xl flex flex-col items-center">
                <div className="flex flex-row">
                    <input id="cityInput" className="w-[70vw] sm:w-[20vw] h-[5vh] rounded-full my-4 text-center" type="text" placeholder='Search'/>
                    <div
                        onClick={() => {search(document.getElementById('cityInput').value)}}
                         className="w-[11vw] sm:w-[5vh] h-[5vh] rounded-full bg-white my-4 ml-2 flex items-center justify-center cursor-pointer">
                        <img className="w-6 mb-0.5 mr-0.5" src={searchLogo}/>
                    </div>
                </div>

                <div className="h-[30vh]">
                    <img className="h-[30vh]" src={currentImage} key={currentImage}/>
                </div>

                <div className="text-center">
                    <h1 className="text-8xl text-white">{temperature}°C</h1>
                    <h1 className="text-5xl text-white">{city}</h1>
                    <p className="select-none text-white">{country}</p>
                </div>

                <div className="flex flex-row justify-between w-[80vw] sm:w-[50vh] mt-[5vh]">
                    <div className="flex flex-row">
                        <img className="h-[5vh] mr-2" src={humidityLogo}/>
                        <div className="flex flex-col">
                            <p className="text-xl text-white">{humidity} %</p>
                            <p className="text-lg text-white">Humidity</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <img className="h-[5vh] mr-2" src={windLogo}/>
                        <div className="flex flex-col">
                            <p className="text-xl text-white">{windSpeed} km/h</p>
                            <p className="text-lg text-white">Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  )
    
    function currentWeather() {
        const inputBox = document.getElementById('cityInput')
        search(inputBox.value)

        switch (weather) {
            case "sunny":
                setImage(sunImage)
                break
            case "cloudy":
                setImage(cloudyImage)
        }
    }
}


export default App
