import vm from 'node:vm';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const scripts = JSON.parse(input);
let failures = 0;
for (const { name, line, code } of scripts) {
  try {
    new vm.Script(code, { filename: name, lineOffset: Math.max(0, line - 1) });
  } catch (error) {
    console.error(error.stack.split('\n').slice(0, 5).join('\n'));
    failures++;
  }
}
console.log(`JavaScript syntax: ${scripts.length - failures}/${scripts.length} passed`);
process.exitCode = failures ? 1 : 0;
