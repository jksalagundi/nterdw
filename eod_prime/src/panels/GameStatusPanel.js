import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {SelectButton} from "primereact/selectbutton";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {updateDetails, updateNotes} from "../redux/reducers/formSlice";
import { ButtonBar } from "./components/ButtonBar";

const GameStatusForm = ({game}) => {
    const dispatch = useDispatch();
    const gameStatus = ["Good", "Functional", "Broken"];
    const [status, setStatus] = useState(gameStatus[0]);
    const [details, setDetails] = useState('');
    return (
        <div className="flex flex-row p-1 gap-1" key={`${game.id}`}>
            <p className="w-2 text-right text-secondary text-md pr-3">{game.name}</p>
            <div className="w-auto">
                <SelectButton options={gameStatus}
                              className="w-full"
                              onChange={(e) => {
                                  setStatus(e.value);
                                  dispatch(updateDetails({id: game.id, status: e.value, details}))
                              }}
                              value={status}/>
            </div>
            <div className="w-7">
                <InputText id="statusDetails"
                           className="w-full" key="shift_lead_input"
                           autoFocus="autoFocus" value={details}
                           tooltip={"Description of any damage ?"} tooltipOptions={{position: "top"}}
                           placeholder="Details of any challenge with the game"
                           onChange={(e) => {
                               setDetails(e.target.value);
                               dispatch(updateDetails({id: game.id, status, details: e.target.value}))
                           }}/>
            </div>
        </div>
    )
}

export const GameStatusPanel = () => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state.masters.games);
    const selectedLocation = useSelector((state) => state.form.selectedLocation);
    const [visible, setVisible] = useState(false);
    const [notes, setNotes] = useState("");

    const filterGames = () => {
        if (games && games.length > 0 && selectedLocation) {
            return games.filter((game) => game.location === selectedLocation.id)
        }
        return [];
    }

    const gameOptions = filterGames().map((game, index) => {
        return <GameStatusForm game={game} index={index} key={index}/>
    });

    const handleNotesChanges = (value) => {
        setNotes(value);
        dispatch(updateNotes(value));
    }

    return (
        <div className="card w-full flex flex-column my-1 mx-3 px-3 py-1 ">
            {gameOptions}
            <div className="w-full flex flex-row justify-content-center">
                <Button icon={'pi pi-send'}
                        className="w-15rem justify-content-center"
                        label="Edit Notes & Submit"
                        disabled={selectedLocation === null}
                        onClick={() => setVisible(true)}/>
            </div>
            <Dialog header="EOD Notes" visible={visible} position={'bottom'}
                    style={{width: '75vw'}}
                    onHide={() => setVisible(false)}
                    draggable={false} resizable={false}>

                <div className="card flex flex-column gap-2">
                    <Editor value={notes}
                            onTextChange={(e) => handleNotesChanges(e.htmlValue)}
                            style={{height: '320px'}}/>
                 
                    <ButtonBar setVisibleFlag={setVisible}/>
                </div>
            </Dialog>
        </div>
    );
}
