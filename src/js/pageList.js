const pageList = (argument = '', maxDisplay = 9) => {
  const pageSize = 27;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const deleteAncientsGames = document.querySelectorAll('.deletable');
    for(let i = 0; i < deleteAncientsGames.length; i++) {
      deleteAncientsGames[i].remove();
    }

    const displayResults = (articles) => {
      for(let i = 0; i < maxDisplay ; i++) {
        // create a new card for each game
        const div = document.getElementById('pageContent').appendChild(document.createElement("div"));
        div.setAttribute('id',`gameID${i}`)
        div.classList.add('deletable');
        const addMovieElement = (div, name, image) => {
          div.innerHTML = `
            <article class="hiding-class max-w max-h bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img class="rounded-t-lg" src="${image}" alt="" />
              </a>
              <div class="p-5">
                <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${name}</h5>
                </a>
                <div id="platforms${i}" class="flex"></div>
              </div>
            </article>
          `
          // display symbol of each platform supporting the game
          const platforms = articles[i].platforms;
          for(let u = 0; u < platforms.length ; u++) {
            const imagePlatform = document.getElementById(`platforms${i}`).appendChild(document.createElement("img"));
            imagePlatform.setAttribute('src',`../src/assets/images/${platforms[u].platform.slug}.svg`);
            imagePlatform.setAttribute('alt',`logo ${platforms[u].platform.slug}`);
            imagePlatform.setAttribute('title',`${platforms[u].platform.slug}`);
            imagePlatform.classList.add('mr-2');
          }        
        }
        addMovieElement(div, articles[i].name, articles[i].background_image);

        // change the information when the mouse is over the card
        const hoverGames = document.getElementById(`gameID${i}`);
        hoverGames.addEventListener('mouseenter',(e) => {
          e.preventDefault;
          div.innerHTML = `
          <article class="hiding-class max-w max-h bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="${articles[i].background_image}" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${articles[i].name}</h5>
              </a>
              <div>Test entrée</div>
            </div>
          </article>
        `
        });
        hoverGames.addEventListener('mouseout',(e) => {
          div.innerHTML = `
          <article class="hiding-class max-w max-h bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="${articles[i].background_image}" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${articles[i].name}</h5>
              </a>
              <div>Test sortie</div>
            </div>
          </article>
        `
        });
      };
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=2024-01-01,2024-12-31&ordering=-rating&page_size=27`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section id = "sectionContent" class = " deletable articles">
        Loading...
      </section>
    `;

    preparePage();
  };

  render();
};

export default pageList;