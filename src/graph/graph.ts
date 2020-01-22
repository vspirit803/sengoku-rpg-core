import data from './graph.json';
const graph: { [key: string]: Array<string> } = data;

const nodes = new Array<{ name: string }>();
const edges = new Array<{ source: string; target: string }>();

for (const eachKey in graph) {
    nodes.push({ name: eachKey });
    for (const eachNode of graph[eachKey]) {
        edges.push({ source: eachKey, target: eachNode });
    }
}

console.log(JSON.stringify(nodes));

console.log(JSON.stringify(edges));
