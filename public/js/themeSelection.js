const updateTheme = (timeZoneID) => {
  switch (timeZoneID) {
    case '/css/style.css':
      return 'Default'

    case '/css/plainLightMode.css':
      return 'Basic Light'

    case '/css/plainDarkMode.css':
      return 'Basic Dark'

    case '/css/poly.css':
      return 'Low Poly'

    case '/css/nyan.css':
      return 'NYAN FOREVER'
      
    case '/css/peace.css':
      return 'Peace & Love'
    default:
      break;
  }
}

const userThemeElem = document.querySelector('#user-theme')
userThemeElem.innerHTML = updateTheme(userThemeElem.value);
