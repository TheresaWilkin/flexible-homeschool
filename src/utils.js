function timeDifference(current, previous) {

  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago'
  }

  else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed/milliSecondsPerMinute) + ' min ago'
  }

  else if (elapsed < milliSecondsPerDay ) {
    return Math.round(elapsed/milliSecondsPerHour ) + ' h ago'
  }

  else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed/milliSecondsPerDay) + ' days ago'
  }

  else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed/milliSecondsPerMonth) + ' mo ago'
  }

  else {
    return Math.round(elapsed/milliSecondsPerYear ) + ' years ago'
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}

const truncateText = (text, length) => {
  if (text.length > length) {
    return `${text.substr(0, length - 3)}...`
  } else {
    return text
  }
}

const sumAges = (sum, ageVote) => sum + ageVote.age

const averageAge = (ageVotes, defaultAge) => ageVotes.length > 0 ? ageVotes.reduce(sumAges, 0)/ageVotes.length : defaultAge

const determineAges = (ageVotes) => {
  const minimumAges = ageVotes.filter(ageVote => ageVote.minimumAge)
  const maximumAges = ageVotes.filter(ageVote => !ageVote.minimumAge)
  return {
    minimumAge: averageAge(minimumAges, 0),
    maximumAge: averageAge(maximumAges, 18)
  }
}

const sumStars = (sum, star) => sum + star.score

const averageStars = (stars, defaultStars) => stars.length > 0 ? stars.reduce(sumStars, 0)/stars.length : defaultStars

export const formatResource = (resource) => {
  return {
    ...resource,
    subject: truncateText(resource.subject, 11),
    description: truncateText(resource.description, 300),
    ages: determineAges(resource.ageVotes),
    stars: averageStars(resource.ratings, 0)
  }
}
