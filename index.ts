import { node, sets } from "./types";

function createTree() {
  let Nodes: node[] = [];

  let startNode: node = {
    setIndex: -2,
    charIndex: -2,
    sets: [false, false, false],
    charNumber: 0,
    nextNodes: [],
    name: "start",
    finalState: false
  };

  Nodes.push(startNode);

  for (let i = 0; i < Nodes.length; i++) {
    const node = Nodes[i];
    const rawNextNodes = getNextNodes(node);
    Nodes[i].nextNodes = replaceEquivalentEntriesFromSource(rawNextNodes, Nodes, equivalentNodes).map(node => node.name);
    Nodes = Nodes.concat(rawNextNodes.filter(node => !Nodes.some(existingNode => equivalentNodes(node, existingNode))));
    console.log(i);
  }

  return Nodes;
}

function NodeToString(node: node) {
  let string = ""
  string += sets[node.setIndex][node.charIndex]
  string += "S"
  node.sets.forEach((bool) => string += bool ? "1" : "0")
  string += "C"
  string += node.charNumber.toString()
  return string
}

function getNextNodes(node: node) {
  return sets.flatMap((set, setIndex) => {
    return set
      .split("")
      .map((_, charIndex) => {
        const newNode: node = {
          setIndex: 0,
          charIndex: 0,
          name: "",
          sets: [],
          charNumber: 0,
          nextNodes: [],
          finalState: false
        }
        Object.assign(newNode.sets, node.sets)
        newNode.charIndex = charIndex
        newNode.setIndex = setIndex
        newNode.charNumber = (node.charNumber + 1) < 8 ? node.charNumber + 1 : 8
        newNode.sets[setIndex] = true
        newNode.name = NodeToString(newNode)
        newNode.finalState = isFinalState(newNode)
        return newNode
      })
      .filter((_, charIndex)  => !(
        node.setIndex == setIndex &&
        Math.abs(node.charIndex - charIndex) == 1
      ))
  });
}

function isFinalState(newNode: node): boolean {
  return newNode.sets.every(value => value) &&
    newNode.charNumber >= 8;
}

function replaceEquivalentEntriesFromSource<T>(target: T[], source: T[], equivalentsCheck: (target: T, source: T) => boolean) {
  return target.map(targetEntry => {
    const index = source.findIndex(sourceEntry => equivalentsCheck(targetEntry, sourceEntry))
    if (index != -1) {
      return source[index]
    }
    return targetEntry
  })
}

function equivalentNodes(node1: node, node2: node) {
  const sameArray = (array1: Boolean[], array2: Boolean[]) => (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index];
    })
  return (
    node1.charIndex == node2.charIndex &&
    node1.charNumber == node2.charNumber &&
    node1.setIndex == node2.setIndex &&
    sameArray(node1.sets, node2.sets))
}

const result = createTree()

await Bun.write("output.json", JSON.stringify(result, undefined, 2));
