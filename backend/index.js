const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const giftFilePath = path.join(__dirname, 'giftlist.json');

let giftlist = [];
if (fs.existsSync(giftFilePath)) {
  const data = fs.readFileSync(giftFilePath, 'utf8');
  giftlist = JSON.parse(data);
} else {
  fs.writeFileSync(giftFilePath, JSON.stringify(giftlist, null, 2));
}

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/gifts', (req, res) => {
  res.json(giftlist);
});

app.put('/gifts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newReservedValue = req.body.reserved;
  const gift = giftlist.find(g => g.id === id);
  if (gift) {
    gift.reserved = newReservedValue;
    fs.writeFileSync(giftFilePath, JSON.stringify(giftlist, null, 2));
    res.json(gift);
  } else {
    res.status(404).send('Gift not found');
  }
});


app.post('/gifts', (req, res) => {
  const newGift = req.body;
  newGift.id = giftlist.length; // assign a new id to the new gift
  newGift.websiteUrl = req.body.websiteUrl; // store the website URL
  giftlist.push(newGift);
  fs.writeFileSync(giftFilePath, JSON.stringify(giftlist, null, 2));
  res.json(newGift);
});

app.delete('/gifts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = giftlist.findIndex(g => g.id === id);
  if (index !== -1) {
    const deletedGift = giftlist.splice(index, 1);
    fs.writeFileSync(giftFilePath, JSON.stringify(giftlist, null, 2));
    res.json(deletedGift);
  } else {
    res.status(404).send('Gift not found');
  }
});


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${port}`);
});