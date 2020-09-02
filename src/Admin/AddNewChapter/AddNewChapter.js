import React, { useState, useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import CommentaryService from '../../services/commentary-service';
import './AddNewChapter.css';

const AddNewChapter = (props) => {

    const context = useContext(CommentaryContext);

    const { 
        nextChapter, 
        bookNumber, 
        setAddNewChapter,
        suffix,
        setShowEditChapt,
        currentData
    } = props;

    const [newChapterNumber, setNewChapterNumber] = useState(nextChapter || parseInt(currentData.chapter_number.split('-')[1]));
    const [newChapterTitle, setNewChapterTitle] = useState(currentData ? currentData.chapter_title : '');
    const [newChapterIntro, setNewChapterIntro] = useState(currentData ? currentData.chapter_intro : '');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (suffix) {
            const chapterToUpdate = {
                book_number: bookNumber || currentData.book_number,
                chapter_number: `${bookNumber || currentData.book_number}-${newChapterNumber}`,
                chapter_title: newChapterTitle,
                chapter_intro: newChapterIntro
            };
            CommentaryService.updateChapter(chapterToUpdate)
                .then(() => {
                    context.updateChapter(chapterToUpdate)
                    setShowEditChapt(false);
                })
                .catch(error => console.log(error));
        } else {
            const newChapter = {
                book_number: bookNumber,
                chapter_number: `${bookNumber}-${newChapterNumber}`,
                chapter_title: newChapterTitle,
                chapter_intro: newChapterIntro
            };

            CommentaryService.addNewChapter(newChapter)
                .then(chapter => {
                    context.addNewChapter(chapter);
                    setAddNewChapter(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    return (
        <form
            className='AddNewChapter__form'
            onSubmit={handleSubmit}
        >
            <div
                className='AddNewChapter__input-div'
            >
                <label htmlFor='new-chapter-number'>New chapter number: </label>
                <input 
                    type='number'
                    id='new-chapter-number'
                    value={newChapterNumber}
                    onChange={(e) => setNewChapterNumber(e.target.value)}
                />
            </div>
            <div
                className='AddNewChapter__input-div'
            >
                <label htmlFor='new-chapter-title'>Chapter title: </label>
                <input 
                    type='text'
                    id='new-chapter-title'
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                />
            </div>
            <div
                className='AddNewChapter__input-div'
            >
                <label htmlFor='new-chapter-intro'>Chapter introduction: </label>
                <textarea
                    className='AddNewChapter__textarea' 
                    id='new-chapter-intro'
                    value={newChapterIntro}
                    onChange={(e) => setNewChapterIntro(e.target.value)}
                ></textarea>
            </div>
            <button
                type='submit'
                disabled={!newChapterNumber || !newChapterTitle || !newChapterIntro}
            >
                Submit
            </button>
        </form>
    );
}

export default AddNewChapter