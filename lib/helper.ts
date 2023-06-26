export const sortItems = (requests, selectedHashtags, sortType, filterStatus, callBack) => {
  // Create a copy of the existing events
  let temp = [...requests]
  // In case, the status filter is present
  if (filterStatus.length > 0) {
    temp = temp.filter((i) => i.status === filterStatus)
  }
  // In case, length of selected hashtags is greater than one
  if (Object.keys(selectedHashtags).filter((i) => selectedHashtags[i]).length > 0) {
    temp = temp.filter((i) => {
      let hashDict = i.eventHashtags
      let hashList = Object.keys(hashDict)
      // In case the dict atleast contains one of the hashtags
      for (let i in hashList) {
        let eachHash = hashList[i]
        if (selectedHashtags.hasOwnProperty(eachHash) && selectedHashtags[eachHash]) {
          return true
        }
      }
      return false
    })
  }
  // If sorting by ascending order, oldest date first
  if (sortType === 2) {
    temp.sort((a, b) => (new Date(a.dateBookedFor) < new Date(b.dateBookedFor) ? -1 : 1))
  }
  // Default sorting by descending order, latest date first
  else {
    temp.sort((a, b) => (new Date(a.dateBookedFor) < new Date(b.dateBookedFor) ? 1 : -1))
  }
  callBack(temp)
}

export const capitalizeFirstLetter = (str, locale = navigator.language) => {
  return str.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale))
}

export const getStringDate = (dateVal) => {
  var today = new Date(dateVal)
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  return `${dd}${mm}${yyyy}`
}
