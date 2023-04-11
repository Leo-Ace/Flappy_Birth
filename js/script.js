const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log.bind(document);

(()=> {
  const cat = $(".cat");
  const background = $(".main");
  const messageNote = $(".note");
  const messagePoint = $(".point");
  
  let checkPlay = false, resultPoint = 0;
  
  document.addEventListener('keydown', (e)=> {
    if(!checkPlay && e.key === 'Enter') {
      messageNote.innerHTML = '';
      messagePoint.style.display = 'block';
      cat.style.top = '40vh'
      checkPlay = true;
      $$('.obstacle').forEach(item=>item.remove());
      messagePoint.innerHTML = '0'
      actGames();
    }
  });
  // mobile
  document.addEventListener('touchstart', (e)=> {
    if(!checkPlay) {
      messageNote.innerHTML = '';
      messagePoint.style.display = 'block';
      cat.style.top = '40vh'
      checkPlay = true;
      $$('.obstacle').forEach(item=>item.remove());
      messagePoint.innerHTML = '0'
      actGames();
    }
  });

  function actGames() {
    let cat_attribute = cat.getBoundingClientRect();
    let background_attribute = background.getBoundingClientRect();
    let down = 0, i = 0, y = 1;
    function actCat() {
      if(checkPlay) {
        down = down + 1.5;
        document.addEventListener('keydown', (e)=> {
          if(e.key === ' ') {
            down = -12;
          }
        });
        // monbile
        document.addEventListener('touchstart', (e)=> {
          down = -12;
        });

        if(cat_attribute.top <= 10 || cat_attribute.bottom >= (background_attribute.bottom - 10)) {
          messageNote.innerHTML = 'Nhấn Enter để chơi lại!';
          if(background.getBoundingClientRect().right < 700) {
            messageNote.innerHTML = 'Nhấn để chơi lại!';
          }
          // messagePoint.style.display = 'none';
          if(resultPoint <= Number(messagePoint.innerHTML)) {
            resultPoint = Number(messagePoint.innerHTML);
            messagePoint.innerHTML = `
              <span>${resultPoint}</span><br>
              <span>Kỉ Lục Mới: ${resultPoint}</span>
            `
          } else {
            messagePoint.innerHTML = `
              <span>${messagePoint.innerHTML}</span><br>
              <span>Kỉ Lục: ${resultPoint}</span>
            `
          }
          checkPlay = false;
          $$('.obstacle').forEach(item=>item.remove())
          clearInterval(interval1);
          clearInterval(interval2);
          clearInterval(interval3);
          return;
        } else {
          cat.style.top = `${eval(cat_attribute.top + down)}px`;
          cat_attribute = cat.getBoundingClientRect();
        }
      }
    }
    const interval1 = setInterval(()=> {
      actCat();
    }, 60);

    let numberspace
    if(background.getBoundingClientRect().right < 700) {
      numberspace = 25;
    } else {
      numberspace = 20;
    }
    function createObstacle() {
      if(checkPlay) {
        if(i > numberspace) {
          i = 0;
          let Obstacle = document.createElement('div');
          Obstacle.classList.add('obstacle');
          Obstacle.innerHTML = `
            <span class="obstacle-child" style="
              position: absolute;
              bottom: -2px;
              left: -10px;
              right: -10px;
              height: 50px;
              background-color: #00ff2f;
              border: 2px solid #000;
            "></span>
          `
          const random = Math.floor(Math.random()*36 + 15);
          Obstacle.style.top = `${eval(random - 80)}vh`;
          $('.main').appendChild(Obstacle);
          Obstacle = document.createElement('div');
          Obstacle.classList.add('obstacle');
          Obstacle.innerHTML = `
            <span class="obstacle-child" style="
              position: absolute;
              top: -2px;
              left: -10px;
              right: -10px;
              height: 50px;
              background-color: #00ff2f;
              border: 2px solid #000;
            "></span>
          `
          if(background.getBoundingClientRect().right < 700) {
            Obstacle.style.top = `${eval(20 + random)}vh`;
          } else Obstacle.style.top = `${eval(24 + random)}vh`;
          $('.main').appendChild(Obstacle);
        }
        i++;
      }
    }
    const interval2 = setInterval(()=> {
      createObstacle();
    }, 70);

    function handleGame() {
      if(checkPlay) {
        cat_attribute = cat.getBoundingClientRect();
        let listObstacle = $$('.obstacle');
        [...listObstacle].forEach(item=> {
          let item_attribute = item.getBoundingClientRect();
          let itemChild_attribute = item.querySelector('.obstacle-child').getBoundingClientRect();
          if(itemChild_attribute.right<=0) {
            item.remove();
          }
          if(cat_attribute.left < itemChild_attribute.left + itemChild_attribute.width && cat_attribute.left + cat_attribute.width > itemChild_attribute.left && cat_attribute.top + cat_attribute.height > item_attribute.top && cat_attribute.top < item_attribute.top + item_attribute.height) {
            messageNote.innerHTML = 'Nhấn Enter để chơi lại!';
            if(background.getBoundingClientRect().right < 700) {
              messageNote.innerHTML = 'Nhấn để chơi lại!';
            }
            // messagePoint.style.display = 'none';
            if(resultPoint <= Number(messagePoint.innerHTML)) {
              resultPoint = Number(messagePoint.innerHTML);
              messagePoint.innerHTML = `
                <span>${resultPoint}</span><br>
                <span>Kỉ Lục Mới: ${resultPoint}</span>
              `
            } else {
              messagePoint.innerHTML = `
                <span>${messagePoint.innerHTML}</span><br>
                <span>Kỉ Lục: ${resultPoint}</span>
              `
            }
            checkPlay = false;
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
            return;
          } else {
            if(cat_attribute.left < item_attribute.right && cat_attribute.right >= item_attribute.right + 50) {
              if(y == 2) {
                y = 1;
                messagePoint.innerHTML = eval(Number(messagePoint.innerHTML) + 1);
              } else y++;
            }
            item.style.left = `${eval(item_attribute.left - 10)}px`;
            item_attribute = item.getBoundingClientRect();
            itemChild_attribute = item.querySelector('.obstacle-child').getBoundingClientRect();
          }
        });
      }
    }
    const interval3 = setInterval(()=> {
      handleGame();
    }, 60);
  }

  if(background.getBoundingClientRect().right < 700) {
    messageNote.innerHTML = 'Nhấn để bắt đầu chơi!';
  }

})();