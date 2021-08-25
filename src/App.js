import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from 'react-loader-spinner';
import SearchForm from './SearchForm';

const App = () => {
  //Creating states for API data, search parameter and loading state
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState('JavaScript')
  const [isLoading, setIsLoading] = useState(true)

  //Fetching API data with axios GET
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${term}&lang=en&max=9&token=${process.env.REACT_APP_API_KEY}`
        )
        //Placing API data to state
        setArticles(response.data.articles);

        //Catching error if something is wrong
      } catch (error) {
        console.error(error)
      }
    };

    //Loading API data
    loadArticles();

    //When API data is loaded setting loading state to false
    setIsLoading(false);
  }, [term]);

  //On article click
  const onArticleClick = (article) => {

    //Getting needed article data
    const articleData = {
      title: article.title,
      description: article.description,
      url: article.url,
      publishDate: article.publishedAt
    }

    //Sending POST request with data to back-end
    axios.post('http://localhost:8000/articles/articleDetails', articleData)
      .then(response => console.log(response.data))

    //Opening article in new window
    const newWindow = window.open(article.url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  return (
    <>
      <div className='logo'>
        <h1 className='logo-text'><a href="/">News App</a></h1>
      </div>
      <div className='searchbox'>
        <h2>Viewing articles about {term.replace('&max=9', '')} </h2>
        <SearchForm searchText={(text) => setTerm(text)} />
      </div>

      {
        //If articles is loading (isLoading=true) starting loader
        isLoading ? (
          <div className='loader'>
            <Loader
              type='TailSpin'
              color='#000'
              height={200}
              width={100}
              timeout={10000} //10 secs
            />
          </div>

          //If articles is loaded destructuring needed article data and placing it to cards
        ) : (
          <section className='row'>
            {articles.map((article, index) => {
              const { publishedAt, title, description, image} = article

              return (
                <div className='col-sm-12 col-md-6 col-lg-4' key={'article-'+ index}>
                  <article>
                    <Card onClick={() => onArticleClick(article)}>
                      <Card.Img variant='top' src={image} />
                      <Card.Body>
                        <Card.Title className='text-truncate'>
                          {title}
                        </Card.Title>
                        <Card.Text className='text-truncate'>
                          {description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className='text-muted'>{publishedAt}</small>
                      </Card.Footer>
                    </Card>
                  </article>
                </div>
              )
            })}
          </section>
        )
      }

    </>
  );
}

export default App;
