import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Button, Grid } from "@mui/material";

export default function NewsContent({ newsArray, loadMore, setLoadMore, newsResults }) {
  return (
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', sm: '15px', md: '20px' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* First this */}
      <Grid container spacing={3}>
        {newsArray.map((newsItem) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={newsItem.title}>
            <NewsCard newsItem={newsItem} />
          </Grid>
        ))}
      </Grid>
      {/* Then this */}
      {loadMore <= newsResults && (
        <>
          <hr />
          <Button variant="outlined" onClick={() => setLoadMore(loadMore + 20)}>
            Load More
          </Button>
        </>
      )}
    </Box>
  );
}
