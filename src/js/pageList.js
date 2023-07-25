import pageDetails from './pageDetails';

const pageList = (argument = '', maxDisplay = 9) => {
  const pageSize = 27;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const deleteAncientsResults = () => {
      const deleteAncientsGames = document.querySelectorAll('.deletable');
      for(let i = 0; i < deleteAncientsGames.length; i++) {
        deleteAncientsGames[i].remove();
      }
    }
    deleteAncientsResults();

    const displayResults = (articles) => {
      for(let i = 0; i < maxDisplay ; i++) {
        // create a new card for each game
        const div = document.getElementById('pageContent').appendChild(document.createElement("div"));
        div.setAttribute('id',articles[i].id)
        div.classList.add('deletable', 'p-2.5', 'w-96', 'h-96');
        const addMovieElement = (div, name, image, id) => {
          div.innerHTML = `
            <article class="card_game w-full h-full bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          let tempPlatforms = '';
          const platforms = articles[i].platforms;
          if (platforms != null) {
            for (let u = 0; u < platforms.length ; u++) {
              if (!tempPlatforms.includes("playstation") || !tempPlatforms.includes("xbox")) {
                const imagePlatform = document.getElementById(`platforms${i}`).appendChild(document.createElement("img"));
                imagePlatform.setAttribute('src',`../src/assets/images/${platforms[u].platform.slug}.svg`);
                imagePlatform.setAttribute('alt',`logo ${platforms[u].platform.slug}`);
                imagePlatform.setAttribute('title',`${platforms[u].platform.slug}`);
                imagePlatform.classList.add('mr-2');
                tempPlatforms+= `${platforms[u].platform.slug} `;
              }
            }
          }      
        }
        if(articles[i].background_image === null) {
          const background_image = `../src/assets/images/comingsoon.svg`;
          addMovieElement(div, articles[i].name, background_image, articles[i].id);
        } else {
          addMovieElement(div, articles[i].name, articles[i].background_image, articles[i].id);
        }
        //change the information when the mouse is over the card then undo the changes when go out
        const hoverGames = document.getElementById(articles[i].id);
        const initialInnerHTML = hoverGames.innerHTML
        hoverGames.addEventListener('mouseenter',(e) => {
          hoverGames.innerHTML = `
          <article class="card_game w-full h-full bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p>lalala</p>
            <div class="p-5">
              <a href="#">
              <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mon cul sur la</h5>
              </a>
            </div>
          </article>
        `
        });
        
        hoverGames.addEventListener('mouseleave',(e) => {
          if(e.target === hoverGames){
            hoverGames.innerHTML = initialInnerHTML;
          }
        });    
      };
      const button = document.getElementById('pageContent').parentNode.appendChild(document.createElement("button"));
      button.innerHTML = "Voir plus";
      button.setAttribute('type', 'button');
      button.classList.add('deletable', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');

      button.addEventListener('click', (e) => {
        maxDisplay += 9;
        pageList('', maxDisplay);
      })
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };
    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=2024-01-01,2024-12-31&ordering=-rating&page_size=${pageSize}`, cleanedArgument);

    // when a user use the searchbar
    const searchGames = document.getElementById('submit');
    searchGames.addEventListener('click',(e) => {
      deleteAncientsResults();
      const ask = document.getElementById('default-search').value;
      pageList(ask, maxDisplay);
    });

    // when a user click on a card
    window.addEventListener('click',(e) => {
      console.log(e.target)
      pageDetails('lalalalala');
    });
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