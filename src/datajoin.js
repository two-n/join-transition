
const groupBy = (collection, accessor) => {
  const byValue = {}
  if (accessor != null && typeof accessor !== "function") {
    const key = accessor
    accessor = d => d[key]
  }
  for (let i = 0; i < collection.length; i++) {
    const value = accessor ? accessor(collection[i]) : collection[i]
    byValue[value] = (byValue[value] || []).concat(collection[i])
  }
  return byValue
}

export default (A=[], B=[], options={}) => {
  options = Object.assign({
    key: "id",
    exitTo: Object,
    enterFrom: Object,
    keyTo: null,
    keyFrom: null,
  }, options)

  const keyTo = options.keyTo != null ? options.keyTo : options.key,
        keyFrom = options.keyFrom != null ? options.keyFrom : options.key

  const groupA = groupBy(A, keyTo),
        groupB = groupBy(B, keyFrom),
        exit = A.filter(a => groupB[a[keyTo]] == null),
        enter = B.filter(b => groupA[b[keyFrom]] == null)

  let updating = [], updatedFrom = [],
      updated = B.filter(b => groupA[b[keyFrom]] != null)

  for (let bIndex = 0; bIndex < updated.length; bIndex++) {
    const b = updated[bIndex],
          group = groupA[b[keyFrom]]
    for (let aIndex = 0; aIndex < group.length; aIndex++) {
      const a = group[aIndex]
      updating.push(a)
      updatedFrom.push(b)
    }
  }
  updated = updatedFrom

  const before = exit.concat(updating).concat(enter.map(options.enterFrom))
  const after = (exit.map(options.exitTo)).concat(updated).concat(enter)

  return { before, after, exit, updating, updated, enter }
}
