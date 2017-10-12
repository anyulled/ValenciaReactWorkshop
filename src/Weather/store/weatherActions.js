/**
 * Created by alrs on 11/07/2017.
 */
import axios from "axios";

const WEATHER_API = "bfc079575bff7ec0b8e4a53770e35ec7";
export const weatherActionType = {
    WEATHER_CLEAR: "weather/clear",
    WEATHER_LOAD: "weather/load",
    WEATHER_ERROR: "weather/error",
    WEATHER_LOADED: "weather/loaded"
};

export const clearData = () => ({
    type: weatherActionType.WEATHER_CLEAR
});
export const loadedData = () => ({
    type: weatherActionType.WEATHER_LOADED
});

export const errorData = (error) => ({
    type: weatherActionType.WEATHER_ERROR,
    payload: error
});

export const loadData = (response) => ({
    type: weatherActionType.WEATHER_LOAD,
    payload: {
        city: response.data.city.name,
        country: response.data.city.country,
        forecast: response.data.list.map(weather => ({
            icon: weather.weather[0].icon,
            date: weather.dt,
            description: weather.weather[0].description,
            minTemp: weather.temp.min,
            maxTemp: weather.temp.max,
            humidity: weather.humidity
        }))
    }
});

export function loadWeatherDataByLatLong(latitude, longitude) {
    return (dispatch) => {
        // dispatch(clearData());
        axios("http://api.openweathermap.org/data/2.5/forecast/daily",
            {
                params:
                    {
                        units: "metric",
                        lang: "es",
                        lat: latitude,
                        lon: longitude,
                        appid: WEATHER_API
                    }
            })
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    };
}

export function loadWeatherDataByCityID(cityId) {
    return (dispatch) => {
        //dispatch(clearData());
        axios("http://api.openweathermap.org/data/2.5/forecast/daily", {
            params: {
                units: "metric",
                lang: "es",
                id: cityId,
                appid: WEATHER_API
            }
        })
            .then(response => dispatch(loadData(response)))
            .catch(error => dispatch(errorData(error.message)));
    };
}