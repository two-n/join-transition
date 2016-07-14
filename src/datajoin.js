
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

  const key = options.key != null ? options.key : "id",
        keyTo = options.keyTo != null ? options.keyTo : key,
        keyToFn = typeof options.keyTo === "function" ? keyTo : d => d[keyTo],
        keyFrom = options.keyFrom != null ? options.keyFrom : key,
        keyFromFn = typeof options.keyFrom === "function" ? keyFrom : d => d[keyFrom]

  const groupA = groupBy(A, keyTo),
        groupB = groupBy(B, keyFrom),
        exit = A.filter(a => groupB[keyToFn(a)] == null),
        enter = B.filter(b => groupA[keyFromFn(b)] == null)

  let updating = [], updatedFrom = [],
      updated = B.filter(b => groupA[keyFromFn(b)] != null)

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

  const exitTo = options.exitTo != null ? options.exitTo : Object,
        enterFrom = options.enterFrom != null ? options.enterFrom : Object,
        before = exit.concat(updating).concat(enter.map(enterFrom)),
        after = (exit.map(exitTo)).concat(updated).concat(enter)

  return { before, after, exit, updating, updated, enter }
}
