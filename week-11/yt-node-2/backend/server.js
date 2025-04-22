import express from 'express';

const app =express();

app.get('/' , (req,res) => {
  res.send('server is ready')
});

app.get('/api/jokes', (req,res) => {

  const jokes = [
    {
      id: 0,
      title: 'joke no. 0',
      content: 'joke haha 0'
    },
    {
      id: 1,
      title: 'joke no. 1',
      content: 'joke haha 1'
    },
    {
      id: 2,
      title: 'joke no. 2',
      content: 'joke haha 2'
    },
    {
      id: 3,
      title: 'joke no. 3',
      content: 'joke haha 3'
    },
    {
      id: 4,
      title: 'joke no. 4',
      content: 'joke haha 4'
    },
    {
      id: 5,
      title: 'joke no. 5',
      content: 'joke haha 5'
    }
  ]
  res.json(jokes);

})




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
});