function toDoReducer(toDo, action) {
    switch (action.type) {
        case 'add': {
            const { item, finishState, id } = action;
            let _toDo = [...toDo];
            _toDo.push({
                item,
                finishState,
                id
            })
            return _toDo
        }
        case 'remove': {
            let _toDo = [...toDo];
            for (let i = 0; i < _toDo.length; i++) {
                if (_toDo[i].id === action.id) {
                    _toDo.splice(i, 1);
                    break;
                }
            }
            return _toDo
        }
        case 'getFromLocalStorage': {
            return action.data
        }
        case 'top': {
            let _toDo = [...toDo];
            for (let i = 0; i < _toDo.length; i++) {
                if (_toDo[i].id === action.id) {
                    let [item] = _toDo.splice(i, 1);
                    _toDo.unshift(item)
                }
            }
            return _toDo
        }
        default: {
            return toDo
        }
    }

}

function haveDoneReducer(haveDone, action) {
    switch (action.type) {
        case 'add': {
            let _haveDone = [...haveDone];
            const { item, finishState, id } = action;
            _haveDone.unshift({
                item,
                finishState,
                id
            })
            return _haveDone
        }
        case 'remove': {
            let _haveDone = [...haveDone];
            for (let i = 0; i < _haveDone.length; i++) {
                if (_haveDone[i].id === action.id) {
                    _haveDone.splice(i, 1);
                    break;
                }
            }
            return _haveDone
        }
        case 'getFromLocalStorage': {
            return action.data
        }
        default: {
            return haveDone
        }
    }
}

export { toDoReducer, haveDoneReducer }