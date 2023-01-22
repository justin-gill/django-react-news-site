import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image'

const FeaturedArticle = () => {
  const [featuredArticleObject, setFeaturedArticle] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/featured`
        )
      ).json()
      setFeaturedArticle(data[0])
    };
    dataFetch()
  }, [])

  
  return (
    <div className="mt-4 rounded row" style={{ "minHeight": '45vh'}}>
      <div className="col">
        <h6>{featuredArticleObject.category}</h6>
        <h3>{featuredArticleObject.title}</h3>
        <h6>{featuredArticleObject.month} {featuredArticleObject.day}</h6>
      </div>
      <div className="col">
        <Image fluid style={{"maxHeight": '100%'}} src={featuredArticleObject.thumbnail}>

        </Image>
      </div>

    </div>
  )
}

export default FeaturedArticle
