
## 0.0.11


* 现在可以配置初始连线
```jsx
const SimpleApp = createContainer({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
  connects: [{ from: 1, to: 2}]
})(App);
```

* 为节点添加连线的时候,如果此连线已存在,则不会再次添加连线