import pageDetails from './pageDetails';

let isFetched = 0;

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
        div.classList.add('deletable', 'flex', 'justify-between','p-2.5', 'w-full', 'h-full');
        const addMovieElement = (div, name, image, id) => {
          div.innerHTML = `
            <article class="card_game w-full h-full bg-black">
              <a href="#">
                <img class="rounded-t-lg" src="${image}" alt="" />
              </a>
              <div class="p-5">
                <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">${name}</h5>
                </a>
                <div id="platforms${i}" class="flex gap-4 pt-3"></div>
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
          <article class="card_game w-full h-full bg-black">
            <p>lalala</p>
            <div class="p-5">
              <a href="#">
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">Mon cul sur la</h5>
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
      const button = document.getElementById('pageContent').parentNode.appendChild(document.createElement("div"));
      button.innerHTML = "<button type='button' class='deletable bg-red text-white font-bold w-48 h-12 text-xl'>Show more</button>";
      button.classList.add('flex', 'justify-center', 'pt-10', 'pb-10');

      button.addEventListener('click', (e) => {
        maxDisplay += 9;
        pageList('', maxDisplay);
      })
    };

    const fetchList = (url, argument) => {
      isFetched++;
      const finalURL = argument ? `${url}&search=${argument}` : `${url}&dates=2024-01-01,2024-12-31&ordering=-rating&page_size=27`;

      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };
    
    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
    console.log(isFetched);

    // when a user use the searchbar
    const searchGames = document.getElementById('submit');
    const input = document.getElementById('default-search');
    searchGames.addEventListener('click',(e) => {
      deleteAncientsResults();
      const ask = input.value;
      console.log(ask)
      pageList(ask, 9);
    });
    window.addEventListener('keypress', function (e) {
      const ask = document.getElementById('default-search').value;
      if (e.key === 'Enter' && ask) {
        console.log(ask)
        deleteAncientsResults();
        pageList(ask, 9);
        }
    });
    // when a user click on a card
    window.addEventListener('click',(e) => {
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