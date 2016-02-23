import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('remove declaration from element selector', t => {
    return run(t, 'a{ color: red; width: 100%; } ' +
                  'a{ @remove color; color: blue; }',
                  'a{ width: 100%; } a{ color: blue; }');
});

test('remove declaration from class selector', t => {
    return run(t, '.x{ width: 100%; color: blue; } ' +
                  '.x{ @remove width; width: 50%; }',
                  '.x{ color: blue; } .x{ width: 50%; }');
});

test('remove entire rule', t => {
    return run(t, 'a{ } @remove a; b{ }', 'b{ }');
});

test('dont remove rule below', t => {
    return run(t, '.a{ color:red; } @remove .a; .a{ color: blue; } .b{ }',
                  '.a{ color: blue; } .b{ }');
});

// test('dont remove declaration below', t => {
//     return run(t, 'a{ }', 'a{ }', { });
// });


/* Write tests here

test('does something', t => {
    return run(t, 'a{ }', 'a{ }', { });
});

*/
