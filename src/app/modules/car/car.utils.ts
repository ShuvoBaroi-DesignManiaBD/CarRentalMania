const convertTimeToHours = (times:string[]) => {
    const arrayOfTimesInMinutes:number[] = [];
    const timesInMinutes:void[] = times.map((time:string)=> {
        const timeInMinutes = Number(time.split(':')[0] * 60) + Number(time.split(':')[1]);
        console.log(timeInMinutes);
        
        arrayOfTimesInMinutes.push(timeInMinutes);
    })

    const totalCost = Number((arrayOfTimesInMinutes[1] - arrayOfTimesInMinutes[0])/60);
    console.log(arrayOfTimesInMinutes, totalCost);
    
    return totalCost;
}

export default convertTimeToHours;