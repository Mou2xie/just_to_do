import remove from '../assets/delete.svg';
import remove_hover from '../assets/delete_hover.svg';
import top from '../assets/top.svg'
import top_hover from '../assets/top_hover.svg'
import './ListItem.css';
import { useState } from 'react';

const ListItem = ({ data: { item, finishState, id }, dispatch: { toDoDispatch, haveDoneDispatch } }) => {

    const [mouseOverTop, setMouseOverTop] = useState(false);
    const [mouseOverRemove, setMouseOverRemove] = useState(false);

    return (
        <div className='h-12 flex flex-col group select-none listItem' onClick={clickItem}>
            <div className='flex items-center h-full'>
                <div className=' w-8 shrink-0'>
                    <div className={`h-3 w-3 rounded-full ${finishState ? `bg-[#BCC6CA]` : `border-2 border-[#BCC6CA]`} `}></div>
                </div>
                <div className={` text-base grow flex items-center ${finishState ? ` text-[#BCC6CA] line-through decoration-1 font-light` : `text-[#5D6A6F]`}`} >
                    <div className=' line-clamp-1'>
                        {item}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-1 shrink-0'>
                    <div className={finishState ? ` invisible ` : `p-1 invisible group-hover:visible`}
                        onMouseOver={() => { setMouseOverTop(true) }}
                        onMouseLeave={() => { setMouseOverTop(false) }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toDoDispatch({
                                type:'top',
                                id
                            });
                        }}>
                        <img src={mouseOverTop ? top_hover : top} alt='topIcon' width={20} height={20}></img>
                    </div>
                    <div className='p-1 invisible group-hover:visible'
                        onMouseOver={() => { setMouseOverRemove(true) }}
                        onMouseLeave={() => { setMouseOverRemove(false) }}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeFunc();
                        }}>
                        <img src={mouseOverRemove ? remove_hover : remove} alt='deleteIcon' width={20} height={20}></img>
                    </div>
                </div>
            </div>
            <div className='border-b border-[#EFF4F5] mx-8'></div>
        </div>
    )

    function clickItem() {
        if (finishState) {
            haveDoneDispatch({
                type: 'remove',
                id
            });
            toDoDispatch({
                type: 'add',
                item,
                finishState: false,
                id: Symbol('id')
            })
        } else {
            haveDoneDispatch({
                type: 'add',
                item,
                finishState: true,
                id: Symbol('id')
            });
            toDoDispatch({
                type: 'remove',
                id
            })
        }
    }

    function removeFunc() {
        if (finishState) {
            haveDoneDispatch({
                type: 'remove',
                id
            })
        } else {
            toDoDispatch({
                type: 'remove',
                id
            })
        }
    }

}

export { ListItem }