import { node, sets } from "./types";
import * as readline from 'readline';

const json = await Bun.file("output.json").text()
const Nodes: node[] = JSON.parse(json);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Test a password: ', (answer) => {
  console.log("Here we go:");
  let currentNodeIndex = 0;
  let works = true;
  let finalState = false;
  let index = 0;
  let indexTrace: number[] = []
  answer.split("").forEach(char => {
    if (!works) return
    const localIndex = Nodes[index].nextNodes.findIndex(string => string.charAt(0) == char);
    if (localIndex == -1) {
      console.write(" <-- cant insert a " + char + " here")
      works = false
      return
    }
    console.write(char);
    index = Nodes.findIndex(node => node.name == Nodes[index].nextNodes[localIndex])
    finalState = Nodes[index].finalState
    indexTrace.push(index)
  })
  if (!works) console.log("\nThe passwort isn't allwed")
  else if (!finalState) console.log("\nThe password didn't reach a final state")
  else if (works) console.log("\nThe passwort works")
  console.log("Trace:")
  indexTrace.forEach(number => console.log(Nodes[number].name))
  rl.close();
});

