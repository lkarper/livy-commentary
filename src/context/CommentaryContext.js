import React, { useState, useEffect, createContext} from 'react';
import CommentaryService from '../services/commentary-service';

const CommentaryContext = createContext({
    homePageLinkNumbers: [],
    bookList: [],
    chapterList: [],
    sectionList: [],
    focusCommentary: false,
    toggleFocusCommentary: () => {},
    addNewBook: () => {},
    removeBook: () => {},
    addNewChapter: () => {},
    updateChapter: () => {},
    removeChapter: () => {},
    addNewSection: () => {},
    updateSection: () => {},
    removeSection: () => {},
});

export default CommentaryContext;

export const CommentaryProvider = (props) => {

    const [homePageLinkNumbers, setHomePageLinkNumbers] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [focusCommentary, toggleFocusCommentary] = useState(false);

    useEffect(() => {
        CommentaryService.getHomePageLinkNumbers()
            .then(numbers => {
                const bookListTemp = [];
                const chapterListTemp = [];
                const sectionListTemp = [];
                setHomePageLinkNumbers(numbers);
                numbers.forEach(book => {
                    bookListTemp.push(book.book_number);
                    book.chapters.forEach(chapter => {
                        chapterListTemp.push(chapter.chapter_number);
                        chapter.sections.forEach(section => {
                            sectionListTemp.push(section.section_number);
                        });
                    });
                });
                setBookList(bookListTemp.sort());
                setChapterList(chapterListTemp
                    .map(chap => chap.split('-').join('.'))
                    .sort((a,b) => parseFloat(a) - parseFloat(b))
                    .map(chap => chap.toString())
                    .map(chap => chap.split('.').join('-'))
                );
                setSectionList(sectionListTemp
                    .sort((a,b) => {
                        const arrayA = a.split('-');
                        const arrayB = b.split('-');
                        if (arrayA[0] === arrayB[0]) {
                            if (arrayA[1] === arrayB[1]) {
                                return parseInt(arrayA[2]) - parseInt(arrayB[2]);
                            }
                            return parseInt(arrayA[1]) - parseInt(arrayB[1]);
                        }
                        return parseInt(arrayA[0]) - parseInt(arrayB[0]);
                    })
                );
            })
            .catch(error => {
                console.log(error);
            });
    }, [props]);

    const addNewBook = (newBook) => {
        const newHomePageLinkNumbers = [...homePageLinkNumbers, newBook];
        setHomePageLinkNumbers(newHomePageLinkNumbers);
    }

    const removeBook = (bookNumber) => {
        const newHomePageLinkNumbers = homePageLinkNumbers.filter(b => b.book_number !== bookNumber);
        setHomePageLinkNumbers(newHomePageLinkNumbers);
    }

    const addNewChapter = (newChapter) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === newChapter.book_number);
        const { chapters, ...rest } = bookToEdit;
        const updatedBook = {
            ...rest,
            chapters: [
                ...chapters,
                newChapter
            ],
        };
        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== newChapter.book_number),
            updatedBook
        ]
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const addNewSection = (newSection) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === parseInt(newSection.chapter_number.split('-')[0]));
        const chapterToEdit = bookToEdit.chapters.find(c => c.chapter_number === newSection.chapter_number);
        
        const { sections, ...rest } = chapterToEdit;

        const updatedChapter = {
            ...rest,
            sections: [
                ...sections,
                newSection
            ].sort((a, b) => a.section_number - b.section_number),
        };
        
        const updatedChapters = [
            ...bookToEdit.chapters.filter(c => c.chapter_number !== newSection.chapter_number),
            updatedChapter
        ];

        const updatedBook = {
            book_number: bookToEdit.book_number,
            id: bookToEdit.id,
            chapters: updatedChapters.sort((a, b) => a.chapter_number - b.chapter_number),
        }

        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== bookToEdit.book_number),
            updatedBook
        ];
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const updateChapter = (chapterToUpdate) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === chapterToUpdate.book_number);
        const { chapters, ...rest } = bookToEdit;
        const updatedBook = {
            ...rest,
            chapters: [
                ...chapters.filter(c => c.chapter_number !== chapterToUpdate.chapter_number),
                chapterToUpdate
            ],
        };
        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== chapterToUpdate.book_number),
            updatedBook
        ]
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const updateSection = (sectionToUpdate) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === parseInt(sectionToUpdate.chapter_number.split('-')[0]));
        const chapterToEdit = bookToEdit.chapters.find(c => c.chapter_number === sectionToUpdate.chapter_number);
        
        const { sections, ...rest } = chapterToEdit;

        const updatedChapter = {
            ...rest,
            sections: [
                ...sections.filter(s => s.section_number !== sectionToUpdate.section_number),
                sectionToUpdate
            ].sort((a, b) => a.section_number - b.section_number),
        };
        
        const updatedChapters = [
            ...bookToEdit.chapters.filter(c => c.chapter_number !== sectionToUpdate.chapter_number),
            updatedChapter
        ];

        const updatedBook = {
            book_number: bookToEdit.book_number,
            id: bookToEdit.id,
            chapters: updatedChapters.sort((a, b) => a.chapter_number - b.chapter_number),
        }

        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== bookToEdit.book_number),
            updatedBook
        ];
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const removeChapter = (chapterNumber) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === parseInt(chapterNumber.split('-')[0]));
        const { chapters, ...rest } = bookToEdit;
        const updatedBook = {
            ...rest,
            chapters: [
                ...chapters.filter(c => c.chapter_number !== chapterNumber),
            ],
        };
        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== parseInt(chapterNumber.split('-')[0])),
            updatedBook
        ]
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));    
    }

    const removeSection = (sectionNumber) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === parseInt(sectionNumber.split('-')[0]));
        const chapterToEdit = bookToEdit.chapters.find(c => c.chapter_number === `${sectionNumber.split('-')[0]}-${sectionNumber.split('-')[1]}`);
        
        const { sections, ...rest } = chapterToEdit;

        const updatedChapter = {
            ...rest,
            sections: [
                ...sections.filter(s => s.section_number !== sectionNumber),
            ].sort((a, b) => a.section_number - b.section_number),
        };
        
        const updatedChapters = [
            ...bookToEdit.chapters.filter(c => c.chapter_number !== chapterToEdit.chapter_number),
            updatedChapter
        ];

        const updatedBook = {
            book_number: bookToEdit.book_number,
            id: bookToEdit.id,
            chapters: updatedChapters.sort((a, b) => a.chapter_number - b.chapter_number),
        }

        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== bookToEdit.book_number),
            updatedBook
        ];
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const value = {
        homePageLinkNumbers,
        bookList,
        chapterList,
        sectionList,
        focusCommentary,
        addNewBook,
        removeBook,
        addNewChapter,
        updateChapter,
        removeChapter,
        addNewSection,
        updateSection,
        removeSection,
        toggleFocusCommentary,
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}
