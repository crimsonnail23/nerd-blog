module.exports ={
    // following code will format date to be more legible.
    format_date: date=>{
        return `
        ${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}
        `
    }
}