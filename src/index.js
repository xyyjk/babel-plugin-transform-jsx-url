const path = require('path');

function checkValidNode({ node, parent, opts }) {
  try {
    if (
      !/^(https?:)?\/\/.+\./.test(node.value.value)
      && !/^data:image\/.+;base64,/.test(node.value.value)
    ) {
      const tag = parent.name.name;
      const attr = node.name.name;

      return opts.attrs.includes(`${tag}:${attr}`);
    }
  } catch (error) {}

  return false;
}

module.exports = function({ types: t }) {
  return {
    name: 'transform-jsx-url',
    visitor: {
      JSXAttribute({ node, parent }, { opts }) {
        if (
          !t.isJSXExpressionContainer(node.value)
          && checkValidNode({
            node, parent,
            opts: { attrs: ['img:src', 'link:href'], ...opts },
          })
        ) {
          const url = path.join((opts.root || ''), node.value.value);
          node.value = t.JSXExpressionContainer(
            t.CallExpression(t.Identifier('require'),
            [t.StringLiteral(url)]),
          );
        }
      },
    },
  };
};
