import React from "react";
import Popup from 'reactjs-popup';
import {nanoid} from 'nanoid';
import {Input} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk, faSquarePlus, faMagnifyingGlass, faPlus, faXmark, faTag, 
        faArrowUpFromBracket, faArrowsRotate, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Entry from './Entry';
import 'reactjs-popup/dist/index.css';

library.add(faFloppyDisk);
library.add(faMagnifyingGlass);
library.add(faSquarePlus);
library.add(faPlus);
library.add(faXmark);
library.add(faTag);
library.add(faArrowUpFromBracket);
library.add(faArrowsRotate);
library.add(faArrowDownWideShort);

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            allTagsList: new Set(), //must store as list in localstorage
            entryTitle: '',
            entryDescription: '',
            searchText: '',
            entryB64ImageList: [],
            display: 'entryList', //either entrylist or editEntry
            entryTag: '',
            tagList: new Set(),  //must store as list in localstorage
            selectedTags: new Set(),
            showPopup: false,
            showCheckboxes: false,

        };
    }
 
    addTag = () => {
        if (this.state.entryTag.trim().length <= 0){ return; }
                
        this.state.tagList.add(this.state.entryTag.trim()); 

        this.state.allTagsList.add(this.state.entryTag.trim()); 

        this.setState({
            entryTag: '',
            showPopup: !this.state.showPopup,
        });
        this.forceUpdate();
    }

    deleteTag = (tag) => {
        console.log(tag);
        for (let i = 0; i < Array.from(this.state.tagList).length; i++){
            if (Array.from(this.state.tagList)[i] === tag){
                this.state.tagList.delete(Array.from(this.state.tagList)[i]);
                break;
            }
        }
        this.potentiallyRemoveTags();
        this.forceUpdate();
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    toggleCheckboxes() {
        this.setState({
          showCheckboxes: !this.state.showCheckboxes
        });
        this.forceUpdate();
    }

    //occurs either when creating a new entry or when finished editting one
    onSave = () => {
        //empty title box so default it
        if (!this.state.entryTitle || this.state.entryTitle.trim().length === 0){
            this.state.entryTitle = "Untitled";
        }

        //if there exists a description, add it to the list of entries
        if (this.state.entryDescription.trim().length > 0){
            this.state.entryList.push({
                id: nanoid(4), 
                title: this.state.entryTitle,
                description: this.state.entryDescription,
                date: new Date(),
                images: this.state.entryB64ImageList,
                tagList: Array.from(this.state.tagList),
            });
            for (let i = 0; i < Array.from(this.state.tagList).length; i++){
                this.state.allTagsList.add(Array.from(this.state.tagList)[i]);
            }   
        }

        //empty out the current state because it was saved
        this.setState({
            display: 'entryList',
            entryTitle: '',
            entryDescription: '',
            tagList: new Set(),
            selectedTags: new Set(),
            entryB64ImageList: [],
        });
        this.forceUpdate();
    }

    potentiallyRemoveTags = (entry) => {
        let stillUsedTags = new Set();

        //for every still-existing entry, add all of its tags into stillUsedTags
        for (let i = 0; i < this.state.entryList.length; i++){
            for (let j = 0; j < this.state.entryList[i].tagList.length; j++){
                stillUsedTags.add(this.state.entryList[i].tagList[j]);
            }
        }
        for (let i = 0; i < Array.from(this.state.tagList).length; i++){
            stillUsedTags.add(Array.from(this.state.tagList)[i]);
        }

        this.state.allTagsList = stillUsedTags;
        this.forceUpdate(); 
    }

    //remove an entry given its id
    deleteEntry = (id, inEdit=false) => {
        let remainingEntries = [];
        let removedEntry;
        for (let i = 0; i < this.state.entryList.length; i++){
            if (this.state.entryList[i].id === id){
                //we found the one entry we shouldnt add
                removedEntry = this.state.entryList[i];
            }
            else{
                remainingEntries.push(this.state.entryList[i]);
            }
        }
        //const remainingEntries = this.state.entryList.filter((e) => e.id !== id);
        this.state.entryList = remainingEntries;

        //potentially remove tags of the entry thats being removed
        if (!inEdit){ this.potentiallyRemoveTags(removedEntry); }

        this.forceUpdate();
    }

    //edit an entry given its id
    editEntry = (id) => {
        const entries = this.state.entryList;
        entries.map(entry=>{      
            if(entry.id === id){
                if (!entry.title || entry.title.trim().length === 0){
                    this.state.entryTitle = "Untitled";
                }
                this.setState({
                    entryTitle: entry.title,
                    entryDescription: entry.description,
                    tagList: new Set(entry.tagList),
                    display: 'editEntry',
                    entryB64ImageList: entry.images,
                });

                //remove the entry being edited, to add the new entry
                //this.state.entryList = this.state.entryList.filter(entry => entry.id != id); 
                this.deleteEntry(id, true);
                this.forceUpdate();
            }
        })
        this.forceUpdate();
    }

    //stores in the state the value in the search text box
    search = (event) => {
        this.setState({
            searchText: event.target.value,
        });
    }

    //stores in the state the value in the description box
    handleDescriptionChange = (event) => {
        this.setState({
            entryDescription: event.target.value,
        });
        this.forceUpdate();
    }

    //stores in the state the value in the title box
    handleTitleChange = (event) => {
        this.setState({
            entryTitle: event.target.value,
        });
    }

    handleTagChange = (event) => {
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTag: event.target.value,
            });
        }
        this.forceUpdate();
    }

    //on the every opening of the journal page
    componentDidMount = () => {
        const savedEntries = JSON.parse(localStorage.getItem('entryList-data')); //receives a list
        const savedAllTagsList = new Set(JSON.parse(localStorage.getItem('allTagsList-data'))); //receives a list and casts to set

        //if there exist items in the localStorage, save it as our state
        if (savedEntries){ this.state.entryList = savedEntries; }
        else{ this.state.entryList=[] }
        
        if (savedAllTagsList){
            this.state.allTagsList = savedAllTagsList;
        }
        else{
            this.state.allTagsList=new Set();
        }

        this.forceUpdate();
    }

    //on each change to the page
    componentDidUpdate(){
        localStorage.setItem('entryList-data', JSON.stringify(this.state.entryList));
        localStorage.setItem('allTagsList-data', JSON.stringify(Array.from(this.state.allTagsList))); //store as a list
    }

    //change display mode to the editEntry page
    editDisplay = () => {
        this.setState({
            display: 'editEntry',
        });
        this.forceUpdate();
    }

    //sort entryList by title reverse alphabetically
    sortByTitle = () => {
        this.setState({
            entryList: this.state.entryList.sort((a, b) => 
                ((a.title).toLowerCase() > (b.title).toLowerCase()) ? 1 : -1)
        });
        this.forceUpdate();
    }

    //sort entryList by date (most recent to least recent)
    sortByDate = () => {
        this.setState({
            entryList: this.state.entryList.sort((a, b) => (a.date > b.date) ? 1 : -1)
        });
        this.forceUpdate();
    }

    checkOnlyOne = (checkBox) => {
        //falsify all checkboxes and then check off the correct one
        document.getElementById("titleCheckbox").checked = false;
        document.getElementById("dateCheckbox").checked = false;
        document.getElementById(checkBox).checked = true;
    }

    //handles the title sorting check box
    handleTitleCheckChange = () => {
        //skip if should be unchecked
        if (!document.getElementById("titleCheckbox").checked){return;}
        this.checkOnlyOne("titleCheckbox");
        this.sortByTitle();
        this.forceUpdate();
    }

    //handles the Date sorting check box
    handleDateCheckChange = () => {
        //skip if should be unchecked
        if (!document.getElementById("dateCheckbox").checked){return;}
        this.checkOnlyOne("dateCheckbox");
        this.sortByDate();
        this.forceUpdate();
    }

    imageUpload = async (e) => {
        const file_list = e.target.files;
        for (let i = 0; i < file_list.length; i++){
            let base64 = await getBase64(file_list[i]);
            this.state.entryB64ImageList.push(base64);
        }
        this.forceUpdate();
    };

    filterBySearch = () => {
        return (
            this.state.entryList.filter((e) => (e.title).toLowerCase().includes(this.state.searchText))
        );
    }

    selectTag = (event) => {
        this.state.selectedTags.add(event.target.value);
        this.forceUpdate();
    }

    filterByTag = (searchFilteredEntries) => {
        let taggedEntries = [];
        let shouldSkip = false;
        if(this.state.selectedTags.size === 0){
            return searchFilteredEntries;
        }
        searchFilteredEntries.map( entry => //for each element in the search-filtered list
            {  
                shouldSkip = false; 
                this.state.selectedTags.forEach((tag) => { //for each selected tag
                    //if the element has any of the selected tags, 
                        //then display it and skip the rest of the tags to not create duplicates
                    if(!shouldSkip && entry.tagList.includes(tag)){ 
                        taggedEntries.push(entry);
                        shouldSkip = true;
                    }
                });
            })
        return taggedEntries;
    }
    
    resetAllTagsList = () => {
        this.setState({
            selectedTags: new Set()
        })
    }

    render = () => {
        return (
            <div className="journal">   
                <div className='row'>
                    <div className='column'>
                        <div className='search'>
                            <FontAwesomeIcon icon="magnifying-glass" />
                            <input onChange={this.search} type="text"/>
                        </div>
                        {this.state.display == "entryList" && (
                            <div>
                                <button 
                                    onClick={() => {this.editDisplay()}}
                                    className='delete' >
                                    <FontAwesomeIcon icon="square-plus" />
                                    
                                </button>

                                <button 
                                    onClick={() => {this.toggleCheckboxes()}}
                                    className='delete' >
                                    <FontAwesomeIcon icon="arrow-down-wide-short" />
                                </button>

                                <button 
                                    className= "reset-tags"
                                    key={nanoid()}
                                    onClick={this.resetAllTagsList}
                                    ><FontAwesomeIcon icon="arrows-rotate" />
                                </button>
                            </div>
                        )}
                        {this.state.showCheckboxes == true && (
                            <label className='checkboxes'>
                            <div>
                                <Input
                                    id="titleCheckbox"
                                    type="checkbox"
                                    name="title"
                                    onClick={this.handleTitleCheckChange}
                                />
                            </div>Title
                            
                            <div>
                                <Input
                                    id="dateCheckbox"
                                    type="checkbox"
                                    name="date"
                                    onClick={this.handleDateCheckChange}
                                />
                            </div>Date
                        </label>
                        )}
                            
                        <div className = "tag-list">
                            {Array.from(this.state.selectedTags.values()).map(tag => (
                                <div>
                                    <button 
                                        className = "selected-tag"
                                        value = {tag}
                                        key={nanoid()}
                                        //onClick={this.selectTag}   
                                    >
                                        {tag}
                                    </button>
                                    
                                </div>
                                ),
                            )}
                            {Array.from(this.state.allTagsList.values()).map(tag => (
                                <div>
                                    <button 
                                        id = "select-tag"
                                        value = {tag}
                                        key={nanoid()}
                                        className = "unselected-tag"
                                        onClick={this.selectTag}   
                                    >
                                        {tag}
                                    </button>
                                    
                                </div>
                                ),
                            )}
                        </div>
                        
                    </div>

                    <div className='column'>
                        {this.state.display == "entryList" && (
                            <div className="entry-list"> 
                                {this.filterByTag(this.filterBySearch()).map(entry => (
                                    <Entry
                                        id={entry.id}
                                        title={entry.title}
                                        description={entry.description}
                                        images={entry.images}
                                        tagList={Array.from(entry.tagList)}
                                        date={entry.date}
                                        key={nanoid()} //each entry needs a unique id for rendering
                                        handleDeleteEntry={this.deleteEntry}
                                        handleEditEntry={this.editEntry}
                                    />
                                    ),
                                )}
                            </div>
                        )}

                        {this.state.display == "editEntry" && (
                            <div className = "spacing">
                                <div className="entry new">
                                    <textarea className= "entry-title"
                                        rows='1'
                                        cols = '10'
                                        //placeholder='Enter title...'
                                        onChange={this.handleTitleChange}
                                        value={this.state.entryTitle}
                                    />

                                    <textarea className= "entry-description"
                                        rows='4'
                                        cols = '10'
                                        //placeholder='Type to create the Journal Entry...'
                                        onChange={this.handleDescriptionChange}
                                        value={this.state.entryDescription}
                                    />
                                    <div className="entry-images">
                                        {this.state.entryB64ImageList.map(img => {
                                            const image = img
                                            return <img key={nanoid()} src={image} alt="info"></img>
                                        })}
                                    </div>
                                    
                                    {this.state.showPopup == true && (
                                        <div className = "tag-pop-up">
                                            <textarea className= "entry-tag"
                                                rows='1'
                                                cols = '16'
                                                placeholder='tag...'
                                                onChange={this.handleTagChange}
                                            />

                                            <button 
                                                onClick={this.addTag}
                                                className='add-tag' >
                                                <FontAwesomeIcon icon="plus" />
                                            </button>
                                        </div>
                                    )}
                                    <div className = "tag-list">
                                        {Array.from(this.state.tagList).map(tag => (
                                            <button 
                                                className="tag-button"
                                                id = {nanoid()}
                                                value = {tag}
                                                key={nanoid()} >

                                                {tag}
                                                <FontAwesomeIcon key={nanoid()} id={nanoid()} icon="xmark" onClick={() => this.deleteTag(tag)}/>
                                            </button>
                                            ),
                                        )}
                                    </div>   
                                    <div className="entry-footer">
                                        <button 
                                            onClick={() => {{this.togglePopup()}}} 
                                            className='add-tag' >
                                            <FontAwesomeIcon icon="tag" />
                                        </button>
                                        
                                        <input type="file"
                                            id="img-upload" name="img-upload"
                                            accept="image/png, image/jpeg"
                                            onChange={this.imageUpload}
                                            multiple="multiple"
                                        />

                                        <button 
                                            onClick={() => {this.onSave()}} 
                                            className='save' >
                                            <FontAwesomeIcon icon="floppy-disk" />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default JournalTab;


/* NOTES/Stuff to do
    PRESSING THE DELETE BUTTON ON A TAG JUST REMOVES THE FIRST TAG IN THE TAGLIST, NOT THE CORRECT TAG

    check if we need to remove tags after deleting entries
        usually in just adding and deleting entries the tags behave as expected, but in the edit mode
        it messes up the displayed alltagslist until it saves

    put refresh button by the alltagslist

    disable all the compilation warnings from the linter (before the demo)
    
    -------gotta scale the inputted images to not be massive
    -------edit mode deletes all tags
    -------make everything lower before sorting (C comes before a)
    -------defaulting Entry Title #N and Entry Description N
        writing a title and then deleting wont remove it
    -------clicking multiple tags doesnt sort correctly
    -------save tags to local storage
    -------have a different color for tags that are selected
    
*/
