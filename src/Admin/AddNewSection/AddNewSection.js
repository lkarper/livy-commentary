import React, { useState, useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import CommentaryService from '../../services/commentary-service';

const AddNewSection = (props) => {

    const context = useContext(CommentaryContext);

    const {
        nextSection,
        chapterNumber,
        suffix,
        setShowEditSection,
        setAddNewSection,
        forceUpdate,
        currentData,
    } = props;
 
    const [newSectionNumber, setNewSectionNumber] = useState(nextSection || parseInt(currentData.section_number.split('-')[2]));
    const [latin, setLatin] = useState(currentData ? currentData.latin : '');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (suffix) {
            const sectionToUpdate = {
                section_number: currentData.section_number,
                chapter_number: chapterNumber || currentData.chapter_number,
                latin
            };

            CommentaryService.updateSection(sectionToUpdate)
                .then(() => {
                    context.updateSection(sectionToUpdate);
                    forceUpdate(new Date().toJSON())
                    setShowEditSection(false);
                })
                .catch(error => console.log(error));
        } else {
            const newSection = {
                section_number: `${chapterNumber}-${newSectionNumber}`,
                chapter_number: chapterNumber,
                latin
            };

            CommentaryService.addNewSection(newSection)
                .then(section => {
                    context.addNewSection(section);
                    forceUpdate(new Date().toJSON())
                    setAddNewSection(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-section-number'>New section number: </label>
            <input 
                type='number'
                id='new-section-number'
                value={newSectionNumber}
                onChange={(e) => setNewSectionNumber(e.target.value)}
            />
            <label htmlFor='new-section-latin'>Latin: </label>
            <textarea
                id='new-section-latin'
                value={latin}
                onChange={(e) => setLatin(e.target.value)}
            ></textarea>
            <button
                type='submit'
                disabled={!newSectionNumber || !latin}
            >
                Submit
            </button>
        </form>
    );
}

export default AddNewSection;