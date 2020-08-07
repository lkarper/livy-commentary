import React from 'react';
import CommentaryReadSectionView from '../CommentaryReadSectionView/CommentaryReadSectionView';

const CommentaryReadChapter = (props) => {
   const { chapter } = props;

   return (
       <>
            <h3>Chapter {chapter.chapter_number}: {chapter.chapter_title}</h3>
            {chapter.intro_paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            {chapter.sections.map(section => 
                    <CommentaryReadSectionView 
                        key={section.section_number} 
                        section={section} 
                    />)
            }
       </>
   );
}

export default CommentaryReadChapter;