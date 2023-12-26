import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer/Footer';
import NewsContent from './components/NewsContent/NewsContent';

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");
  const [searchType, setSearchType] = useState("category");
  const [text, setText] = useState('');
  const [sortBy, setSortBy] = useState("relevance"); // Default sort by relevance

  const searchCategory = async () => {
    try {
      let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${loadMore}&category=${category}`;
     
      const news = await axios.get(apiUrl);

      console.log("searchCategory fired");
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const searchArticles = async () => {
    try {
      let apiUrl = `https://newsapi.org/v2/everything?q=${text}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${loadMore}&sortBy=${sortBy}`;

      const news = await axios.get(apiUrl);

      console.log("searchArticle fired");
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchType === "category") {
          await searchCategory();
        } else {
          await searchArticles();
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [category, loadMore, text, searchType, sortBy]);

  return (
    <div className="App">
      <Navbar
        setCategory={setCategory}
        setText={setText}
        setSearchType={setSearchType}
        setSortBy={setSortBy}
      />
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
