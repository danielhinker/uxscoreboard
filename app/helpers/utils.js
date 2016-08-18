import moment from 'moment'

export function formatDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export function inningSuffix(inning) {
  switch(inning) {
    case '1' || '21': return 'st'
    case '2' || '22': return 'nd'
    case '3' || '23': return 'rd'
    default: return 'th'
  }
}

export function baseRunners(runners) {
  let img = '0b'
  if (runners.runner_on_1b)
    img += '1b'
  if (runners.runner_on_2b)
    img += '2b'
  if (runners.runner_on_3b)
    img += '3b'
  return img
}

export function ballCount(balls, inningState) {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(4, 0)
  else if (balls === '1')
    return fillCircles(4, 1)
  else if (balls === '2')
    return fillCircles(4, 2)
  else if (balls === '3')
    return fillCircles(4, 3)
  else if (balls === '4')
    return fillCircles(4, 4)
  else
    return fillCircles(4, 0)
}

export function strikeOutCount(strikesOuts, inningState) {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(3, 0)
  else if (strikesOuts === '1')
    return fillCircles(3, 1)
  else if (strikesOuts === '2')
    return fillCircles(3, 2)
  else if (strikesOuts === '3')
    return fillCircles(3, 3)
  else
    return fillCircles(3, 0)
}

const fillCircles = (numCircles, numFilled) => {
  let counter = 0, result = ''
  while (counter < numFilled) {
    result += '<span class="circle circleFilled"></span>'
    counter++
  }
  while (counter < numCircles) {
    result += '<span class="circle"></span>'
    counter++
  }
  return { __html: result }
}
