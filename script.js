$(function () {
  let fields = $(".field")
  let clicks = 0
  let crosses = []
  let circles = []
  let isWin = false
  let turnsElem = $(".turns")
  let isEndGame = false
  const result = {
    cross: 0,
    circle: 0,
  }

  let possibleCombinations = [
    "147",
    "258",
    "369",
    "123",
    "456",
    "789",
    "159",
    "357",
  ]

  fields.on("click", function (e) {
    let field = $(`#${this.id}`)
    clicks++
    if (field.hasClass("cross") || field.hasClass("circle")) {
      return
    }
    if (clicks % 2 === 0) {
      if (isWin === true) {
        return
      } else {
        $('.slider').css("background-color", "red")
        turnsElem.removeClass("swc")
        field.addClass("circle")
        circles.push(`${this.id}`)
        let compare = circles.sort((a, b) => {
          return a - b
        })
        if (circles.length == 3) {
          let strCom = compare.join("")
          checkWin(strCom, "Circle")
        } else if (circles.length == 4) {
          checkWin(`${compare[0]}${compare[1]}${compare[2]}`, "Circle")
          checkWin(`${compare[0]}${compare[1]}${compare[3]}`, "Circle")
          checkWin(`${compare[0]}${compare[2]}${compare[3]}`, "Circle")
          checkWin(`${compare[1]}${compare[2]}${compare[3]}`, "Circle")
        }
      }
    } else if (clicks % 2 !== 0) {
      if (isWin === true) {
        return
      } else {
        $('.slider').css("background-color", "#edc760")
        turnsElem.addClass("swc")
        field.addClass("cross")
        crosses.push(`${this.id}`)
        let compare = crosses.sort((a, b) => {
          return a - b
        })
        if (compare.length === 3) {
          let strCom = compare.join("")
          checkWin(strCom, "Cross")
        } else if (compare.length === 4) {
          checkWin(`${compare[0]}${compare[1]}${compare[2]}`, "Cross")
          checkWin(`${compare[0]}${compare[1]}${compare[3]}`, "Cross")
          checkWin(`${compare[0]}${compare[2]}${compare[3]}`, "Cross")
          checkWin(`${compare[1]}${compare[2]}${compare[3]}`, "Cross")
        } else if (compare.length === 5) {
          checkWin(`${compare[0]}${compare[1]}${compare[2]}`, "Cross")
          checkWin(`${compare[0]}${compare[1]}${compare[3]}`, "Cross")
          checkWin(`${compare[0]}${compare[2]}${compare[3]}`, "Cross")
          checkWin(`${compare[1]}${compare[2]}${compare[3]}`, "Cross")
          checkWin(`${compare[1]}${compare[2]}${compare[4]}`, "Cross")
          checkWin(`${compare[1]}${compare[3]}${compare[4]}`, "Cross")
          checkWin(`${compare[2]}${compare[3]}${compare[4]}`, "Cross")
          if (isEndGame) {
            return
          } else if (isEndGame === false && isWin === false) {
            $('.msg').css('color', '#566fed')
            $('.msg').html(`Draw!`)
            $('.result').addClass('show')
            isEndGame = true
          }
        }
      }
    } else {
      return
    }
  })

  const checkWin = (arr, symbol) => {
    if (isEndGame) {
      return
    }
    possibleCombinations.includes(arr) ? (isWin = true) : (isWin = false)
    if (isWin) {
      if (symbol === "Cross") {
        $('.msg').css('color', 'red')
      } else {
        $('.msg').css('color', '#edc760')
      }
      $('.msg').html(`${symbol} wins!`)
      $('.result').addClass('show')

      const classKeyMap = {
        Cross: '.Xscore',
        Circle: '.Oscore'
      }
      const classKey = classKeyMap[symbol]
      result[symbol.toLowerCase()]++
      $(classKey).html(result[symbol.toLowerCase()])
      isEndGame = true
    }
  }

  $("#reload-btn").click(function () { restart() })

  $('#play-again-btn').click(function () {
     restart() 
     $('.result').removeClass('show')
  })

  $('#reset-score-btn').click(function () {
    resetScore()
  })

  const restart = () => {
    $(".circle").removeClass("circle")
    $(".cross").removeClass("cross")
    $('.slider').css("background-color", "red")
    $('.swc').removeClass('swc')
    clicks = 0
    crosses = []
    circles = []
    isWin = false
    isEndGame = false
  }

  const resetScore = () => {
    result.cross = 0
    result.circle = 0
    $('.Xscore').html(result.cross)
    $('.Oscore').html(result.circle)
  }
})
