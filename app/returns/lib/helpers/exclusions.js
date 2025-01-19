export default function exclusions(orderTags) {
  let noReturn = false
  let alteration = false
  let allowReturn = false

  if(orderTags.includes('no_return')) noReturn = true
  if(orderTags.includes('alteration')) alteration = true
  if(orderTags.includes('allow_return')) allowReturn = true

  return { noReturn, alteration, allowReturn }
}