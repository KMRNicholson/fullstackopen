import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: '0%'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialFeedback)
  })

  test('good is incremented and associated properties updated', () => {
    const action = {
      type: 'good'
    }
    const state = initialFeedback

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0,
      all: 1,
      average: 1,
      positive: '100%'
    })
  })

  test('bad is incremented and associated properties updated', () => {
    const action = {
      type: 'bad'
    }
    const state = initialFeedback

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1,
      all: 1,
      average: -1,
      positive: '0%'
    })
  })

  test('neutral is incremented and associated properties updated', () => {
    const action = {
      type: 'neutral'
    }
    const state = initialFeedback

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0,
      all: 1,
      average: 0,
      positive: '0%'
    })
  })

  test('reset resets all feedback', () => {
    const action = {
      type: 'reset'
    }
    const state = {
      good: 1,
      neutral: 0,
      bad: 0,
      all: 1,
      average: 1,
      positive: '100%'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 0,
      all: 0,
      average: 0,
      positive: '0%'
    })
  })
})