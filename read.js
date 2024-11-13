let bibleText = ''; 

let verses = bibleText.split('||');

let formattedText = '';
verses.forEach((verse, index) => {
  formattedText += `
                      <span class="verse-wrapper">
                      <span class="verse-text">${verse.trim()}</span>
                      </span>
                      `;
});

function searchBible() {
  const search = document.getElementById('search').value.trim();
  const [book, chapter] = search.split(' ');

  if (book && chapter) {
    // Fetch the Bible text from the server
    fetch(`http://localhost:3000/bible/${encodeURIComponent(book)}/${encodeURIComponent(chapter)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Chapter not found');
        }
        return response.text();
      })
      .then(data => {
        // Display the Bible text on the page
        const cleanedData = `${data.replace(/[^\x20-\x7E]/g, '')}`;
        console.log(cleanedData);
        bibleText = cleanedData;
        verses = bibleText.split('||');

        console.log(verses);

        formattedText = '';
        verses.forEach((verse, index) => {
          formattedText += `
                              <span class="verse-wrapper">
                              <span class="verse-text">${verse.trim()}</span>
                              </span>
                              `;
        });

        console.log(formattedText);
        document.getElementById('chapter').innerHTML = formattedText;
        // document.getElementById('chapter').textContent = bibleText;
        // document.getElementById('chapter').textContent = `bibleText = \`\n${cleanedData.replace(/\n/g, ';\n')}\n\`;`;
      })
      .catch(error => {
        console.log(error + " Error reading response");
      });
  } else {
    bibleText = `Adam, Seth, Enosh;
          Kenan, Mahalalel, Jared;
          Enoch, Methuselah, Lamech;
          Noah, Shem, Ham, and Japheth.
          The sons of Japheth: Gomer, Magog, Madai, Javan, Tubal, Meshech, and Tiras.
          The sons of Gomer: Ashkenaz, Riphath, and Togarmah.
          The sons of Javan: Elishah, Tarshish, Kittim, and Rodanim.
          The sons of Ham: Cush, Egypt, Put, and Canaan.
          The sons of Cush: Seba, Havilah, Sabta, Raamah, and Sabteca. The sons of Raamah: Sheba and Dedan.
          Cush fathered Nimrod. He was the first on earth to be a mighty man.`;
  }
}

searchBible();

// Output the formatted text into the div with id 'bibleVerses'


let mostRecentlyClickedVerse = '';

setInterval(function() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {

          const verses = document.querySelectorAll(".verse-wrapper");

          console.log(verses);

          const tooltip = document.createElement("div");
          tooltip.classList.add("tooltip");
          document.body.appendChild(tooltip);

          verses.forEach(verse => {
                    verse.addEventListener("mouseenter", function() {
                              verse.style.textDecoration = "underline"; // Add underline on hover
                    });

                    verse.addEventListener("mouseleave", function() {
                              verse.style.textDecoration = "none"; // Remove underline when hover ends
                    });
          });

          verses.forEach((verse, index) => {
                    verse.addEventListener("mouseover", function(event) {
                              // const verseText = verse.innerText;  // Get the text content of the verse
                              tooltip.innerText = `Verse: ${index+1}`;  // Set the tooltip text

                              tooltip.style.left = `${event.pageX + 10}px`;
                              tooltip.style.top = `${event.pageY + -100}px`;
                              tooltip.style.display = "block";  // Show the tooltip
                          });
                  
                          verse.addEventListener("mouseout", function() {
                              tooltip.style.display = "none";  // Hide the tooltip when mouse leaves the verse
                    });

                    verse.addEventListener("click", function() {
                              mostRecentlyClickedVerse = verse.innerText;
                              
                              toggleVerseHighlight(verse);
                    });
          });

  }
}, 1000);

// document.addEventListener("DOMContentLoaded", function() {

//           observer.observe(document.body, { childList: true, subtree: true });

//           const verses = document.querySelectorAll(".verse-wrapper");

//           console.log(verses);

//           const tooltip = document.createElement("div");
//           tooltip.classList.add("tooltip");
//           document.body.appendChild(tooltip);

//           verses.forEach(verse => {
//                     verse.addEventListener("mouseenter", function() {
//                               verse.style.textDecoration = "underline"; // Add underline on hover
//                     });

//                     verse.addEventListener("mouseleave", function() {
//                               verse.style.textDecoration = "none"; // Remove underline when hover ends
//                     });
//           });

//           verses.forEach((verse, index) => {
//                     verse.addEventListener("mouseover", function(event) {
//                               // const verseText = verse.innerText;  // Get the text content of the verse
//                               tooltip.innerText = `Verse: ${index+1}`;  // Set the tooltip text

//                               tooltip.style.left = `${event.pageX + 10}px`;
//                               tooltip.style.top = `${event.pageY + -100}px`;
//                               tooltip.style.display = "block";  // Show the tooltip
//                           });
                  
//                           verse.addEventListener("mouseout", function() {
//                               tooltip.style.display = "none";  // Hide the tooltip when mouse leaves the verse
//                     });

//                     verse.addEventListener("click", function() {
//                               mostRecentlyClickedVerse = verse.innerText;
                              
//                               toggleVerseHighlight(verse);
//                     });
//           });

          
// });

document.addEventListener('keydown', function(event){
  if(event.key === 'Enter' && (document.getElementById('search').value).length > 0){
    searchBible();
  }
});

function exitMainMenu() {
          const div = document.getElementById("information-container");
          div.style.transition = "opacity 0.5s ease"; // Fade out over 0.5 seconds
          div.style.opacity = "0";
};

function exitArticles() {
  const div = document.getElementById("article-container");
  div.style.transition = "opacity 0.5s ease"; // Fade out over 0.5 seconds
  div.style.opacity = "0";
  div.style.pointerEvents = "none";
};

function openArticles() {
  const div = document.getElementById("article-container");
  div.style.transition = "opacity 0.5s ease"; // Fade out over 0.5 seconds
  div.style.opacity = "1";
  div.style.pointerEvents = "auto";
};

function openMainMenu(){
  const div = document.getElementById("information-container");
  div.style.transition = "opacity 0.5s ease"; // Fade out over 0.5 seconds
  div.style.opacity = "1";
};

function toggleVerseHighlight(verse){
    // Toggle background color when verse is clicked
    if (verse.style.backgroundColor === 'black') {
      verse.style.backgroundColor = ''; // Reset background color
      verse.style.color = 'black';
      verse.style.padding = '0px';
    } 
    else {
        openMainMenu();
        verse.style.backgroundColor = 'black'; // Change background color
        verse.style.color = 'white';
        verse.style.padding = '2px';
    }
};

