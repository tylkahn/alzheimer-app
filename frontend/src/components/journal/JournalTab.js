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
            /* ENTRY Parameters {
                id: nanoid(),
                title: "",
                description: "",
                images: [],
                tagList: [],
            }*/
            entryList: this.props.entries,
            entryTitle: '',
            entryDescription: '',
            searchText: '',
            entryB64ImageList: [],
            display: 'entryList', //either entrylist or editEntry
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
        if (this.state.entryTag.trim().length <= 0){ return; }
        this.state.tagList.add(this.state.entryTag);
        this.state.allTagsList.add(this.state.entryTag);
        this.setState({
            entryTag: '',
            showPopup: !this.state.showPopup,
        });
        this.forceUpdate();
    }

    deleteTag = (tag) => {
        this.state.tagList.delete(document.getElementById("delete-tag").value);
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
            entryB64ImageList: [],
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
                if (!entry.title || entry.title.trim().length === 0){
                    this.state.entryTitle = "Untitled";
                }
                this.setState({
                    entryTitle: entry.title,
                    entryDescription: entry.description,
                    tagList: entry.tagList,
                    display: 'editEntry',
                    entryB64ImageList: entry.images,
                    //taglist??/////////////////////////////////////////////////////////////////////////////////
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

    //on the first run of the page
    componentDidMount = () => {
        const savedEntries = JSON.parse(localStorage.getItem('entryList-data'));
        //if there exist items in the localStorage, save it as our state
        if (savedEntries){ 
            this.state.entryList = savedEntries; 
        }
        this.forceUpdate();
    }

    //on each change to the page
    componentDidUpdate(){
        localStorage.setItem('entryList-data', JSON.stringify(this.state.entryList));
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
        this.state.selectedTags.push(event.target.value);
        this.forceUpdate();
    }

    filterByTag = (searchFilteredEntries) => {
        let taggedEntries = [];
        if(this.state.selectedTags.length === 0){
            return searchFilteredEntries;
        }
        searchFilteredEntries.map( entry =>
            {
                for(var i = 0; i < this.state.selectedTags.length; i++){
                    if(entry.tagList.has(this.state.selectedTags[i])){
                        taggedEntries.push(entry);
                        break;
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
                                        value={this.state.entryTitle}
                                    />

                                    <textarea className= "entry-description"
                                        rows='4'
                                        cols = '10'
                                        placeholder='Type to create the Journal Entry...'
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
                                        <div className = "tag-pop-up"/*///////////////////////////////////////////*/>
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
                                                id = "delete-tag"
                                                value = {tag}
                                            >    
                                                {tag}
                                                <FontAwesomeIcon icon="xmark" width="7px" height="7px" onClick={this.deleteTag} />
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
    FIGURE OUT IF WE NEED THE BACKEND/DATABASE bc according to the demos, mentors, and sheldon,
        we really dont need it at all
    
    figure out whats up with popups (if anything can be removed)
    
    all the compilation warnings from the linter (disable it before the demo)
    
    -------gotta scale the inputted images to not be massive
    -------edit mode deletes all tags
    -------make everything lower before sorting (C comes before a)
    -------defaulting Entry Title #N and Entry Description N
        writing a title and then deleting wont remove it
    
*/
