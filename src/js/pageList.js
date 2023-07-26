import pageDetails from './pageDetails';
import routes from './routes';

const pageList = (argument = '') => {
  let buttonShow = 0;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    // clear all previous cards on page
    const deleteAncientsResults = () => {
      const deleteAncientsGames = document.querySelectorAll('.deletable');
      for(let i = 0; i < deleteAncientsGames.length; i++) {
        deleteAncientsGames[i].remove();
      }
    }
    deleteAncientsResults();

    const displayResults = (articles) => {
      for(let i = 0; i < articles.length ; i++) {
        // create a new card for each game
        const div = document.getElementById('pageContent').appendChild(document.createElement("div"));
        div.setAttribute('id',articles[i].id)
        div.classList.add('deletable', 'hidden', 'justify-between','p-2.5', 'w-full', 'h-full');
        let dev = '';
        fetch(`https://api.rawg.io/api/games/${articles[i].slug}?key=${process.env.API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => { 
          if (responseData.developers.length != 0) {
            dev = responseData.developers[0].name;
          }        
        });

        const addGameElement = (div, name, image, slug) => {
          div.innerHTML = `
            <article class="cardGame w-full h-full bg-black" name="${slug}">
            <div class="h-80 headerCard">
              <img class="w-full h-72 imgBg" src="${image}" alt="" />
              <p class="text-xl font-thin text-white pdate"></p>
              <p class="text-xl mt-3 font-thin text-white pdev"></p>
              <p class="text-xl mt-3 font-thin text-white prating"></p>
              <p class="text-xl mt-3 font-thin text-white ptags"></p>
            </div>
              <div class="cardContent">
                <h5 class="mb-2 mt-2 text-2xl font-bold text-white">${name}</h5>
                <div id="platforms${i}" class="flex gap-4 pt-2"></div>
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

        // set the background image
        if(articles[i].background_image === null) {
          const background_image = `../src/assets/images/comingsoon.svg`;
          addGameElement(div, articles[i].name, background_image, articles[i].slug);
        } else {
          addGameElement(div, articles[i].name, articles[i].background_image, articles[i].slug);
        }

        const hoverGames = document.getElementById(articles[i].id);
        const initialInnerHTML = hoverGames.innerHTML;
        const moment = require('moment');
        const releasedDate = articles[i].released;
        const dateFormatee = moment(releasedDate).format('ll');
        const tagsArray = articles[i].tags;

        // change the information when the mouse is over the card then undo the changes when go out
        if (tagsArray) {
          let tagsList = '';
          tagsArray.forEach((tag, index) => {
            if (tag.language == 'eng') {
            tagsList += `${tag.name}`;
            index < tagsArray.length-1 ? tagsList+= ', ' : tagsList+= '';
            }
          });

          hoverGames.addEventListener('mouseenter', (e) => {
            let rating = ''
            if (articles[i].ratings_count == 0) {
              rating = "no votes";
            } else {
              rating = articles[i].rating + '/5 ' + ' - ' + articles[i].ratings_count + ' votes';
            }
            let card = document.getElementsByName(articles[i].slug)[0];
            card.querySelector('.imgBg').classList.add('hidden')
            card.querySelector('.pdate').textContent=dateFormatee;
            card.querySelector('.pdev').textContent=dev;
            card.querySelector('.prating').textContent=rating;
            card.querySelector('.ptags').textContent=tagsList;
          });
        } else {
          hoverGames.addEventListener('mouseenter', (e) => {
            hoverGames.innerHTML = `
              <article class="card_game h-72 bg-black">
                <div class="p-5">
                  <p class="text-xl font-thin text-white">${dateFormatee}</p>
                  <p class="text-xl mt-3 font-thin text-white">${dev}</p>
                  <p class="text-xl mt-3 font-thin text-white">${articles[i].rating}/${articles[i].rating_top} - ${articles[i].ratings_count} votes</p>
                </div>
              </article>
            `;
          });
        }
        
        hoverGames.addEventListener('mouseleave',(e) => {
          if(e.target === hoverGames){
            hoverGames.innerHTML = initialInnerHTML;
          }
        });
      };

      // generate all cards and make them disabled at first
      const showCards = () => {
        buttonShow++;
        const hiddenCards = document.querySelectorAll('.hidden');
        for (let x = -1; x < 9; ++x) {
          if (hiddenCards[x]) {;
            hiddenCards[x].classList.remove('hidden');
            hiddenCards[x].classList.add('flex');
          }
        }
        if (buttonShow >= 3) {
          document.getElementById('showbutton').classList.add('hidden');
        }
      }
      showCards();

      // make cards active
      if (buttonShow < 3) {
        const button = document.getElementById('pageContent').parentNode.appendChild(document.createElement("div"));
        button.innerHTML = "<button id='showbutton' type='button' class='deletable bg-red text-white font-bold w-48 h-12 text-xl'>Show more</button>";
        button.classList.add('flex', 'justify-center', 'pt-10', 'pb-10');

        button.addEventListener('click', (e) => {
          showCards();
        })
      } 
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : `${url}&dates=2024-01-01,2024-12-31&ordering=-rating&page_size=27`;

      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };
    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);

    // when a user use the searchbar
    const searchGames = document.getElementById('submit');
    const input = document.getElementById('default-search');
    searchGames.addEventListener('click',(e) => {
      deleteAncientsResults();
      const ask = input.value;
      pageList(ask);
    });
    window.addEventListener('keypress', function (e) {
      const ask = document.getElementById('default-search').value;
      if (e.key === 'Enter' && ask) {
        deleteAncientsResults();
        pageList(ask);
        }
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