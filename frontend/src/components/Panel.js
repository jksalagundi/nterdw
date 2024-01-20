import React, {useState} from "react";

export const Panel = ({children, onSelect, PanelTabs}) => {

    const [activeTab, setActiveTab] = useState(null);
    const tabOptions = PanelTabs.map((tab) => {
        const TabStyle = (activeTab ? tab.value === activeTab : tab.defaultActive) ?
            Styles.activeTabStyle : Styles.inActiveTabStyle;
        return (
            <div key={`Tab-${tab.value}`}
                 onClick={()=>{
                     setActiveTab(tab.value)
                     onSelect(tab.value)
                 }}
                 className={TabStyle}>
                {tab.label}
            </div>
        );
    });
    return (
        <div className={'w-auto h-auto min-h-fit mx-3 my-1 border border-gray-10 flex-col bg-gray-50'}>
            <div className={'w-full border-b-2 border-gray-300 flex justify-start'}>
                {tabOptions}
            </div>
            {children}
        </div>
    )
}
const Styles = {
    activeTabStyle: ' text-xl text-indigo-600 bg-indigo-50 p-3 text-center bg-gray-100 border border-gray-300 tracking-tight cursor-pointer',
    inActiveTabStyle: ' text-xl text-gray-300 p-3 text-center hover:text-blue-500 hover:bg-blue-50 border border-gray-50 cursor-pointer',
}
