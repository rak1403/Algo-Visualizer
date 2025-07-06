// src/data/algorithmCode.js

export const algorithmCode = {
  'binary-search': `\
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,

  'bfs': `\
vector<int> bfs(const vector<vector<int>>& adj, int start = 0) {
    int n = adj.size();
    vector<bool> visited(n, false);
    queue<int> q;
    vector<int> order;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    return order;
}`,

  'dfs': `\
void dfsUtil(int u, const vector<vector<int>>& adj,
             vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    order.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v]) dfsUtil(v, adj, visited, order);
    }
}

vector<int> dfs(const vector<vector<int>>& adj, int start = 0) {
    int n = adj.size();
    vector<bool> visited(n, false);
    vector<int> order;
    dfsUtil(start, adj, visited, order);
    return order;
}`,
};
