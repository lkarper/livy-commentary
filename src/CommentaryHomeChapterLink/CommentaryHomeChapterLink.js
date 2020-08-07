import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeSectionLink from '../CommentaryHomeSectionLink/CommentaryHomeSectionLink';

const CommentaryHomeChapterLink = (props) => {
    const { chapter } = props;

    return (
        <div>
            <Link>Chapter {chapter.chapter_number}: {chapter.chapter_title}</Link>
            {chapter.sections.map(section => <CommentaryHomeSectionLink key={section.section_number} section={section} />)}
        </div>
    );
}

export default CommentaryHomeChapterLink;