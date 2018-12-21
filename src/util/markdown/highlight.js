import prism from 'prismjs';
import escapeHtml from 'escape-html';

function wrap(code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code);
  }
  return `<pre v-pre class="language-${lang} code-snippet"><code>${code}</code></pre>`;
}

export default function highlight(str, lang) {
  if (!lang) {
    return wrap(str, 'text');
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup';
  }
  if (lang === 'md') {
    lang = 'markdown';
  }
  if (lang === 'ts') {
    lang = 'typescript';
  }
  if (lang === 'py') {
    lang = 'python';
  }
  if (lang === 'c#') {
    lang = 'csharp';
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, 'text');
}
