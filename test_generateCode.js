function generateCode(numberCount, charCount) {
    const numbers = "0123456789";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let result = [];

    // Ambil angka random
    for (let i = 0; i < numberCount; i++) {
        result.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    // Ambil huruf random
    for (let i = 0; i < charCount; i++) {
        result.push(letters[Math.floor(Math.random() * letters.length)]);
    }

    // Acak posisi (Fisher-Yates Shuffle)
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join("");
}

// Test cases
console.log("Testing generateCode(3, 2):");
for (let i = 0; i < 5; i++) {
    const code = generateCode(3, 2);
    const numCount = (code.match(/\d/g) || []).length;
    const charCount = (code.match(/[A-Z]/g) || []).length;
    console.log(`Code: ${code}, Length: ${code.length}, Numbers: ${numCount}, Chars: ${charCount}`);

    if (code.length !== 5 || numCount !== 3 || charCount !== 2) {
        console.error("FAIL: Incorrect counts");
        process.exit(1);
    }
}
console.log("PASS: All tests passed for (3, 2)");

console.log("\nTesting generateCode(1, 4):");
for (let i = 0; i < 5; i++) {
    const code = generateCode(1, 4);
    const numCount = (code.match(/\d/g) || []).length;
    const charCount = (code.match(/[A-Z]/g) || []).length;
    console.log(`Code: ${code}, Length: ${code.length}, Numbers: ${numCount}, Chars: ${charCount}`);

    if (code.length !== 5 || numCount !== 1 || charCount !== 4) {
        console.error("FAIL: Incorrect counts");
        process.exit(1);
    }
}
console.log("PASS: All tests passed for (1, 4)");
