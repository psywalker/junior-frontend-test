export const serializeFilter = filter =>
  [
    ...filter.category.map(categoryId => `category[]=${categoryId}`),
    `isNew=${filter.isNew}`,
    `isLimited=${filter.isLimited}`,
    `search=${filter.search}`,
  ].join('&')

export const handleFetch = (queryStr, cb, cbError, fetchDone, state) => {
  const query = state ? `${queryStr}${serializeFilter(state)}` : queryStr
  fetch('/api/' + query)
    .then(res => {
      if (!res.ok || res.status !== 200) {
        cbError && cbError(true)
        throw new Error(`Request failed with status code ${res.status}`)
      }
      return res.json()
    })
    .then(data => {
      cb(data)
      cbError && cbError(false)
      fetchDone && fetchDone(false)
    })
    .catch(err => {
      console.error(err)
      cbError && cbError(true)
      fetchDone && fetchDone(false)
    })
}
