import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCard({ newsItem }) {
  const fulldate = new Date(newsItem.publishedAt);
  var date = fulldate.toString().split(" ");
  const hour = parseInt(date[4].substring(0, 2));
  const time = hour > 12 ? true : false;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)'}}>
      <CardMedia
        component="img"
        height="300"
        image={
          newsItem.urlToImage
            ? newsItem.urlToImage
            : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
        }
        alt={newsItem.title}
      />
      <CardContent sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ '&:hover': { color: '#105dab' } }}>
          <a href={newsItem.url} target="__blank">
            {newsItem.title}
          </a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newsItem.description}
        </Typography>
      </CardContent>
      <Typography variant="h7" color="text.secondary" sx={{ marginLeft: 2, marginBottom: 1 }}>
        {newsItem.author ? `By: ${newsItem.author}` : "Author: Unknown"} /{" "}
        {time
          ? `${hour - 12}:${date[4].substring(3, 5)} pm`
          : `${hour}:${date[4].substring(3, 5)} am`}{" "}
        on {date[2]} {date[1]} {date[3]}, {date[0]}
      </Typography>

      <CardActions>
        <Button size="small" sx={{ '&:hover': { color: '#105dab' } }}>
          <a href={newsItem.url} target="__blank">
            Read More at {newsItem.source.name}
          </a>
        </Button>
      </CardActions>
    </Card>
  )
}
