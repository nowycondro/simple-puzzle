(() => {
  const images = ['DS085528.jpg', 'DS140041.jpg', 'DS144620.jpg', 'DS170218.jpg', 'DSC00396.JPG', 'DSC00560.JPG', 'DSC00628.JPG',
    'DSC00710.JPG', 'DSC01885.JPG', 'DSC03715.JPG', 'DSC03726.JPG', 'DSC03736.JPG', 'DSC03773.JPG', 'DSC03875.JPG', 'DSC03896.JPG']
  const set = (object, attr, value) => {
    object[attr] = value
  }
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const one = document.querySelector.bind(document)
  const all = document.querySelectorAll.bind(document)
  const addBackground = (elem, index) => set(elem.style, 'backgroundImage', `url(./img/${images[index]})`)
  const each = (items, func) => items.forEach(func)
  const map = (items, func) => items.map(func)
  const run = (...funcs) => map(funcs, ([func, ...args]) => func.apply(null, args))
  const click = (elem, func) => elem.addEventListener('click', func) || elem  // Guess why "||" is here
  const toggle = elem => elem.currentTarget.classList.toggle('flip')
  const flip = elem => elem.classList.add('flip')
  const append = (from, to) => from + to
  const generateCard = num => `<div class="card"><div class="front back">${num}</div></div>`
  const shuffle = array => array.sort(() => Math.random() - 0.5)
  const [containerNode, resetButton] = run([one, '.card-container'], [one, 'button.reset'])
  const [,, [cards, backs]] = run(
    [each, images, filename => set(new window.Image(), 'src', `./img/${filename}`)],  // Cache the images
    [set, containerNode, 'innerHTML', numbers.reduce((prev, curr) => append(prev, generateCard(curr)), '')],  // Generate all cards
    [run, [all, '.card'], [all, '.back']] // Get the cards
  )
  let animationTimer
  const reset = () => {
    animationTimer = run(
      [clearInterval, animationTimer],
      [shuffle, images],
      [each, cards, flip],  // Flip the card
      [setInterval, () => each(shuffle(numbers), (num, index) => set(backs[index], 'innerHTML', num)), 200],  // Random number animation
      [setTimeout, () => each(cards, addBackground), 500], // Add delay before change the background
      [setTimeout, () => clearInterval(animationTimer), 1000] // Clear the random number animation
    )[3]
  }

  run(
    [each, cards, card => click(card, toggle)], // Add toggle function to each card
    [click, resetButton, reset] // Reset button
  )[1].click()
})()
