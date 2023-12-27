import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer/Footer';
import NewsContent from './components/NewsContent/NewsContent';
import { Typography } from '@mui/material';

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(18);
  const [category, setCategory] = useState("general");//Defult Category->general
  const [searchType, setSearchType] = useState("category");//Default serchType->category 
  const [text, setText] = useState('');
  const [sortBy, setSortBy] = useState("relevance"); // Default sort by relevance
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

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

      if (fromDate) {
        const formattedFromDate = new Date(fromDate).toISOString().split('T')[0];
        apiUrl += `&from=${formattedFromDate}`;
      }

      if (toDate) {
        const formattedToDate = new Date(toDate).toISOString().split('T')[0];
        apiUrl += `&to=${formattedToDate}`;
      }

      const news = await axios.get(apiUrl);

      console.log("searchArticle fired");
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    console.log('Effect triggered');
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
  }, [category, loadMore, text, searchType, sortBy, fromDate, toDate]);

  return (
    <div className="App">
      <Navbar
        setCategory={setCategory}
        setText={setText}
        setSearchType={setSearchType}
        setSortBy={setSortBy}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
      {newsResults != 0 ? (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      ) : <Typography>
        No Results Found
      </Typography>}
      <Footer />
    </div>
  );
}

export default App;
