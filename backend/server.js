const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

const multer = require('multer');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({ storage: storage });



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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/gifts', upload.single('image'), (req, res) => {
  const newGift = req.body;
  newGift.id = giftlist.length; // assign a new id to the new gift
  newGift.imageUrl = path.basename(req.file.filename); // store the filename of the uploaded image
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