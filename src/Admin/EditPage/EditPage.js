import React, { useContext, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CommentaryContext from '../../context/CommentaryContext';
import AddNewBook from '../AddNewBook/AddNewBook';
import AddNewChapter from '../AddNewChapter/AddNewChapter';
import CommentaryService from '../../services/commentary-service';
import AddNewSection from '../AddNewSection/AddNewSection';
import CommentaryReadComment from '../../CommentaryRead/CommentaryReadComment/CommentaryReadComment';
import AddNewComment from '../AddNewComment/AddNewComment';
import OrderCommentsContainer from '../OrderCommentsContainer/OrderCommentsContainer';
import './EditPage.css';

const EditPage = (props) => {
    
    const context = useContext(CommentaryContext);

    const [bookNumber, setBookNumber] = useState();
    const [chapters, setChapters] = useState([]);
    const [chapterNumber, setChapterNumber] = useState();
    const [sections, setSections] = useState();
    const [sectionNumber, setSectionNumber] = useState();
    const [nextBook, setNextBookNumber] = useState();
    const [addNewBook, setAddNewBook] = useState(false);
    const [addNewChapter, setAddNewChapter] = useState(false);
    const [addNewSection, setAddNewSection] = useState(false);
    const [addNewComment, setAddNewComment] = useState(false);
    const [showEditChapt, setShowEditChapt] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const [showOrderComments, setShowOrderComments] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [forceUpdate, setForceUpdate] = useState();

    const commNumbers = [...context.homePageLinkNumbers];

    useEffect(() => {
        const lastBook = context.homePageLinkNumbers.length 
            ? context.homePageLinkNumbers.map(book => parseInt(book.book_number)).sort((a, b) => a-b).pop()
            : 0;
        setNextBookNumber(lastBook + 1);
    }, [context.homePageLinkNumbers, setNextBookNumber]);

    useEffect(() => {
        if (bookNumber) {
            const chapters = context.homePageLinkNumbers
                .find(book => book.book_number === bookNumber)
                .chapters;
            setChapters(chapters);
        }
    }, [bookNumber, setChapters, context.homePageLinkNumbers]);

    useEffect(() => {
        if (chapterNumber) {
            CommentaryService.fetchSectionsByChapterNumber(chapterNumber)
                .then(chapter => {
                    setSections(chapter.sections);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setSections([]);
        }
    }, [chapterNumber, forceUpdate]);

    const addComment = (newComment) => {
        const sectionToEdit = sections.find(s => s.section_number === newComment.section);
        const { comments, ...rest } = sectionToEdit;

        const newSection = {
            comments: [
                ...comments,
                newComment,
            ],
            ...rest
        }

        const newSections = [
            ...sections.filter(s => s.section_number !== newComment.section),
            newSection
        ];

        setSections(newSections);
    }

    const updateComment = (updatedComment) => {
        const sectionToEdit = sections.find(s => s.section_number === updatedComment.section);
        const { comments, ...rest } = sectionToEdit;

        const newSection = {
            comments: [
                ...comments.filter(c => c.id !== updatedComment.id),
                updatedComment,
            ],
            ...rest
        }

        const newSections = [
            ...sections.filter(s => s.section_number !== updatedComment.section),
            newSection
        ];

        setSections(newSections);
    }

    const removeComment = (id) => {
        const sectionToEdit = sections.find(s => s.section_number === sectionNumber);
        const { comments, ...rest } = sectionToEdit;

        const newSection = {
            comments: [
                ...comments.filter(c => c.id !== id),
            ],
            ...rest
        }

        const newSections = [
            ...sections.filter(s => s.section_number !== sectionToEdit.section_number),
            newSection
        ];

        setSections(newSections);
    }

    const confirmDeleteBook = () => {
        if (window.confirm(`Are you sure that you'd like to delete Book ${bookNumber}? (If you delete a book, all of its contents will be deleted!)`)) {
            CommentaryService.deleteBook(bookNumber)
                .then(() => {
                    setSectionNumber(null);
                    setChapterNumber(null);
                    setBookNumber(null);
                    context.removeBook(bookNumber);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    
    const confirmDeleteChapter = () => {
        const book = chapterNumber.split('-')[0];
        const chapter = chapterNumber.split('-')[1];
        if (window.confirm(`Are you sure that you'd like to delete Book ${book}, Chapter ${chapter}? (If you delete a chapter, all of its contents will be deleted!)`)) {
            CommentaryService.deleteChapter(chapterNumber)
                .then(() => {
                    setChapterNumber(null);
                    context.removeChapter(`${book}-${chapter}`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const confirmDeleteSection = () => {
        const book = sectionNumber.split('-')[0];
        const chapter = sectionNumber.split('-')[1];
        const section = sectionNumber.split('-')[2];
        if (window.confirm(`Are you sure that you'd like to delete Book ${book}, Chapter ${chapter}, Section ${section}? (If you delete a section, all of its contents will be deleted!)`)) {
            CommentaryService.deleteSection(sectionNumber)
                .then(() => {
                    setSectionNumber(null);
                    context.removeSection(`${book}-${chapter}-${section}`);
                    setForceUpdate(new Date().toJSON());
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const confirmDeleteComment = (id) => {
        if(window.confirm(`Are you sure that you'd like to delete the comment?`)) {
            CommentaryService.deleteComment(id)
                .then(() => {
                    removeComment(id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <section className='EditPage__outer-section'>
            <h2>Edit</h2>
            <form>
                <fieldset>
                    <legend>Select a book to edit</legend>
                    {commNumbers.map(book => {
                        return (
                            <div key={book.book_number}>
                                <input 
                                    type='radio'
                                    id={`book-${book.book_number}`}
                                    name='book'
                                    value={book.book_number}
                                    onChange={(e) => {
                                        if (sectionNumber) {
                                            setSectionNumber(null);
                                        }
                                        if (chapterNumber) {
                                            setChapterNumber(null);
                                        }
                                        setBookNumber(parseInt(e.target.value));
                                    }}
                                    checked={bookNumber === book.book_number}
                                />
                                <label htmlFor={`book-${book.book_number}`}>Book {book.book_number}</label>
                            </div>
                        );
                    })}
                    <button
                        type='button'
                        onClick={() => setAddNewBook(!addNewBook)}
                    >
                        {addNewBook ? 'Nevermind' : 'Add a new book'}
                    </button>
                    {bookNumber && 
                        <button
                            type='button'
                            onClick={confirmDeleteBook}
                        >
                            Delete selected book
                        </button>
                    }
                </fieldset>
            </form>
            {addNewBook && <AddNewBook setAddNewBook={setAddNewBook} nextBook={nextBook} />}
            <form>
                {bookNumber && 
                    <fieldset>
                        <legend>Select a chapter to edit</legend>
                        {
                            chapters
                                .sort((a, b) => parseInt(a.chapter_number.split('-')[1]) - parseInt(b.chapter_number.split('-')[1]))
                                .map(chapter => {
                                    return (
                                        <div key={chapter.chapter_number}>
                                            <input
                                                type='radio'
                                                name='chapter'
                                                id={`chapter-${chapter.chapter_number}`}
                                                value={chapter.chapter_number}
                                                onChange={(e) => {
                                                    if (sectionNumber) {
                                                        setSectionNumber(null);
                                                    }
                                                    setChapterNumber(e.target.value)
                                                }}
                                                checked={chapterNumber === chapter.chapter_number}
                                            />
                                            <label
                                                htmlFor={`chapter-${chapter.chapter_number}`}
                                            >
                                                Chapter {chapter.chapter_number.split('-')[1]}
                                            </label>
                                        </div>
                                    );
                                })
                        }
                        <button 
                            type='button'
                            onClick={() => setAddNewChapter(!addNewChapter)}
                        >
                            {addNewChapter ? 'Nevermind' : 'Add new chapter'}
                        </button>
                        {chapterNumber && 
                            <button
                                type='button'
                                onClick={confirmDeleteChapter}
                            >
                                Delete selected chapter
                            </button>
                        }
                    </fieldset>
                }
            </form>
            {addNewChapter && <AddNewChapter setAddNewChapter={setAddNewChapter} bookNumber={bookNumber} nextChapter={chapters.length + 1}/>}
            {chapterNumber && !sections
                ? <p>Loading sections...</p>
                : <></>
            }
            {chapterNumber && 
                <fieldset>
                    <p>Chapter {chapterNumber}</p>
                    <p>Title: {chapters.find(c => c.chapter_number === chapterNumber).chapter_title}</p>
                    <p>Intro: {chapters.find(c => c.chapter_number === chapterNumber).chapter_intro}</p>
                    <button
                        type='button'
                        onClick={() => setShowEditChapt(!showEditChapt)}
                    >
                        {showEditChapt ? 'Nevermind' : 'Edit chapter number, title, and/or intro'}
                    </button>
                </fieldset>
            }
            {showEditChapt && 
                <AddNewChapter 
                    suffix='-edit'
                    setShowEditChapt={setShowEditChapt}
                    currentData={chapters.find(c => c.chapter_number === chapterNumber)}
                /> 
            }
            <form>
                {(chapterNumber && sections)
                    ?
                        <fieldset>
                            <legend>Select a section to edit</legend>
                            {
                                sections
                                    .sort((a, b) => parseInt(a.section_number.split('-')[2]) - parseInt(b.section_number.split('-')[2]))
                                    .map(section => {
                                        return (
                                            <div key={section.section_number}>
                                                <input 
                                                    type='radio'
                                                    name='section'
                                                    id={`section-${section.section_number}`}
                                                    value={section.section_number}
                                                    onChange={(e) => setSectionNumber(e.target.value)}
                                                    checked={sectionNumber === section.section_number}
                                                />
                                                <label
                                                    htmlFor={`section-${section.section_number}`}
                                                >
                                                    Section {section.section_number.split('-')[2]}
                                                </label>
                                            </div>
                                        );
                                    })
                            }
                            <button
                                type='button'
                                onClick={() => setAddNewSection(!addNewSection)}
                            >
                                {addNewSection ? 'Nevermind' : 'Add new section'}
                            </button>
                            {sectionNumber &&
                                <button
                                    type='button'
                                    onClick={confirmDeleteSection}
                                >
                                    Delete selected section
                                </button>
                            }
                        </fieldset>
                    : 
                        <></>
                }
            </form>
            {sectionNumber &&
                <div className='CommentaryReadSectionView__container'>
                    <section className='CommentaryReadSectionView__section'>
                        <h3>{sections.find(s => s.section_number === sectionNumber).section_number}</h3>
                        <p>{sections.find(s => s.section_number === sectionNumber).latin}</p>
                        <button
                            type='button'
                            onClick={(e) => setShowEditSection(!showEditSection)}
                        >
                            {showEditSection ? 'Nevermind' : 'Edit'}
                        </button>
                        {showEditSection && 
                            <AddNewSection 
                                suffix='-edit'
                                forceUpdate={setForceUpdate}
                                setShowEditSection={setShowEditSection}
                                currentData={sections.find(s => s.section_number === sectionNumber)}
                            />
                        }
                    </section>
                    <section className='CommentaryReadSectionView__section'>
                        <h3>Commentary and Notes</h3>
                        <button
                            type='button'
                            onClick={() => setAddNewComment(!addNewComment)}
                        >
                            Add new comment
                        </button>
                        {(sections.find(s => s.section_number === sectionNumber).comments && sections.find(s => s.section_number === sectionNumber).comments.length !== 0) &&
                            <button
                                type='button'
                                onClick={() => setShowOrderComments(!showOrderComments)}
                            >
                                Reorder comments
                            </button>
                        }
                        {addNewComment &&
                            <AddNewComment 
                                section={sectionNumber}
                                comment_order={sections.find(s => s.section_number === sectionNumber).comments.length + 1}
                                addNewComment={addComment}
                                setAddNewComment={setAddNewComment}
                            />
                        }
                        {sections.find(s => s.section_number === sectionNumber).comments && sections.find(s => s.section_number === sectionNumber).comments
                            .sort((a, b) => a.comment_order - b.comment_order)
                            .map(comment => 
                                <div key={comment.id}>
                                    <CommentaryReadComment 
                                        comment={comment} 
                                    />
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setShowEditComment(!showEditComment)
                                            setCommentToEdit(commentToEdit ? null : comment.id)
                                        }}
                                        disabled={(showEditComment && comment.id !== commentToEdit)}
                                    >
                                        {(showEditComment && comment.id === commentToEdit) ? 'Nevermind' : 'Edit'}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => confirmDeleteComment(comment.id)}
                                    >
                                        Delete
                                    </button>
                                    {(showEditComment && comment.id === commentToEdit) &&
                                        <AddNewComment 
                                            section={sectionNumber}
                                            suffix='-edit'
                                            updateComment={updateComment}
                                            setShowEditComment={setShowEditComment}
                                            setCommentToEdit={setCommentToEdit}
                                            currentData={comment}
                                        />
                                    }
                                </div>
                            )
                        }
                        {!sections.find(s => s.section_number === sectionNumber).comments.length && <p>No notes yet for this section.</p>}
                    </section>
                </div>
                    // .find(s => s.section_number === sectionNumber)
                    // .comments
                    // .map(comment => {
                    //     return (
                    //         <div key={comment.id}>
                    //             <CommentaryReadComment
                    //                 comment={comment}
                    //             />
                    //             <button
                    //                 type='button'
                    //             >Edit</button>
                    //         </div>
                    //     )
                    // })
            }
            {addNewSection && 
                <AddNewSection 
                    nextSection={sections.length + 1}
                    chapterNumber={chapterNumber}
                    forceUpdate={setForceUpdate}
                    setAddNewSection={setAddNewSection}
                />
            }
            {showOrderComments && 
                <DndProvider backend={HTML5Backend}>
                    <OrderCommentsContainer 
                        comments={sections.find(s => s.section_number === sectionNumber).comments}
                        setShowOrderComments={setShowOrderComments}
                        setSectionNumber={setSectionNumber}
                        forceUpdate={setForceUpdate}
                    />
                </DndProvider>
            }
        </section>
    );
}

export default EditPage;
