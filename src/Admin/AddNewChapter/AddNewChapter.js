import React, { useState, useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import CommentaryService from '../../services/commentary-service';

const AddNewChapter = (props) => {

    const context = useContext(CommentaryContext);

    const { nextChapter, bookNumber, setAddNewChapter } = props;

    const [newChapterNumber, setNewChapterNumber] = useState(nextChapter);
    const [newChapterTitle, setNewChapterTitle] = useState('');
    const [newChapterIntro, setNewChapterIntro] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

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

    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label htmlFor='new-chapter-number'>New chapter number: </label>
            <input 
                type='number'
                id='new-chapter-number'
                value={newChapterNumber}
                onChange={(e) => setNewChapterNumber(e.target.value)}
            />
            <label htmlFor='new-chapter-title'>Chapter title: </label>
            <input 
                type='text'
                id='new-chapter-title'
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
            />
            <label htmlFor='new-chapter-intro'>Chapter introduction: </label>
            <input 
                type='textarea'
                id='new-chapter-intro'
                value={newChapterIntro}
                onChange={(e) => setNewChapterIntro(e.target.value)}
            />
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