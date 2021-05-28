const btn = document.querySelector('.btn_test');

function getResult() {
  
  let height = window.screen.height
  let width = window.screen.width
  
  alert (`Ширина экрана: ${width} Высота экрана: ${height}`)
}

btn.addEventListener('click', getResult);