function dayFormatter(date: Date, delimiter: string = '') {
    function leftFiller(value: number) {
        if(value >= 10) return value
        return '0' + value
    }
    const year = date.getFullYear()
    const month = leftFiller(date.getMonth() + 1)
    const day = leftFiller(date.getDate())

    return [year, month, day].join(delimiter)
}

export default dayFormatter