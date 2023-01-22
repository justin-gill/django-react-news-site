import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'

const ArticleDetail = () => {

    const [article, setArticle] = useState([])

    let { id } = useParams();

    useEffect(() => {
      const dataFetch = async () => {
        const data = await (
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/news/article/${id}`,
          )
        ).json()
        setArticle(data[0])
      };
      dataFetch()
    }, [])

    const createArticle = () =>{
        return {__html: article.content}
    }

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }

    return (
        <div className="container mt-3">
            <h1 className="display-2">{article.title}</h1>
            <h2 className="textmuted mt-3">Category: {capitalizeFirstLetter(article.category)}</h2>
            <h4>{article.month} {article.day}</h4>
            <div className="mt-5 mb-5" dangerouslySetInnerHTML={createArticle()}/>
            <hr/>
            <p className="lead mb-5"> <Link to="/" className="font-weight-bold">Back to Articles</Link></p>

        </div>
    )
};

export default ArticleDetail
