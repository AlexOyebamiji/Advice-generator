let roll = document.querySelector('.btn');

const box = document.querySelector('.content');

const generateAdvice = () => {
  roll = Math.floor(Math.random() * 224) + 1;
  fetch(`https://api.adviceslip.com/advice/${roll}`).then(res =>
    res.json().then(data => {
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
      }
    })
  );
};

roll.addEventListener('click', generateAdvice);
