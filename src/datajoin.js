import { defaults, groupBy, reject, partition } from "underscore"

export default (A=[], B=[], options={}) => {
  options = defaults(options, {
    key: "id",
    exitTo: Object,
    enterFrom: Object,
    keyTo: null,
    keyFrom: null,
  })

  const keyTo = options.keyTo != null ? options.keyTo : options.key
  const keyFrom = options.keyFrom != null ? options.keyFrom : options.key

  const groupA = groupBy(A, keyTo)
  const groupB = groupBy(B, keyFrom)

  const exit = reject(A, a => groupB[a[keyTo]] != null)
  let [updated, enter] = partition(B, b => groupA[b[keyFrom]] != null)

  let updating = []
  let updatedFrom = []
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

  return { exit, updating, updated, enter, before, after }
}
