import pageList from './pageList';

const PageDetail = (argument) => {
  const preparePage = () => {

    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const webDescription = document.querySelector(".webdescription");
    if (!webDescription.classList.contains("hidden")){
      webDescription.classList.add("hidden");
    }

    const displayGame = (gameData) => {
      console.log(gameData);
      const { name, released, description, developers, genres, background_image, website, rating, ratings_count, platforms, publishers, tags } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      console.log(website)
      articleDOM.querySelector("img.background_image").setAttribute('src', background_image);
      articleDOM.querySelector("button.website").setAttribute('onclick', `window.location.href='${website}'`);
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.genres").innerHTML = "Genre : ";
      for (let i = 0 ; i < genres.length ; i++) {
        articleDOM.querySelector("p.genres").innerHTML += `<a href = "#pagelist/&genres=${genres[i].slug}">${genres[i].name}, </a>`;
      };
      if (developers.length > 0) {
        articleDOM.querySelector("p.developers").innerHTML = `Developer : <a href = "#pagelist/&developers=${developers[0].id}">${developers[0].name}</a>`;
      };
      const platformsAdd = articleDOM.querySelector("p.platforms");
      platformsAdd.innerHTML = 'Platforms : '
      for (let i = 0 ; i < platforms.length ; i++) {
        platformsAdd.innerHTML += `${platforms[i].platform.name}, `;
      };
      const publishersAdd = articleDOM.querySelector("p.publishers");
      publishersAdd.innerHTML = 'Publishers : ';
      for (let i = 0 ; i < publishers.length ; i++) {
        publishersAdd.innerHTML += `${publishers[i].name}, `;
      };
      const tagsAdd = articleDOM.querySelector("p.tags");
      tagsAdd.innerHTML = 'Tags : ';
      for (let i = 0 ; i < tags.length ; i++) {
        tagsAdd.innerHTML += `${tags[i].name}, `;
      };
    };

    const displayScreenshots = (screenshots) => {
      const screenshotContainer = document.createElement("div");
      screenshotContainer.classList.add('screenshots', 'grid', 'grid-cols-2', 'gap-8');

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
          <img class="background_image mb-5" alt=background>
          <button type='button' class="website deletable bg-red text-white font-bold w-48 h-12 text-xl mb-5">Check Website</button>
          <div class="">
            <h1 class="title text-white text-4xl font-bold mb-2"></h1>
            <p class=""></p>
          </div>
            <p class = "rating text-white mb-5"></p>
            <p class = "description text-white my-2"></p>
            <p class = "release-date text-white font-bold my-2">Release Date <span></span></p>
            <p class = "developers text-white my-2"></p>
            <p class = "genres text-white my-2"></p>
            <p class = "platforms text-white my-2"></p>
            <p class = "publishers text-white my-2"></p>
            <p class = "tags text-white my-2"></p>
            <h2 class = "font-bold text-red text-4xl my-4">SCREENSHOTS</h2>
        </div>
      </section>
      <a class="text-white mt-10" href = "" id = "back">Retour aux tendances</a>
      </div>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;
