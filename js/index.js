(() => {
  const images = ['DS085528.jpg', 'DS140041.jpg', 'DS144620.jpg', 'DS170218.jpg', 'DSC00396.JPG', 'DSC00560.JPG', 'DSC00628.JPG',
    'DSC00710.JPG', 'DSC01885.JPG', 'DSC03715.JPG', 'DSC03726.JPG', 'DSC03736.JPG', 'DSC03773.JPG', 'DSC03875.JPG', 'DSC03896.JPG']
  const set = (object, attr, value) => {
    object[attr] = value
  }
  const one = document.querySelector.bind(document)
  const all = document.querySelectorAll.bind(document)
  const addBackground = (elem, index) => set(elem.style, 'backgroundImage', `url(./img/${images[index]})`)
  const each = (items, func) => items.forEach(func)
  const map = (items, func) => items.map(func)
  const run = (...funcs) => map(funcs, ([func, ...args]) => func.apply(null, args))
  const click = (elem, func) => elem.addEventListener('click', func)
  const toggle = elem => elem.currentTarget.classList.toggle('flip')
  const flipImage = elem => elem.classList.add('flip')
  const append = (from, to) => from + to
  const generateCard = num => `<div class="card"><div class="front back">${num}</div></div>`
  const shuffle = array => array.sort(() => Math.random() - 0.5)
  const [containerNode, resetButton] = run([one, '.card-container'], [one, 'button.reset'])

  // Cache the images
  each(images, filename => set(new window.Image(), 'src', `./img/${filename}`))

  // Generate cards
  set(containerNode, 'innerHTML', [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((prev, curr) => append(prev, generateCard(curr)), ''))

  const [cards, backs] = run([all, '.card'], [all, '.back'])

  // Random number in each card for animation
  const setRandomNumber = () => each(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]), (num, index) => set(backs[index], 'innerHTML', num))

  // Add toggle function to each card
  each(cards, card => click(card, toggle))

  let ramdomTimer
  const reset = () => {
    ramdomTimer = run(
      [clearInterval, ramdomTimer],
      [shuffle, images],
      [each, cards, flipImage],
      [setInterval, setRandomNumber, 200],
      [setTimeout, () => run([each, cards, addBackground]), 500],
      [setTimeout, () => run([clearInterval, ramdomTimer]), 1000]
    )[3]
  }

  // Reset button
  click(resetButton, reset)

  reset()
})()
