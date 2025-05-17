document.getElementById('book-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const input = document.getElementById('book-input').value.trim();
  if (!input) return;

  const recommendationsDiv = document.getElementById('recommendations');
  recommendationsDiv.innerHTML = '<p>Loading recommendations...</p>';

  // Construct the AI prompt
  const prompt = `Recommend books similar to '${input}' and include short summaries and genres.`;

  try {
    // Placeholder for AI API call - replace with actual API call
    const recommendations = await getBookRecommendations(prompt);

    // Display the recommendations
    if (recommendations && recommendations.length > 0) {
      recommendationsDiv.innerHTML = '';
      recommendations.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        const title = document.createElement('div');
        title.className = 'book-title';
        title.textContent = book.title;

        const genre = document.createElement('div');
        genre.className = 'book-genre';
        genre.textContent = `Genre: ${book.genre}`;

        const summary = document.createElement('div');
        summary.className = 'book-summary';
        summary.textContent = book.summary;

        bookItem.appendChild(title);
        bookItem.appendChild(genre);
        bookItem.appendChild(summary);

        recommendationsDiv.appendChild(bookItem);
      });
    } else {
      recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
    }
  } catch (error) {
    recommendationsDiv.innerHTML = '<p>Error fetching recommendations. Please try again later.</p>';
    console.error(error);
  }
});

// Simulated AI API call function
async function getBookRecommendations(prompt) {
  // This is a stub function. Replace this with actual API call to OpenAI or other AI service.
  // For demonstration, returning static sample data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          title: 'Brave New World',
          genre: 'Dystopian, Science Fiction',
          summary: 'A futuristic society controlled by technology and conditioning, exploring themes of freedom and control.'
        },
        {
          title: 'Fahrenheit 451',
          genre: 'Dystopian, Science Fiction',
          summary: 'A society where books are banned and "firemen" burn any that are found, focusing on censorship and knowledge.'
        },
        {
          title: 'Animal Farm',
          genre: 'Political Satire, Allegory',
          summary: 'A farm where animals overthrow their human owner, symbolizing the Russian Revolution and totalitarianism.'
        }
      ]);
    }, 1500);
  });
}
