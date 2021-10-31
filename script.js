let weather = {
    apiKey: "f5a2fba6efb8043ed98b7a1c61723ce5",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            this.apiKey
        )
            .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        },
        search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
        },
    };

    document.querySelector(".search button").addEventListener("click", function () {
        weather.search();
    });

    // submit on enter
    document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
        });

    weather.fetchWeather("Whitewater");
