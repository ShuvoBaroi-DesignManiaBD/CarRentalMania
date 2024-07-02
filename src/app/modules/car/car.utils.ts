const convertTimeToHours = (times: string[]) => {
    const arrayOfTimesInMinutes: number[] = [];
    
    times.forEach((time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        arrayOfTimesInMinutes.push(timeInMinutes);
    });

    const totalCost = (arrayOfTimesInMinutes[1] - arrayOfTimesInMinutes[0]) / 60;
    return totalCost;
};

export default convertTimeToHours;
