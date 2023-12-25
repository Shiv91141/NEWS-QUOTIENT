import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css";
import { Container } from "@mui/material";

const NewsContent = ({ newsArray, loadMore, setLoadMore, newsResults }) => {
  return (
    <Container maxWidth="md">
      <div className="content">
        {/* First this */}
        {newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.title} />
        ))}

        {/* Then this */}
        {loadMore <= newsResults && (
          <>
            <hr />
            <button
              className="loadMore"
              onClick={() => setLoadMore(loadMore + 20)}
            >
              Load More
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default NewsContent;
