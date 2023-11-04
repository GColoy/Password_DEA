import { node, sets } from "./types";
import * as readline from 'readline';

const json = await Bun.file("output.json").text()
const Nodes: node[] = JSON.parse(json);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Next char: ', (answer) => {
  // Get the char value from the answer
  const char = answer.charAt(0);
  // Do something with the char
  console.log('You entered: ' + char);
  // Close the interface
  rl.close();
});

