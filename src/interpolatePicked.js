export default (...picked) => (a, b, interpolate) => {
  const a_picked = {}, b_picked = {}
  for (let i = 0; i < picked.length; i++) {
    a_picked[picked[i]] = a[picked[i]]
    b_picked[picked[i]] = b[picked[i]]
  }
  const interpolate_t = interpolate(a_picked, b_picked)
  return t => ({ ...b, ...interpolate_t(t) })
}
