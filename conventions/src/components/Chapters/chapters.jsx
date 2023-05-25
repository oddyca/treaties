import { memo, useState } from "react";
import { loadTreatyData } from "../Controller";
// import { useParams } from "react-router-dom";

import './chapters.css';
import arrow from '../../assets/arrow.svg';

const Chapters = memo((props) => {
  const { treatyData } = loadTreatyData(props.whichTreaty);
  const treatyKeys = Object.keys(treatyData);

  const chapterContentObject = (number) => {
    return treatyData[treatyKeys[number]]
  }

  // TODO: bring dropdown logic and render to a separate component

  const handleArticleDrop = (e) => {
    const clickedArticle = e.currentTarget.nextSibling;
    clickedArticle.classList.toggle('article-active');
    e.currentTarget.children[1].classList.toggle('rotated');
  }

  const renderArticleContent = (chapter, article) => {
    const chapterArticles = Object.values(chapterContentObject(chapter))[article];
    return chapterArticles.map((paragrapgh, id) => {
      const regTest = /^[a-z]\)/.test(paragrapgh)
      if (regTest) {
        return <p key={`art-par-${id}`}>{paragrapgh}</p>
      }
      return <p key={`art-par-${id}`}>{id+1}. {paragrapgh}</p>
    });
  }

  const renderChapterContent = (chapter) => {
    const chapterArticles = Object.keys(chapterContentObject(chapter));
    const chapterContent = Object.values(chapterContentObject(chapter));
    if (chapter === 0){
      return chapterContent.map((article, id) => <p key={`paragprah-${id}`} className="preamble" dangerouslySetInnerHTML={{__html: article}} />);
    } else {
      return chapterArticles.map((article, id) => {
        return(
          <div key={`article-${chapter}-${id}`} className="article-dropdown">
            <div className='article-row' onClick={handleArticleDrop}>
              <p>{`Статья ${article.split('').slice(1).join('')}`}</p>
              <img src={arrow} className="dropdown-arrow" alt='dropdown arrow'/>
            </div>
            <div className={`article-cotent`}>
              {
                renderArticleContent(chapter, id)
              }
            </div>
          </div>
        )
      });
    }
  }

  return (
    <div className="chapter-content">
      {
        renderChapterContent(props.chapter)
      }
    </div>
  )
});

export default Chapters;
