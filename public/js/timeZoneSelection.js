const selectorElem = document.querySelector('#time-zone')

const optionToSelect = selectorElem.getAttribute('data-timezone')

for (let i = 0; i < selectorElem.length; i++) {
  if(optionToSelect === selectorElem.options[i].value){
    selectorElem.options[i].selected = true;
  }
}

