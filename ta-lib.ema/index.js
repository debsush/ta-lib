export default function ema(close, timeperiod = 30) {
  if (!Number.isFinite(timeperiod)) throw new Error('Timeperiod should be a number!')
  var alpha = 2 / (timeperiod + 1)
  var previous
  var initialAccumulator = 0
  var skip = 0

  return close.map((v, i) => {
    if (!Number.isFinite(v)) throw new Error('Input value should be a number!')
    if (!previous) {
      skip++
      return undefined
    } else if (i < timeperiod + skip - 1) {
      initialAccumulator += v
      return undefined
    } else if (i === timeperiod + skip - 1) {
      initialAccumulator += v
      var initialValue = initialAccumulator / timeperiod
      previous = initialValue
      return initialValue
    } else {
      var nextValue = v * alpha + (1 - alpha) * previous
      previous = nextValue
      return nextValue
    }
  })
}
