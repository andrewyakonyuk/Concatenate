export default {};
function isElementInViewport(elDimensions, bottomOffset) {
  return (
    elDimensions.top >= 0
    && elDimensions.left >= 0
    // eslint-disable-next-line
    && elDimensions.bottom <= (window.innerHeight || document.documentElement.clientHeight) - (bottomOffset || 0) &&
    elDimensions.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getWindowBoundingRect() {
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  return { width, height };
}

function generateId() {
  return Date.now().toString();
}

export { isElementInViewport, generateId, getWindowBoundingRect };
