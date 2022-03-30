import Entry from './Entry';

const EntryList = ({entryList}) =>{
    //loop through entry list and for each entry item, render an Entry
    /*return <div className = 'entry-list'>
        {entryList.map((entry) => <Entry/>)} 
    </div>*/
    return <div className = 'entry-list'>
        <Entry/>
        <Entry/>
        <Entry/>
        <Entry/>
    </div>
};

export default EntryList;