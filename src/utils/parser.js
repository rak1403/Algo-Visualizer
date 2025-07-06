
// For Binary Search: “1,3,5,7” → [1,3,5,7]
export function parseBinarySearchInput(raw) {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(s => s !== '')
    .map(Number);
}

// For BFS/DFS: lines “u v” → adjacency list object
export function parseGraphInput(raw) {
  const edges = raw
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .map(line => {
      const [u, v] = line.split(/\s+/).map(Number);
      return [u, v];
    });

  const adj = {};
  edges.forEach(([u, v]) => {
    if (!adj[u]) adj[u] = [];
    if (!adj[v]) adj[v] = [];
    adj[u].push(v);
    adj[v].push(u); // assume undirected
  });
  return adj;
}

// For Prim’s/Kruskal’s: lines “u v w” → list of edges
export function parseWeightedGraphInput(raw) {
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .map(line => {
      const [u, v, w] = line.split(/\s+/).map(Number);
      return { u, v, w };
    });
}

// Convert flat edges into adjacency list: { node: [{v, w}, …], … }
export function toWeightedAdjList(edgeList) {
  const adj = {};
  edgeList.forEach(({ u, v, w }) => {
    if (!adj[u]) adj[u] = [];
    if (!adj[v]) adj[v] = [];
    adj[u].push({ v, w });
    adj[v].push({ v: u, w });  // undirected
  });
  return adj;
}

// Count distinct nodes
export function countNodesFromEdges(edgeList) {
  const nodes = new Set();
  edgeList.forEach(({ u, v }) => {
    nodes.add(u);
    nodes.add(v);
  });
  return nodes.size;
}
