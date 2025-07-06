// Binary Search Animation Steps
export function getBinarySearchSteps(arr, target) {
  const steps = [];
  let low = 0;
  let high = arr.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ low, mid, high, foundIndex: null });

    if (arr[mid] === target) {
      foundIndex = mid;
      steps.push({ low, mid, high, foundIndex });
      break;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    steps.push({ low, mid: null, high: null, foundIndex: -1 });
  }

  return steps;
}

// Breadth-First Search (BFS) Animation Steps
export function getBFSSteps(adj, start = 0) {
  const steps = [];
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      steps.push([...visited]);
      (adj[node] || []).forEach(neigh => {
        if (!visited.has(neigh)) queue.push(neigh);
      });
    }
  }

  return steps;
}

// … existing code above …


// NEW — BFS Tree Steps (animation)
export function getBFSTreeSteps(adjList) {
  const visited = new Set();
  const steps = [];
  const queue = [];

  function enqueue(start) {
    visited.add(start);
    queue.push(start);
    steps.push({ currentNode: start, visited: Array.from(visited), queue: [...queue] });
  }

  for (const k in adjList) {
    const start = +k;
    if (!visited.has(start)) {
      enqueue(start);
      while (queue.length) {
        const u = queue.shift();
        for (const v of adjList[u] || []) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
            steps.push({
              currentNode: v,
              visited: Array.from(visited),
              queue: [...queue],
            });
          }
        }
      }
    }
  }

  return steps;
}

// NEW — Build BFS Forest (for layout)
export function buildBFSTree(adjList) {
  const visited = new Set();
  const forest = [];

  for (const k in adjList) {
    const root = +k;
    if (!visited.has(root)) {
      const children = [];
      const queue = [root];
      visited.add(root);

      let i = 0;
      while (i < queue.length) {
        const u = queue[i++];
        for (const v of adjList[u] || []) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
            children.push({ parent: u, value: v });
          }
        }
      }

      // Convert flat parent-child into tree structure
      const nodes = { [root]: { value: root, children: [] } };
      children.forEach(({ parent, value }) => {
        nodes[value] = { value, children: [] };
        nodes[parent].children.push(nodes[value]);
      });
      forest.push(nodes[root]);
    }
  }

  return forest;
}


// Depth-First Search (DFS) — Simple visited set animation
export function getDFSSteps(adj, start = 0) {
  const steps = [];
  const visited = new Set();

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);
    steps.push([...visited]);
    for (const neigh of adj[node] || []) {
      if (!visited.has(neigh)) dfs(neigh);
    }
  }

  dfs(start);
  return steps;
}

// ✅ DFS Recursion Tree — Steps with full forest traversal
export function getDFSTreeSteps(adjList) {
  const visited = new Set();
  const steps = [];
  const stack = [];

  function dfs(node) {
    visited.add(node);
    stack.push(node);

    steps.push({
      currentNode: node,
      visitedNodes: Array.from(visited),
      callStack: [...stack],
      backtrack: false
    });

    for (const neighbor of adjList[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    steps.push({
      currentNode: node,
      visitedNodes: Array.from(visited),
      callStack: [...stack],
      backtrack: true
    });

    stack.pop();
  }

  for (const node in adjList) {
    const num = +node;
    if (!visited.has(num)) {
      dfs(num);
    }
  }

  return steps;
}

// ✅ Build DFS Recursion Forest (multiple trees if disconnected)
export function buildDFSTree(adjList) {
  const visited = new Set();
  const forest = [];

  function dfs(node) {
    visited.add(node);
    const children = [];
    for (const neigh of adjList[node] || []) {
      if (!visited.has(neigh)) {
        children.push(dfs(neigh));
      }
    }
    return { value: node, children };
  }

  for (const node in adjList) {
    const num = +node;
    if (!visited.has(num)) {
      forest.push(dfs(num));
    }
  }

  return forest;
}

