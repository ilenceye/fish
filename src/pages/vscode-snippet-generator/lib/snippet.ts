import { Value } from '../types';

const indentation = '  ';

export const toSnippet = ({ name, prefix, body }: Value) => {
  const lines = [
    `"${name}": {`,
    `${indentation}"prefix": "${prefix}",`,
    `${indentation}"body": [`,
    toSnippetBody(body),
    `${indentation}]`,
    '}',
  ];

  const snippet = lines.join('\n');

  return snippet;
};

const toSnippetBody = (body = '') => {
  // turn "console.log("Hello")" to "console.log(\"Hello\")""
  body = body.replace(/"/g, `\\"`);

  const newline = body.match('\n');

  if (newline) {
    const bodies = body.split('\n');
    body = bodies.map((b) => `${indentation}${indentation}"${b}"`).join(',\n');
  } else {
    body = `${indentation}${indentation}"${body}"`;
  }

  return body;
};
