const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const icons = requireAll(req).map((i) => {
  return i.match(re)[1];
});

export default icons;
