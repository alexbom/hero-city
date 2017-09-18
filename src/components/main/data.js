/*
 Get User with VK API:
 https://maxfarseer.gitbooks.io/redux-course-ru/content/vzaimodeistvuem_s_vk.html
 https://vk.com/dev/Javascript_SDK
*/

export const user = {
    id: 1,
    name: 'Alexander Bom',
    ava: '',
    city: 1
};

export const statuses = [
    { name: 'open', translate: 'Открыто', icon: '' },
    { name: 'process', translate: 'Выполняется', icon: '' },
    { name: 'pause', translate: 'Приостановлено', icon: '' },
    { name: 'close', translate: 'Закрыто', icon: '' },
    { name: 'fail', translate: 'Провалено', icon: '' },
    { name: 'finish', translate: 'Выполнено', icon: '' }
];

export const categories = [
    { id: 1, translate: 'Материальная помощь' },
    { id: 2, translate: 'Физическая помощь' },
    { id: 3, translate: 'Нужна консультация' }
];

export const cities = [
    { id: 1, translate: 'Москва', heroes: [], tasks: { open: 10, close: 1 } },
    { id: 2, translate: 'Санкт-Петербург', heroes: [], tasks: { open: 4, close: 6 } },
    { id: 3, translate: 'Геленджик', heroes: [], tasks: { open: 20, close: 12 } }
];