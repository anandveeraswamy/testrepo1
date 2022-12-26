
const puppeteer = require('puppeteer')

run().then(() => console.log('Puppeteer Done')).catch(console.error)

async function run () {
  const browser = await puppeteer.launch({
    // disable `headless: false` to run virtually
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximised'
    ],
    slowMo: 250
  })

  // Create a new tab
  const page = await browser.newPage()

  // Navigate to Ada college home
  await page.goto('https://www.ada.ac.uk/')
  console.log('navigated to: https://www.ada.ac.uk/')

  // Click to toggle the search pane
  try {
    await page.click('BUTTON.searchbar__toggle')
  } catch {
    await page.click('BUTTON.menu__btn')
  }
  console.log('toggled search bar visibility')


  // Type a search term
  await page.type('INPUT.searchbar__form__input', 'javascript', {delay: 50})
  console.log('entered search term: javascript')

  // Submit our search
  await Promise.all([
    page.waitForNavigation(),
    page.click('BUTTON.searchbar__form__submit'),
  ])
  console.log('submitted search')


  // Click the first result
  await Promise.all([
    page.waitForNavigation(),
    page.click('OL.search__results LI.search__results__item DIV.search__results__item__txt'),
  ])
  console.log('clicked first search result')


  // Access the text content of the article
  const content = await page.$eval('DIV.content__region', el => el.textContent)
  console.log('accessed search result article text content')

  console.log(content)

  await browser.close()
}


