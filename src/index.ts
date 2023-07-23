import * as fs from 'fs'

type Node = number

type Input = Node[]

interface Footprints {
  [key: number]: boolean
}

// 探索
const find = (nodes: Input, from = 1, footprints: Footprints = {}): Input => {
  const next = nodes[from - 1]
  if (footprints[next]) {
    return [next]
  }

  return [next, ...find(nodes, next, { ...footprints, [next]: true })]
}

const findLoop = (nodes: number[]) => {
  const loop = find(nodes)
  const last = loop[loop.length - 1]

  if (last === 0) {
    // 先頭に戻ってループ
    return loop
  } else {
    // 途中のどこかに戻ってループ
    const loopStart = loop.findIndex(n => n === last)
    return loop.slice(loopStart, -1)
  }
}

const parse = (inputs: string) =>
  inputs
    .split(/\n/)[1]
    .split(/\s+/g)
    .map(n => parseInt(n))

const format = (nums: number[]) => `${nums.length}\n${nums.join(' ')}`

const input = fs.readFileSync('/dev/stdin', 'utf8')
const nodes = parse(input)
const answer = findLoop(nodes)
const output = format(answer)

console.log(output)
