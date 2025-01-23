import createReturn from './getLabel.js';

// Sample return data (you can modify this as needed)
const testData = {};

async function test() {
    try {
        const result = await createReturn(testData);
        console.log('Response:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

test();