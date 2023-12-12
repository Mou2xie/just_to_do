import './Home.css';
import add from '../assets/add.svg';
import add_hover from '../assets/add_hover.svg';
import coffee from '../assets/coffee.svg';
import { ListItem } from '../components/ListItem';
import { useState, useEffect, useReducer } from 'react';
import { toDoReducer, haveDoneReducer } from '../lib/reducers';
import { saveDataToLocalForage, getDataFromLocalForage } from '../lib/dataHandler';
import { Heading } from '../components/Heading';
import { KeyBoardHandler } from '../lib/keyBoardHandler';

const Home = () => {
    const [toDo, toDoDispatch] = useReducer(toDoReducer, []);
    const [haveDone, haveDoneDispatch] = useReducer(haveDoneReducer, []);

    const [inputValue, setInputValue] = useState('');
    const [compositionState, setCompositionState] = useState(true);
    const [addHover, setAddHover] = useState(false);
    const [hideDone, setHideDone] = useState(false);

    useEffect(() => {
        getDataFromLocalForage('toDo').then((data) => {
            toDoDispatch({
                type: 'getFromLocalStorage',
                data,
            });
        });
        getDataFromLocalForage('haveDone').then((data) => {
            haveDoneDispatch({
                type: 'getFromLocalStorage',
                data,
            });
        });
    }, []);

    useEffect(() => {
        saveDataToLocalForage('toDo', toDo);
        saveDataToLocalForage('haveDone', haveDone);
    }, [toDo, haveDone]);

    useEffect(() => {

        const keyDownHandler = KeyBoardHandler.keyDownHandler(compositionState, addToDo);
        const compositionHandler = KeyBoardHandler.compositionHandler(setCompositionState);

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('compositionstart', compositionHandler);
        document.addEventListener('compositionend', compositionHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('compositionstart', compositionHandler);
            document.removeEventListener('compositionend', compositionHandler);

        }

    }, [inputValue, compositionState]);

    useEffect(() => {
        window.electronApi.appWindowShow(() => {
            document.getElementsByTagName('input')[0].focus();
        });
        document.getElementsByTagName('input')[0].focus();
    });

    return (
        <div className=' flex flex-col h-screen'>
            <div className='h-4'></div>
            <div className=' h-14 shrink-0 flex items-center px-6'>
                <Heading data={toDo}></Heading>
                <div className='grow flex justify-end'>
                    {
                        haveDone.length > 0 ?
                            (
                                <div className={`w-4 h-4 rounded-full ${hideDone ? ` border-[3px] border-[#CFDBE0]` : ` bg-[#CFDBE0]`}`}
                                    onClick={() => { setHideDone(!hideDone) }}
                                ></div>
                            ) : null
                    }

                </div>
            </div>
            <div className=' bg-white grow rounded-t-[40px] flex flex-col px-6 overflow-y-scroll listContainer'>
                {
                    toDo.length === 0 && (haveDone.length === 0 || hideDone) ?
                        (
                            <div className=' self-center h-1/2 flex items-end select-none'>
                                <img src={coffee} alt='coffee'></img>
                            </div>
                        ) : null
                }
                {
                    hideDone ?
                        [...toDo].map((item, index) => <ListItem data={item} dispatch={{ toDoDispatch, haveDoneDispatch }} key={index}></ListItem>)
                        :
                        [...toDo, ...haveDone].map((item, index) => <ListItem data={item} dispatch={{ toDoDispatch, haveDoneDispatch }} key={index}></ListItem>)
                }
                <div>
                    <div className='h-24'></div>
                </div>
            </div>
            <div className='fixed left-6 right-6 bottom-5 bg-[#ECF0F1] rounded-xl border-slate-500 input'>
                <input
                    className=' focus:outline-none w-5/6 h-14 bg-[#ECF0F1] rounded-xl px-5 text-base text-[#5D6A6F]'
                    placeholder='Add...'
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}>
                </input>
                <img src={addHover ? add_hover : add} alt='add'
                    className=' absolute right-3 bottom-3'
                    onMouseOver={() => { setAddHover(true) }}
                    onMouseLeave={() => { setAddHover(false) }}
                    onClick={addToDo}></img>
            </div>
        </div >
    )

    function addToDo() {
        if (inputValue && (inputValue.trim()).length > 0) {
            toDoDispatch({
                type: 'add',
                item: inputValue,
                finishState: false,
                id: Symbol('id')
            });
        }
        setInputValue('');
    }
}

export { Home }