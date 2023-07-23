import * as fs from 'fs'

interface Node {
  value: number
  next?: Node
  nextIndex?: number
}
type NodeMap = Node[]
type Footprints = Set<number>

// core
const findLoop = (nums: number[]) => {
  const nodes: NodeMap = []
  nums.forEach((num, i) => {
    nodes[i + 1] = { value: i + 1, nextIndex: num }
  })

  nodes.forEach((node, num, all) => {
    node.next = all[node.nextIndex]
  })

  const footprints: Footprints = new Set()
  const route = []
  let current = nodes[1]
  while (current && !footprints.has(current.value)) {
    footprints.add(current.value)
    route.push(current.value)
    current = current.next
  }

  const last = footprints.has(current.value) ? current.value : 0

  return last === 0 ? route : route.slice(route.findIndex(n => n === last))
}

// input & output
const parse = (inputs: string) =>
  inputs
    .split(/\n/)[1]
    .split(/\s+/g)
    .map(n => parseInt(n))

const format = (nums: number[]) => `${nums.length}\n${nums.join(' ')}`

// main
const input = fs.readFileSync('/dev/stdin', 'utf8')
const nums = parse(input)
const answer = findLoop(nums)
const output = format(answer)

console.log(output)
