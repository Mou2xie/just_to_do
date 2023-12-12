class KeyBoardHandler {

    static keyDownHandler = (compositionState, addToDo) => {
        return function (event) {
            if (event.key === 'Enter' && compositionState) {
                addToDo();
            }
        }
    }

    static compositionHandler = (setCompositionState) => {
        return function (event) {
            switch (event.type) {
                case 'compositionstart': {
                    setCompositionState(false);
                    break;
                }
                case 'compositionend': {
                    setCompositionState(true);
                    break;
                }
                default: {
                    return;
                }
            }
        }
    }
}

export { KeyBoardHandler }