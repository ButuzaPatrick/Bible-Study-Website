const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Serve static files (e.g., HTML, CSS, JavaScript) from the 'public' folder
app.use(express.static(path.join('C:/Users/butuz/Documents/Official Work Resources/Bible-Study-App', 'public')));

// Route to get Bible chapter text
app.get('/bible/:book/:chapter', (req, res) => {
  const { book, chapter } = req.params;
  
  const bookFolder = path.join('C:/Users/butuz/Documents/Official Work Resources/Bible-Study-App/bible', book); // Path to the book folder
  const filePath = path.join(bookFolder, `${book} ${chapter}.txt`); // Path to the specific chapter file

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.log("error reading file")
        return res.status(500).send('Error reading file');
      }
      // Send the content of the file as a response
      console.log("sending data")

      console.log(data);

      let lines = data.split('\n');
      
      // Add '||' at the end of each line
      let modifiedContent = lines.map(line => line + ' ||').join('\n');

      console.log(modifiedContent);

      res.send(modifiedContent);
    });
  } else {
    // If file doesn't exist, return a 404
    console.log(book, chapter);
    return res.status(404).send('Chapter not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
