function displayTime(){
    const Time = document.getElementById("time")

    if(Time){
        const now = new Date();
        const time = now.toLocaleTimeString();
        const milliseconds = now.getMilliseconds();
        Time.innerHTML = `${time} <span>${milliseconds}ms</span> `;
    }
}
displayTime()
setInterval(displayTime, 50)