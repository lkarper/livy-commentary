import React, { useState, useEffect, createContext} from 'react';
import CommentaryService from '../services/commentary-service';

const CommentaryContext = createContext({
    homePageLinkNumbers: [],
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

    useEffect(() => {
        CommentaryService.getHomePageLinkNumbers()
            .then(numbers => {
                setHomePageLinkNumbers(numbers)
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
        addNewBook,
        removeBook,
        addNewChapter,
        updateChapter,
        removeChapter,
        addNewSection,
        updateSection,
        removeSection,
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}