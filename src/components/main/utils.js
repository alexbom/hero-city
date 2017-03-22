import React from 'react';

export default class Utils extends React.Component {

    static defaultProps() {
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

    static dateFormat(time) {
        let date;

        if (time instanceof Date) {
            date = time;
        } else {
            date = new Date(time);
        }

        const yy = date.getFullYear().toString().substr(2, 2);
        let hh = date.getHours();
        let ii = date.getMinutes();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (hh < 10) hh = '0' + hh;
        if (ii < 10) ii = '0' + ii;

        return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + ii;
    }

    static nl2br(text) {
        const br = '<br /><br />';

        return (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + br + '$2');
    }

    /*static cultureInfo() {
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
    };*/
    
}