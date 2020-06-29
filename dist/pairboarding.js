// Write a function, longest_common_substring(str1, str2) that takes two strings and returns the longest common substring. A substring is defined as any consecutive slice of letters from another string.

// Bonus: solve it in O(m * n) using O(m * n) extra space. (Hint: the solution involves dynamic programming which will be introduced later in the course.)



// racecar 

// racecardriver

// i = 0  j = 4

// racecar    racecar

// long = racecar

let lCS = (str1, str2) => {
  let shortestRef = str1.length > str2.length ? str2 : str1;
  let longestRef = str1.length > str2.length ? str1 : str2;

  let longestWord = "";

  for(let i = 0; i < shortestRef.length - 1; i += 1) {
    for (let j = i + 1; j <= shortestRef.length; j += 1) {
      if (longestRef.includes(shortestRef.slice(i, j + 1)) ) {
        if (shortestRef.slice(i, j + 1).length > longestWord.length) {
          longestWord = shortestRef.slice(i, j + 1)
        }
        
      }
    }
  }

  return longestWord;
}

console.log(lCS('carrace', 'racecar'))