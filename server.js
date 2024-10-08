const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use(express.json());

app.get('/api/quotes/random', (req,res) => {
    const randomQuote = getRandomElement(quotes);
    res.json({ quote : randomQuote });
});

app.get('/api/quotes',(req,res) => {
    const { person } = req.query;

    const filteredQuotes = person ? quotes.filter(quote => quote.person === person)
         : quotes;
         res.send({quotes: filteredQuotes});
});

app.post("/api/quotes", (req, res) => {
    const { quote, person } = req.query;
    const newQuote = { quote, person };
  
    !quote || !person
      ? res.status(400).send()
      : (quotes.push(newQuote), res.status(201).send(newQuote));
  });

  app.listen (PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})