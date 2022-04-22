import React from "react";
import Popup from 'reactjs-popup';
import {nanoid} from 'nanoid';
import {Input} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk, faSquarePlus, faMagnifyingGlass, faPlus, faXmark, faTag } from "@fortawesome/free-solid-svg-icons";
import Entry from './Entry';
import 'reactjs-popup/dist/index.css';
library.add(faFloppyDisk);
library.add(faMagnifyingGlass);
library.add(faSquarePlus);
library.add(faPlus);
library.add(faXmark);
library.add(faTag);

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* ENTRY Parameters {
                id: nanoid(),
                title: "",
                description: "",
                images: [],

                //to be implemented in the future
                lastUpdated: "3/27/2022",
                tagList: [],
            }*/
            entryList: this.props.entries,
            //TODO: base the default entry title off of a counter, not the length
            entryTitle: '',
            entryDescription: '',
            searchText: '',
            display: 'entryList', //either entrylist or editEntry
            titleChecked: false,
            dateChecked: false,
            entryTag: '',
            tagList: new Set(), 
            allTagsList: new Set(),
            selectedTags: [],
            showPopup: false,
        };
    }

   
    //specific to journalentries
    addImage = (jpg) => {
        this.setState({
            images: [...jpg],
        });
    }

    addTag = () => {
        this.state.tagList.add(this.state.entryTag);
        this.state.allTagsList.add(this.state.entryTag);
        
       
        console.log(this.state.allTagsList);
        this.setState({
            entryTag: '',
            showPopup: !this.state.showPopup,
        });
        this.forceUpdate();
    }
  
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    
    //occurs either when creating a new entry or when finished editting one
    onSave = () => {
        //empty title box so default it
        if (!this.state.entryTitle){
            this.setState({
                entryTitle: `Entry Title ${this.state.entryList.length+1}`,
            })
        }

        //if there exists a description, add it to the list of entries
        if (this.state.entryDescription.trim().length > 0){
            this.state.entryList.push({
                id: nanoid(4), 
                title: this.state.entryTitle,
                description: this.state.entryDescription,
                date: new Date(),
                images: ["./images/journal.jpg"],//default every image to have the journal image
                tagList: this.state.tagList,
            });
        }

        //empty out the current state because it was saved
        this.setState({
            display: 'entryList',
            entryTitle: '',
            entryDescription: '',
            tagList: new Set(),
            selectedTags: [],
        });
        this.forceUpdate();
    }

    //remove an entry given its id
    deleteEntry = (id) => {
        const newEntries = this.state.entryList.filter((e) => e.id !== id);
        this.state.entryList = newEntries;
        this.forceUpdate();
    }

    //edit an entry given its id
    editEntry = (id) => {
        const entries = this.state.entryList;
        entries.map(entry=>{      
            if(entry.id === id){
                this.setState({
                    entryTitle: entry.title,
                    entryDescription: entry.description,
                    tagList: entry.tagList,
                    display: 'editEntry',
                });

                //remove the entry being edited, to add the new entry
                this.state.entryList = this.state.entryList.filter(entry => entry.id != id); 
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
        //TODO: in the title: putting a bunch of spaces, typing a character, and deleting the character, 
            //will add an entry that is titled that deleted character
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTitle: event.target.value,
            });
        }
    }

    handleTagChange = (event) => {
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTag: event.target.value,
            });
        }
        this.forceUpdate();
        //console.log(this.state.entryDescription);
    }

    //on componentDidMount(), grab everything in localStorage/postgress and set the state

    //on the first run of the page
    componentDidMount = () => {
        const savedEntries = JSON.parse(localStorage.getItem('react-journal-data'));
        //if there exist items in the localStorage, save it as our state
        if (savedEntries){ 
            this.state.entryList = savedEntries; 
        }
        this.forceUpdate();
    }

    //on each change to the page
    componentDidUpdate(){
        localStorage.setItem('react-journal-data', JSON.stringify(this.state.entryList));
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
            entryList: this.state.entryList.sort((a, b) => ((a.title).toLowerCase() > (b.title).toLowerCase()) ? 1 : -1)
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

    //sort entryList by tag alphabetically
    sortByTag = () => {
        this.forceUpdate();
    }

    checkOnlyOne = (checkBox) => {
        //falsify all checkboxes and then check off the correct one
        document.getElementById("titleCheckbox").checked = false;
        document.getElementById("dateCheckbox").checked = false;
        document.getElementById("tagCheckbox").checked = false;
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

    //handles the tag sorting check box
    handleTagCheckChange = () => {
        //skip if should be unchecked
        if (!document.getElementById("tagCheckbox").checked){return;}
        this.checkOnlyOne("tagCheckbox");
        this.sortByTag();
        this.forceUpdate();
    }



    filterBySearch = () => {
        return (
            this.state.entryList.filter((e) => (e.title).toLowerCase().includes(this.state.searchText))
        );
    }

    selectTag = (event) => {
        console.log("YO");
        console.log(event.target.value);
        //this.setState({
          //  selectedTags: this.state.selectedTags.concat([document.getElementById("tag-button").value])            
        //})
        this.state.selectedTags.push(document.getElementById("tag-button").value);
        this.forceUpdate();
    }

    filterByTag = (searchFilteredEntries) => {
        console.log("hi");
        console.log(this.state.selectedTags);
        let taggedEntries = [];
        if(this.state.selectedTags.length === 0){
            return searchFilteredEntries;
        }
        searchFilteredEntries.map( entry =>
            {
                console.log(entry.title);
                console.log(entry.tagList);
                for(var i = 0; i < this.state.selectedTags.length; i++){
                    if(entry.tagList.has(this.state.selectedTags[i])){
                        taggedEntries.push(entry);
                    }
                }     
            }
        )
        return taggedEntries;
    }
    
    render = () => {
        
        return (          
          //TODO: probably need one package to save the image as some datatype
            //look up react library where I can input an image and save it
            //can probably just look up "Add File" (figure out how to limit it to jpg)
          
            <div className="journal">   
                <div className='row'>
                    <div className='column'>
                        <div className='search'>
                            <FontAwesomeIcon icon="magnifying-glass" />
                            <input onChange={this.search} type="text" placeholder='type to search...'/>
                        </div>
                        {this.state.display == "entryList" && (
                            <button 
                                onClick={() => {this.editDisplay()}}
                                className='save' >
                                <FontAwesomeIcon icon="square-plus" />
                                New Entry
                            </button>
                        )}
                        <label className='checkboxes'>
                            <div>
                                <Input
                                    id="titleCheckbox"
                                    type="checkbox"
                                    name="title"
                                    //checked={this.titleChecked}
                                    onClick={this.handleTitleCheckChange}
                                />
                            </div>Title
                            
                            <div>
                                <Input
                                    id="dateCheckbox"
                                    type="checkbox"
                                    name="date"
                                    //checked={this.dateChecked}
                                    onClick={this.handleDateCheckChange}
                                />
                            </div>Date

                            <div>
                                <Input
                                    id="tagCheckbox"
                                    type="checkbox"
                                    name="tag"
                                    //checked={this.tagChecked}
                                    onClick={this.handleTagCheckChange}
                                />
                            </div>Tag
                        </label>
                        <div className = "tag-list">
                            {Array.from(this.state.allTagsList.values()).map(tag => (
                                <button 
                                    id = "tag-button"
                                    className="tag-button"
                                    onClick={this.selectTag}
                                    value = {tag}
                                >
                                    {tag}
                                </button>
                                ),
                            )}
                        </div>
                        
                        

                    </div>

                    <div className='column'>
                        {this.state.display == "entryList" && (
                            <div className="entry-list"> 
                                {this.filterByTag(this.filterBySearch()). map(entry => (
                                    <Entry
                                        id={entry.id}
                                        title={entry.title}
                                        description={entry.description}
                                        images={entry.images}
                                        tagList = {entry.tagList}
                                        date={entry.date}
                                        key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                                        handleDeleteEntry = {this.deleteEntry}
                                        handleEditEntry = {this.editEntry}
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
                                        placeholder='Enter title...'
                                        onChange={this.handleTitleChange}
                                    >  
                                        {this.state.entryTitle}
                                    </textarea>
                                    <textarea className= "entry-description"
                                        rows='4'
                                        cols = '10'
                                        placeholder='Type to create the Journal Entry...'
                                        onChange={this.handleDescriptionChange}
                                    >
                                        {this.state.entryDescription}
                                    </textarea>

                                    {this.state.showPopup == true && (
                                        <div className = "tag-pop-up">
                                            <textarea className= "entry-tag"
                                                rows='1'
                                                cols = '16'
                                                placeholder='tag...'
                                                //value={entryDescription} for resetting state but i dont think i need this bc of the last line of handlesaveclick
                                                onChange={this.handleTagChange}>
                                            </textarea>
                                            <button 
                                                onClick={this.addTag}
                                                className='add-tag' >
                                                <FontAwesomeIcon icon="plus" />
                                            </button>
                                        </div>
                                    )}
                                    <div className = "tag-list">
                                        {Array.from(this.state.tagList).map(tag => (
                                            <button className="tag-button">
                                            {tag}
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


