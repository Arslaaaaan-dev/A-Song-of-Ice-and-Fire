const fs = require('fs');
const { normalizeManifest: newNormalizeManifest } = require('./normalize.js');
const assert = require('assert');

const testCases = [
  // Case A: array of objects
  {
    input: [
      {path: "A/Aegon's_wars1.png"},
      {path: "A/A (Test).jpg"},
      {path: "/B/Test.png"},
      {path: "./C/Test.png"},
      {filename: "hello.png", folder: "D"}
    ],
    expected: [
      {
        id: "A/Aegon's_wars1.png",
        path: './A/Aegon%27s_wars1.png',
        thumbnail: './A/Aegon%27s_wars1.png',
        name: "Aegon's_wars1",
        folder: 'A'
      },
      {
        id: 'A/A (Test).jpg',
        path: './A/A%20%28Test%29.jpg',
        thumbnail: './A/A%20%28Test%29.jpg',
        name: 'A (Test)',
        folder: 'A'
      },
      {
        id: '/B/Test.png',
        path: './B/Test.png',
        thumbnail: './B/Test.png',
        name: 'Test',
        folder: 'B'
      },
      {
        id: './C/Test.png',
        path: './C/Test.png',
        thumbnail: './C/Test.png',
        name: 'Test',
        folder: 'C'
      },
      {
        id: 'D/hello.png',
        path: './D/hello.png',
        thumbnail: './D/hello.png',
        name: 'hello',
        folder: 'D'
      }
    ]
  },
  // Case B: object mapping folders -> array
  {
    input: {
      "A": ["A/1.png", "A/2.png"],
      "B": [{path: "B/1.png"}, {filename: "2.png"}]
    },
    expected: [
      {
        id: 'A/1.png',
        path: './A/1.png',
        thumbnail: './A/1.png',
        name: '1',
        folder: 'A'
      },
      {
        id: 'A/2.png',
        path: './A/2.png',
        thumbnail: './A/2.png',
        name: '2',
        folder: 'A'
      },
      {
        id: 'B/1.png',
        path: './B/1.png',
        thumbnail: './B/1.png',
        name: '1',
        folder: 'B'
      },
      {
        id: 'B/2.png',
        path: './B/2.png',
        thumbnail: './B/2.png',
        name: '2',
        folder: 'B'
      }
    ]
  },
  // Case A but with string (new behavior support)
  {
    input: [
      "A/1.png",
      {path: "B/2.png"}
    ],
    expected: [
      {
        id: 'A/1.png',
        path: './A/1.png',
        thumbnail: './A/1.png',
        name: '1',
        folder: 'A'
      },
      {
        id: 'B/2.png',
        path: './B/2.png',
        thumbnail: './B/2.png',
        name: '2',
        folder: 'B'
      }
    ]
  }
];

testCases.forEach((tc, i) => {
  const newRes = newNormalizeManifest(tc.input);

  console.log(`Test case ${i}:`);
  console.log('New:', newRes);
  try {
    assert.deepStrictEqual(tc.expected, newRes);
    console.log('✅ Matched expected output!');
  } catch(e) {
    console.error('❌ MISMATCH');
    console.error(e);
    process.exit(1);
  }
});
