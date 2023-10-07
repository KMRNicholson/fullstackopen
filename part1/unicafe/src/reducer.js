const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: '0%'
}

const counterReducer = (feedback = initialFeedback, action) => {
  const newFeedback = { ...feedback }
  switch (action.type) {
    case 'good':
      newFeedback.good++
      break;

    case 'neutral':
      newFeedback.neutral++
      break;

    case 'bad':
      newFeedback.bad++
      break;

    case 'reset':
      return initialFeedback
  
    default:
      return newFeedback
  }

  newFeedback.all = newFeedback.good + newFeedback.bad + newFeedback.neutral
  newFeedback.average = (newFeedback.good - newFeedback.bad) / newFeedback.all

  const positive = newFeedback.good / newFeedback.all * 100
  newFeedback.positive = `${positive}%`

  return newFeedback
}

export default counterReducer