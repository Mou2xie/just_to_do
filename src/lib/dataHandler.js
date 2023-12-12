import localforage from 'localforage';

function saveDataToLocalForage(key, data) {
    localforage.setItem(key, JSON.stringify(data));
}

async function getDataFromLocalForage(key) {
    let data = JSON.parse(await localforage.getItem(key));
    if (data) {
        for (let item of data) {
            item.id = Symbol('id');
        }
    }else{
        data = [];
    }
    return data
}

export { saveDataToLocalForage, getDataFromLocalForage }