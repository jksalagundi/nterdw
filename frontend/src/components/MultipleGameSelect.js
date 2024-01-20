import React, {useState} from "react";
import _ from "lodash";
import {CheckBox} from "./CheckBox";

export const MultipleGameSelect = ({onSelection, location = ''}) => {
    const MultipleGameOptions = [
        {label: "Aunt Carol's Closet", value: 'aunt-carolyn-closet', selected: false, location: 'mckinney'},
        {label: "Amnesia", value: 'amnesia', selected: false, location: 'mckinney'},
        {label: "McKinney Penthouse", value: 'mckinney-penthouse', selected: false, location: 'mckinney'},
        {label: "Principal's Office", value: 'principals-office', selected: false, location: 'mckinney'},
        {label: "Submerged", value: 'submerged', selected: false, location: 'mckinney'},
        {label: "Dragon's Curse", value: 'dragons-curse', selected: false, location: 'plano'},
        {label: "Empire City", value: 'empire-city', selected: false, location: 'plano'},
        {label: "Jailhouse", value: 'jailhouse', selected: false, location: 'plano'},
        {label: "Plano Penthouse", value: 'plano-penthouse', selected: false, location: 'plano'},
        {label: "Summer Camp", value: 'summer-camp', selected: false, location: 'plano'},
        {label: "Killer's Camp", value: 'killers-campground', selected: false, location: 'plano'},
        {label: "Others", value: 'others', selected: false},
    ]
    const [listings, setListings] = useState(MultipleGameOptions);

    const GameListings = (location === '' || location === 'all') ? _.cloneDeep(MultipleGameOptions) :
        _.filter(MultipleGameOptions, (game) => game.location === location);
    let checkOptions = GameListings.map((game) => {
        return <CheckBox key={`check-${game.value}`}
                         classname={'w-auto p-1 mx-1'}
                         defaultValue={false}
                         title={`${game.label}`}
                         onChange={(selected) => {
                             let index = _.findIndex(listings, ((opt) => {
                                 return opt.value === game.value
                             }));
                             if (index !== -1) {
                                 let options = _.cloneDeep(listings);
                                 options[index].selected = !options[index].selected;
                                 setListings(options);
                                 onSelection(options);
                             }
                         }}/>
    })
    return (
        <div className={'w-full grid grid-cols-4 gap-0.5 m-1 bg-gray-50 border border-gray-200 rounded-sm shadow-md'}>
            {checkOptions}
        </div>
    );
}
