interface Node {
  value: number
  visited: boolean
}

type Input = Node[]

// 読み書き
const read = (nodes: number[]): Input =>
  nodes.map(n => ({ value: n - 1, visited: false }))
const write = (nodes: Input) => nodes.map(n => n.value + 1)

// 探索
const find = (nodes: Input, from = 0): Input => {
  const next = nodes[from]
  if (next.visited) {
    return [next]
  }

  return [
    next,
    ...find(
      nodes.map(n => (n.value === from ? { ...n, visited: true } : n)),
      next.value
    ),
  ]
}

export const findLoop = (nodes: number[]) => {
  const graph = read(nodes)
  const loop = find(graph)
  const startValue = loop.find(n => n.visited).value
  const startIndex = loop.findIndex(n => n.value === startValue)

  if (startValue === loop[loop.length - 1].value) {
    return write(loop)
  } else {
    return write(loop.slice(startIndex, -1))
  }
}
