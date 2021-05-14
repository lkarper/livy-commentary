import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import CommentaryReadSectionView from '../CommentaryReadSectionView/CommentaryReadSectionView';

const CommentaryReadChapter = (props) => {
   const { chapter } = props;

   return (
       <>
            <h3>Chapter {chapter.chapter_number.split('-')[1]}: {chapter.chapter_title}</h3>
            <p>{ReactHtmlParser(chapter.chapter_intro)}</p>
            {chapter.sections.map(section => 
                    <CommentaryReadSectionView 
                        key={section.section_number} 
                        section={section}
                    />)
            }
       </>
   );
}

CommentaryReadChapter.defaultProps = {
    chapter: {
        chapter_number: '',
        chapter_intro: '',
        chapter_title: '',
        sections: [],
    },
};

CommentaryReadChapter.propTypes = {
    chapter: PropTypes.shape({
        chapter_number: PropTypes.string,
        chapter_intro: PropTypes.string,
        chapter_title: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default CommentaryReadChapter;
