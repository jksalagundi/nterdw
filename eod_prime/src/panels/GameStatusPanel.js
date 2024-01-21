import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeGame } from "../redux/mastersSlice";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";

const GameStatusForm = ({ game, index }) => {
    const gameStatus = ["Good", "Functional", "Broken"];
    const [status, setStatus] = useState(gameStatus[0]);
    const [details, setDetails] = useState('');
    return (
        <div className="flex flex-row p-1 gap-1" key={`${game.game}-${index}`}>
            <p className="w-2 text-right text-secondary text-md pr-3">{game.game}</p>
            <div className="w-auto">
                <SelectButton options={gameStatus}
                    className="w-full"
                    onChange={(e) => setStatus(e.value)}
                    value={status} />
            </div>
            <div className="w-7">
                <InputText id="statusDetails"
                    className="w-full" key="shift_lead_input"
                    autoFocus="autoFocus" value={details}
                    tooltip={"Description of any damage ?"} tooltipOptions={{ position: "top" }}
                    placeholder="Details of any challenge with the game"
                    onChange={(e) => setDetails(e.target.value)} />
            </div>
        </div>
    )
}

export const GameStatusPanel = ({ }) => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state.masters.games);
    const selectedLocation = useSelector((state) => state.masters.selectedLocation);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");


    const filterGames = () => {
        if (games && games.length > 0 && selectedLocation) {
            return games.filter((game) => game.location === selectedLocation)
        }
        return [];
    }

    const gameOptions = filterGames().map((game, index) => {
        return <GameStatusForm game={game} index={index} key={index} />
    });
    return (
        <div className="card w-full flex flex-column my-1 mx-3 px-3 py-1 ">
            {gameOptions}
            <div className="w-full flex flex-row justify-content-center">
                <Button icon={'pi pi-send'}
                    className="w-15rem justify-content-center"
                    label="Edit Notes & Submit"
                    disabled={selectedLocation === null}
                    onClick={() => setVisible(true)} />
            </div>
            <Dialog header="EOD Notes" visible={visible} position={'bottom'}
                style={{ width: '75vw'}}
                onHide={() => setVisible(false)}
                draggable={false} resizable={false}>
               <div className="card flex flex-column gap-2">
                    <Editor value={text} 
                            onTextChange={(e) => setText(e.htmlValue)} 
                            style={{ height: '320px' }} />
                    <div className="flex flex-row justify-content-center gap-2 mt-3 py-3">
                        <Button label="Submit"/>
                        <Button label="Cancel"/>
                    </div>
                </div>
            </Dialog>
        </div>
    );

}