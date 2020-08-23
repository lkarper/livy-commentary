import React from 'react';
import CommentaryReadSectionView from '../CommentaryReadSectionView/CommentaryReadSectionView';

const CommentaryReadChapter = (props) => {
   const { chapter } = props;

   return (
       <>
            <h3>Chapter {chapter.chapter_number.split('-')[1]}: {chapter.chapter_title}</h3>
            <p>{chapter.chapter_intro}</p>
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