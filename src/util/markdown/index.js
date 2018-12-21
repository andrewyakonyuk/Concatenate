import emojiPlugin from 'markdown-it-emoji';
import anchorPlugin from 'markdown-it-anchor';
import tocPlugin from 'markdown-it-table-of-contents';
import MarkdownIt from 'markdown-it';
import highlight from './highlight';
import links from './links';
import containers from './containers';

const md = new MarkdownIt({
  highlight,
});
md.use(links, {
  target: '_blank',
  rel: 'noopener noreferrer',
});
md.use(emojiPlugin);
md.use(tocPlugin, {
  includeLevel: [2, 3],
});
md.use(anchorPlugin, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
});
md.use(containers);

export default md;
