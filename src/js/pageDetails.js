import pageList from './pageList';

const PageDetail = (argument) => {
  const preparePage = () => {

    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    let webDescription = document.querySelector(".webdescription");
    if (!webDescription.classList.contains("hidden")){
      webDescription.classList.add("hidden");
    }


    const displayGame = (gameData) => {
      const { name, released, description, developers, genres, short_screenshots} = gameData;
      console.log(cleanedArgument);
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.genres").innerHTML = "Genre";

      for (let i = 0 ; i < genres.length ; i++) {
        articleDOM.querySelector("p.genres").innerHTML += `<a href = "#pagelist/&genres=${genres[i].slug}">${genres[i].slug}</a>`;
      }

      if (developers.length > 0) {
      articleDOM.querySelector("p.developers").innerHTML = `Développeur : <a href = "#pagelist/&developers=${developers[0].id}">${developers[0].name}</a>`;
      }
    };

    const displayScreenshots = (screenshots) => {
      const screenshotContainer = document.createElement("div");
      screenshotContainer.classList.add("screenshots");

      for (const screenshot of screenshots) {
        const screenshotImage = document.createElement("img");
        screenshotImage.classList.add("screenshot");
        screenshotImage.src = screenshot.image;
        screenshotImage.alt = "Screenshot";
        screenshotContainer.appendChild(screenshotImage);
      }

      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.appendChild(screenshotContainer);
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${process.env.API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
          fetchScreenshots(responseData);
        });
    };

    const fetchScreenshots = (responseData) => {
      fetch(`https://api.rawg.io/api/games/${responseData.id}/screenshots?key=${process.env.API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayScreenshots(responseData.results);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
    <div class = "flex-container">
      <section class="page-detail">
        <div class="article">
        <div class="">
          <h1 class="title text-white text-4xl font-bold mb-2"></h1>
          <p class=""></p>
        </div>
          <p class="text-white mb-5">dsdazdadazd</p>
          <p class="release-date text-white font-bold">Release Date<span></span></p>
          <h3 class="text-white font-bold">Plot</h3>
          <p class="description text-white"></p>
          <p class ="developers text-white"></p>
          <p class = "genres text-white"></p>
        </div>
      </section>

      <a href = "#pagelist" id = "back">Retour aux tendances</a>
      </div>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;