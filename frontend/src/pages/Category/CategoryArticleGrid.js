import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

const CategoryArticleGrid = () => {
  const [articles, setArticles] = useState([])

  let { id } = useParams()

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/category/${id}`,
        )
      ).json()
      setArticles(data)
    };
    dataFetch()
  }, [id])

  const capitalizeFirstLetter = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  const getArticles = () => {
    let list = []
    let result = []

    articles.map(articlePost => {
      return list.push(
        <div className="row border rounded overflow-hidden flex-md-row mb-7 shadow-sm h-md-250 position-relative m-1">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary fs-6">{capitalizeFirstLetter(articlePost.category)}</strong>
            <h3 className="mb-0 fs-6">{articlePost.title}</h3>
            <div className="mb-1 text-muted">{articlePost.month} {articlePost.day}</div>
            <p className="card-text mb-auto">{articlePost.excerpt}</p>
            <Link to={`/article/${articlePost.slug}`} className="stretched-link">Continue reading</Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img width='250' height='250' src={articlePost.thumbnail} alt='thumbnail' />
          </div>
        </div>
      );
    })

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className='row mb-2'>
          <div className="col-md-6">
            {list[i]}
          </div>
          <div className="col-md-6">
            {list[i + 1] ? list[i + 1] : null}
          </div>
        </div>
      )
    }

    return result
  }


  return (
    <div className="container mt-3">
      {getArticles()}
    </div>
  )
}

export default CategoryArticleGrid