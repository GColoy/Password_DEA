import { node, sets } from "./types";

const json = await Bun.file("output.json").text()
const Nodes: node[] = JSON.parse(json);

const NodeNames = Nodes.map(node => node.name).join(",1\n")+",1"
const NodeConnections = Nodes.flatMap(node => node.nextNodes.map(nextNode => [node.name, nextNode])).map(connection => connection[0] + "," + connection[1]).join("\n")

await Bun.write("NodeNames.csv", NodeNames)
await Bun.write("NodeConnections.csv", NodeConnections)