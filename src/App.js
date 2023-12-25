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

  console.log(process.env);

  const newsApi = async () => {
    try {
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const news = await axios.get(
        // `${proxyUrl}https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${loadMore}&category=${category}`
      );
      // console.log(news);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, loadMore, category]);

  return (
    <div className="App">
      <Navbar setCategory={setCategory}/>
      {/* <NewsList category={category}/> */}
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer/>
    </div>
  );
}

export default App;