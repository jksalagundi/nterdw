import React, {useState} from "react";
import Select from "react-select";
import {Styles} from "../utils/CommonStyles";
import {useDispatch} from "react-redux";
import {changeFilterGame} from "../redux/features/filters/filterSlicer";

export const GameSelect = () => {
    const [game, setGame] = useState(null);
    const dispatch = useDispatch();
    const GameOptions = [
        {label: 'All Games', value: 'all'},
        {label: "Aunt Carol's Closet", value: 'aunt-carols-closet'},
        {label: "Amnesia", value: 'amnesia'},
        {label: "McKinney Penthouse", value: 'mckinney-penthouse'},
        {label: "Principal's Office", value: 'principals-office'},
        {label: "Submerged", value: 'submerged'},
        {label: "Dragon's Curse", value: 'dragons-curse'},
        {label: "Empire City: Superhero", value: 'empire-city-superhero'},
        {label: "Empire City: Villains", value: 'empire-city-villains'},
        {label: "Jailhouse", value: 'jailhouse'},
        {label: "Plano Penthouse", value: 'plano-penthouse'},
        {label: "Summer Camp", value: 'summer-camp'},
        {label: "Killer's Camp", value: 'killers-camp'},
    ]
    return (
        <div className={'w-full self-center'}>
            <div className={'col-span-1 flex justify-start'}>
                <span className={Styles.select_icon_style}>chess</span>
                <div className={'w-full mx-1 self-center'}>
                    <Select options={GameOptions}
                            placeholder={'Change Game'}
                            onChange={(selectedOption) => {
                                setGame(selectedOption.value);
                                dispatch(changeFilterGame(selectedOption.value))
                            }}
                            defaultValue={game}/>
                </div>
            </div>
        </div>
    );
}
