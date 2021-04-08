# Background:

As it's the time for month of Ramadan we would like to create a Ramadan time count down Ad.
Main purpose of the Ad banner is to show count down timer to Ifter and Sehri time, with eye
catching animation.

#Resources:
For Ramadan time table schedule you could use this following api
http://api.aladhan.com/v1/calendarByCity?city=Dhaka&country=Bangladesh&method=1&month=05&year=2020&tune=1

This api provides nice JSON format data for every month. read the api details in the following site
https://aladhan.com/prayer-times-api

```
timings: {
    Fajr: "04:05 (+06)",
    Sunrise: "05:26 (+06)",
    Dhuhr: "11:57 (+06)",
    Asr: "15:23 (+06)",
    Sunset: "18:29 (+06)",
    Maghrib: "18:29 (+06)",
    Isha: "19:50 (+06)",
    Imsak: "03:56 (+06)",
    Midnight: "23:57 (+06)"
},
date: {
    readable: "01 May 2020",
    timestamp: "1588302061",
    gregorian: {
        date: "01-05-2020",
        format: "DD-MM-YYYY",
        day: "01",
        weekday: {
        en: "Friday"
    },
    month: {
        number: 5,
        en: "May"
    },
    year: "2020",
    designation: {
        abbreviated: "AD",
        expanded: "Anno Domini"
    }
},
```

This portion of api data should be enough for you to make it work. Consider Imsak: "03:56 (+06)" as Sehri time and Sunset: "18:29 (+06)" as Ifter time.

#Requirements

1. When someone loads the banner in day time it should show count down time left for ifter. and when someone loads it after ifter it should show count down time left for Next sehri time.
2. Timer count down should be animated, see clock_ticker.mov file for an example; but not limited to this you are free to show your creativity.
3. Assets file is given and the final banner should be arranged like, see sample_300X250.psd file. You can extract required objects from the provided psd file.
4. Texts and object bellow the clock timer should appear as animation, see appear_in.mov file for an example; but not limited to this you are free to show your creativity.
5. After loading, on mouse over objects on the bottom part of the banner should show slight floating animation. See floating_gravity.mov file social sharing icon effect; but not limited to this you are free to show your creativity.

#Additional Points
There will be additional points if you are able to show day and night effect on the banner. You are free to do slight adjustments to the assets, to match the colour scheme of bright and dark background screen. And of-course you are free to show your creativity here. See day_night_effect.mov file as a reference to day and night effect.

#Use any of these 3rd party javascript libraries like Greensock GSAP, anime.js or similar.

#Size of the banner: 300x250
