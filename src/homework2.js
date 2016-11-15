/*
 * Homeworkd 2: 자식 엘레멘트에서 태그 네임을 찾는다
 * Check in index.html:
 * descendant(document.getElementById('first-div'), 'p')
 */
const descendant = (el, tagName, r = []) => Array.from(el.children).reduce((r, el) => {
  if (el.tagName === tagName.toUpperCase()) r.push(el);
  if (el.children.length) descendant(el, tagName, r);
  return r;
}, r);
