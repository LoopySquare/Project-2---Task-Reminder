const selectorElem = document.querySelector('#theme-selector')

const optionToSelect = selectorElem.getAttribute('data-theme')

for (let i = 0; i < selectorElem.length; i++) {
  if(optionToSelect === selectorElem.options[i].value){
    selectorElem.options[i].selected = true;
  }
}

