'use strict';

function checkValidNode({ node, parent, opts }) {
  if (
    !node.value.value
    || /^(https?:)?\/\/.+\./.test(node.value.value)
  ) {
    return false;
  }

  const tag = parent.name.name;
  const attr = node.name.name;

  return opts.attrs.includes(`${tag}:${attr}`);
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
          node.value = t.JSXExpressionContainer(
            t.CallExpression(t.Identifier('require'),
            [t.StringLiteral(`${opts.root || ''}${node.value.value}`)]),
          );
        }
      },
    },
  };
};
