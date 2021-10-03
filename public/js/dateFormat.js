const formatDate = (date) => {

  dateTrim = date.replace('Alert Day currently selected: ', '')

  let dateArr = dateTrim.split('-')

  return `Alert Day currently selected: ${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`

}

const rawDate = document.getElementById('formatted-date').textContent
document.querySelector('#formatted-date').textContent = formatDate(rawDate);