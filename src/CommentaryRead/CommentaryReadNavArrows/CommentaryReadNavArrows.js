import React, { useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import './CommentaryReadNavArrows.css';

const CommentaryReadNavArrows = (props) => {
    const {
        bookNumber,
        chapterNumber,
        sectionNumber,
        push, // props.history.push
    } = props;

    const context = useContext(CommentaryContext);

    const {
        bookList,
        chapterList,
        sectionList,
    } = context;

    const links = {
        prev: '',
        next: '',
        showPrev: true,
        showNext: true,
        maxBook: '',
        maxChapter: '',
        maxSection: '',
    };

    if (sectionNumber && chapterNumber && bookNumber) {
        const currentIndex = sectionList.findIndex(sec => sec === `${bookNumber}-${chapterNumber}-${sectionNumber}`);
        links.showPrev = currentIndex > 0;
        links.showNext = currentIndex < sectionList.length - 1;
        links.prev = `/commentary-read/${sectionList[currentIndex - 1]}`;
        links.next = `/commentary-read/${sectionList[currentIndex + 1]}`;
    } else if (chapterNumber && bookNumber) {
        const currentIndex = chapterList.findIndex(chap => chap === `${bookNumber}-${chapterNumber}`);
        links.showPrev = currentIndex > 0;
        links.showNext = currentIndex < chapterList.length - 1;
        links.prev = `/commentary-read/${chapterList[currentIndex - 1]}`;
        links.next = `/commentary-read/${chapterList[currentIndex + 1]}`;
    } else {
        const currentIndex = bookList.findIndex(bk => parseInt(bk) === parseInt(bookNumber));
        links.showPrev = currentIndex > 0;
        links.showNext = currentIndex < bookList.length - 1;
        links.prev = `/commentary-read/${bookList[currentIndex - 1]}`;
        links.next = `/commentary-read/${bookList[currentIndex + 1]}`;
    }

    return (
        <div className="CommentaryReadNavArrows__outer-container">
                <button
                    className={`CommentaryReadNavArrows__arrow prev ${links.showPrev ? '' : 'hidden'}`}
                    onClick={() => push(links.prev)}
                >
                    &#8592;
                </button>
                <button
                    className={`CommentaryReadNavArrows__arrow prev ${links.showNext ? '' : 'hidden'}`}
                    onClick={() => push(links.next)}
                >
                    &#8594;
                </button>
        </div>
    );
}

CommentaryReadNavArrows.defaultProps = {
    bookNumber: '',
    chapterNumber: '',
    sectionNumber: '',
    push: () => {},
};

export default CommentaryReadNavArrows;
