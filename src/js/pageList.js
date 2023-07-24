const pageList = (argument = '') => {
  const maxDisplay = 9;
  const pageSize = 27;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        ` <article class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="${article.background_image}" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${article.name}</h5>
              </a>
              <p>
             
              </p>
            </div>
          </article>
        `,
        console.log(article.platforms[0].released_at)
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=2024-01-01,2024-12-31&ordering=-rating&page_size=27`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default pageList;