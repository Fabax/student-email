const cleanArray = (value) => {
    return value !== '' && value !== '\r' ? true : false;
}

const cleanCell = (cell) => {
    return cell.replace(/(\r\n|\n|\r)/gm, "").trim().toLowerCase()
}

const getWeekDate = () => {
    let currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) - 1;

    return weekNumber
}

const capitalize = (str) => {
    let names = str.split(" ")
    let namesArray = names.map((name, index) => {
        let newName = index === names.length - 1 ? name.charAt(0).toUpperCase() + name.slice(1) : name
        return newName
    })

    return namesArray.join(' ')
}

export { cleanArray, cleanCell, getWeekDate, capitalize }