export function taskProps() {
    return {
        id: 0,
        city: 0,
        published_by: 0,
        published_on: 0,
        finished_by: 0,
        finished_on: 0,
        applicants: [],
        title: '',
        text: '',
        resources: [],
        recruits: [],
        categories: [],
        tags: [],
        likes: [],
        status: 'open',
        isHidden: false,
        error: false
    }
}

export function dateFormat(time, showTime = false) {
    let date;

    if (time instanceof Date) {
        date = time;
    } else {
        date = new Date(time);
    }

    const yy = date.getFullYear().toString().substr(2, 2);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let result = dd + '.' + mm + '.' + yy;

    if (showTime) {
        let hh = date.getHours();
        let ii = date.getMinutes();

        if (hh < 10) hh = '0' + hh;
        if (ii < 10) ii = '0' + ii;

        result += ' ' + hh + ':' + ii
    }

    return result;
}

export function nl2br(text) {
    const br = '<br /><br />';

    return (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + br + '$2');
}

export function num2word(num, words) {
    num = num % 100;
    if (num > 19) num = num % 10;

    switch (num) {
        case 1: return(words[0]);
        case 2: case 3: case 4: return(words[1]);
        default: return(words[2]);
    }
}

/*export function cultureInfo() {
    return {
        day: {
            name: ['Воскресенье', 'Понедельник'],
            abbr: ['Вск', 'Пнд']
        },
        month: {
            name: ['Январь', 'Февраль'],
            abbr: ['Янв', 'Фев']
        }
    }
}*/