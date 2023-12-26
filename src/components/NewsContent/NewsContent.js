import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Button, Grid } from "@mui/material";

export default function NewsContent({ newsArray, loadMore, setLoadMore, newsResults }) {
  return (
    <>
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', sm: '15px', md: '20px' ,lg: '25px'}, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* First this */}
      <Grid container spacing={3}>
        {newsArray.map((newsItem) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={newsItem.title}>
            <NewsCard newsItem={newsItem} />
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box sx={{textAlign:'center',marginBottom:'10px'}}>
      {/* Then this */}
      {loadMore <= newsResults && (
          <Button variant="outlined" onClick={() => setLoadMore(loadMore + 18)} sx={{ '&:hover': { color: '#105dab' } }}>
            Load More
          </Button>
      )}
    </Box>
    </>
  );
}
