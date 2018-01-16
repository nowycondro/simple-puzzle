(() => {
  var images = ['DS085528.jpg', 'DS140041.jpg', 'DS144620.jpg', 'DS170218.jpg', 'DSC00396.JPG', 'DSC00560.JPG', 'DSC00628.JPG', 'DSC00710.JPG', 'DSC01885.JPG', 'DSC03715.JPG', 'DSC03726.JPG', 'DSC03736.JPG', 'DSC03773.JPG', 'DSC03875.JPG', 'DSC03896.JPG']
  var containerNode = document.querySelector('.card-container')
  var resetButton = document.querySelector('button.reset')
  var setInnerHTML = (node, str) => {
    node.innerHTML = str
  }
  var addBackground = (elem, index) => {
    elem.style.backgroundImage = 'url("./img/' + images[index] + '")'
  }

  var each = (items, func) => items.forEach(func)
  var click = (elem, func) => elem.addEventListener('click', func)
  var toggle = (elem) => elem.currentTarget.classList.toggle('flip')
  var flipImage = (elem) => elem.classList.add('flip')
  var append = (from, to) => from + to
  var generateCard = (num) => `<div class="card">
    <div class="front back">${num}</div>
  </div>`
  var shuffle = (array) => {
    var currentIndex = array.length
    var temporaryValue
    var randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  // Cache the images
  each(images, (filename) => {
    (new window.Image()).src = './img/' + filename
  })

  // Generate cards
  setInnerHTML(containerNode, [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((prev, curr) => append(prev, generateCard(curr)), ''))

  var cards = document.querySelectorAll('.card')
  var backs = document.querySelectorAll('.back')

  // Random number in each card for animation
  var setRandomNumber = () => each(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]), (num, index) => setInnerHTML(backs[index], num))

  // Add toggle function to each card
  each(cards, (card) => click(card, toggle))

  var ramdomTimer
  var clearTimer = () => clearInterval(ramdomTimer)

  // Reset button
  click(resetButton, () => {
    clearTimer()

    shuffle(images)

    // Flip the card
    each(cards, flipImage)

    // Set random number to the back of the card
    ramdomTimer = setInterval(setRandomNumber, 200)

    // Add delay for opacity animation to be stopped
    setTimeout(() => each(cards, addBackground), 500)

    // Add delay to stop the random number
    setTimeout(clearTimer, 1000)
  })

  resetButton.click()
})()
