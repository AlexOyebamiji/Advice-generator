let roll = document.querySelector('.btn');

const box = document.querySelector('.content');

const renderError = function (msg) {
  box.innerHTML = msg;
};

const generateAdvice = () => {
  // I can add +1 to my roll to make sure that 0 is not part of the generated numbers
  // roll = Math.floor(Math.random() * 224) + 1;
  let roll = Math.floor(Math.random() * 224);
  fetch(`https://api.adviceslip.com/advice/${roll}`)
    .then(res => res.json())
    .then(data => {
      if (data.slip) {
        for (const solu in data.slip) {
          let html = `
            <button class="content">
              <h1>ADVICE # ${roll}</h1>
              <p>
                "${data.slip[solu]}"
              </p>
              <img src="./images/pattern-divider-mobile.svg" alt="" />
            </button> 
            `;
          box.innerHTML = html;
        }
      } else if (roll === 0) {
        if (data.message.type === 'error')
          throw new Error(`${data.message.text}`);
      }
    })
    .catch(err => {
      console.log(`${err}`);
      renderError(`Something went wrong.${err.message}. Reload!!`);
    });
};

roll.addEventListener('click', generateAdvice);
window.addEventListener('load', generateAdvice);
