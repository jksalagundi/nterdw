/**
 * ts_type :: 'week', 'month', 'qtr', 'year'
 * generates the last 'n' time series and returns as a list
 * @param ts_type
 * @param count
 * @param from_date
 * @param min_year
 */
const generate_time_series_labels = (ts_type, count=15, from_date = null, min_year=2017) =>{
    const from_dt = (from_date) ? from_date : new Date ();
    let from_year = from_dt.getFullYear();
    let from_month = from_dt.getMonth() + 1;
    let labels = [];

    const get_qtr = (month) => {
        if (month < 4) {
            return "Q1"
        } else if (month < 7) {
            return "Q2"
        } else if (month < 10){
            return "Q3"
        }
        return "Q4"
    }
    for (let n = count; n > 0; n--){
        switch (ts_type) {
            case 'week':
                // Will get to this later...
                break;
            case 'month':
                labels.push(`${from_year}-${(from_month < 10 ? "0":"")}${from_month}`);
                if (from_month <= 1){
                    from_month = 12
                    from_year -= 1;
                } else {
                    from_month --;
                }
                break;
            case 'qtr':
                labels.push(`${from_year}-${get_qtr(from_month)}`)
                from_month -=3;
                if (from_month <= 1){
                    from_month += 12
                    from_year -= 1;
                }
                break;
            case 'year':
                if (from_year > min_year)
                    labels.push(`FY-${from_year}`);
                from_year --;
                break;
            default:
                break;
        }
    }
    // console.log("Labels -- ", labels);
    return labels.sort();
}

export const TimeSeriesUtils = {
    generate_time_series_labels
}
