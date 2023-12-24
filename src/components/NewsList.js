import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewsItem from './NewsItem'
const NewsList = () => {
    const [articles, setArticles] = useState([])
    const apiKey=process.env.REACT_APP_NEWS_API_KEY;
    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=football&apiKey=${apiKey}`)
            setArticles(response.data.articles)
            console.log(response)
        }

        getArticles()
    }, [])
    return (
        <div>
            {articles.map(article => {
                return(
                    <NewsItem 
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage} 
                    />
                )
            })}
        </div>
    )
}

export default NewsList
