
/*

  This is a BrainFuck Interpreter I made because, well, why not?
  Here's some stuff: http://www.muppetlabs.com/~breadbox/bf/standards.html

*/

// Setup the cells:
var cells = [];
for (var i = 0; i < 9999; i++) {
  cells.push(0);
}
// setup the pointer and some other variables:
var pointer = 0;
var curChar = 0;
var startTime = 0;

// Define the interval:
var interval;

function run(debug) {
  // Set the state to "running" or "debug"
  setState(debug ? "debug" : "running");
  
  // Reset the cells, the pointer, the current character, and set the start time:
  document.getElementById("output").value = "";
  cells = [];
  for (var i = 0; i < 9999; i++) {
    cells.push(0);
  }
  pointer = 0;
  curChar = 0;
  startTime = new Date().getTime();
  
  // Get the code to be run:
  var code = cleanCode(document.getElementById("code").value);
  
  // Print to the console that the code is being run in debug mode:
  if (debug) console.warn("Code is being run in Debug Mode.");
  
  // Check if the code is being run with a delay:
  if (document.getElementById("delay").value !== "" && document.getElementById("delay").value !== "0") {
    interval = setInterval(function() {
      // If the code is being run in debug mode, log some extra information:
      if (debug) logDebug("pre", code);
      // Run a loop of the code:
      loop(code);
      // If the code is being run in debug mode, log some extra information:
      if (debug) logDebug("post", code);
      // Check if finished:
      if (curChar >= code.length) {
        // Finish:
        finish();
      }
    }, Number(document.getElementById("delay").value));
  }
  
  // No delay (instant mode):
  else {
    // Run all loops of the code:
    while (curChar < code.length) {
      loop(code);
    }
    // Finish:
    finish();
  }
}

function stop() {
  // Set the state to "stopped":
  setState("stopped");
  // Clear the interval (if it exists):
  if (interval) clearInterval(interval);
}

function finish() {
  // Set the state to "finished":
  setState("finished", (new Date().getTime()) - startTime);
  // Clear the interval (if it exists):
  if (interval) clearInterval(interval);
  // Log some information:
  console.warn("Finished!");
  console.log("Result:");
  console.log(cells);
  console.log("Pointer: " + pointer);
}

function logDebug(preOrPost, code) {
  switch (preOrPost) {
    // This is before the code is run:
    case "pre":
      console.log("Command (" + curChar + "): \"" + code[curChar] + "\"");
    break;
    // This is the result after the code is run:
    case "post":
      console.log("Result:");
      console.log("New Command (" + curChar + "): \"" + code[curChar] + "\"");
      console.log(cells);
      console.log("Pointer: " + pointer);
      console.log("––––––––––");
    break;
  }
}

function cleanCode(code) {
  var chars = "+-<>.,[]".split("");
  var temp = "";
  for (var i = 0; i < code.length; i++) {
    if (chars.indexOf(code[i]) !== -1) {
      temp += code[i];
    }
  }
  return temp;
}

// Run a single loop of the code:
function loop(code) {
  var ret = act(code, curChar);
  if (ret !== undefined) curChar = ret;
  curChar++;
}

// Perform the action outlined by the current character (">" moves the pointer right, "<" moves it left, etc.)
function act(code, curChar) {
  switch (code[curChar]) {
    // Move the pointer right once:
    case ">":
      pointer++;
    break;
    // Move the pointer left once:
    case "<":
      pointer--;
    break;
    // Increment the cell being pointed to once:
    case "+":
      cells[pointer]++;
      if (cells[pointer] > 255) {
        cells[pointer] = 0;
      }
    break;
    // Deincrement the cell being pointed to once:
    case "-":
      cells[pointer]--;
      if (cells[pointer] < 0) {
        cells[pointer] = 255;
      }
    break;
    // Print the value in the cell being pointed to as an ASCII character:
    case ".":
      document.getElementById("output").value += String.fromCharCode(cells[pointer]);
    break;
    // Take an input and set the value in the cell being pointed to to it:
    case ",":
      if (document.getElementById("input").value !== "") {
        cells[pointer] = document.getElementById("input").value.charCodeAt(0);
        document.getElementById("input").value = document.getElementById("input").value.substring(1, document.getElementById("input").value.length);
      } else {
        cells[pointer] = prompt("Enter a character to be used as an input. Only the first character will be read.").charCodeAt(0) || 0;
      }
      cells[pointer] = cells[pointer] % 256;
    break;
    // Loop if the value in the cell being pointed to is not 0:
    case "]": // We don't actually need to worry about loop openings, only the closings :)
      if (cells[pointer] !== 0) {
        var layer = 1;
        var tempChar = curChar;
        while (tempChar > 0 && layer !== 0) {
          tempChar--;
          if (code[tempChar] === "]") {
            layer++;
          } else if (code[tempChar] === "[") {
            layer--;
          }
        }
        return tempChar;
      }
    break;
  }
}

// Set the state in the time div:
function setState(state, t) {
  var time = document.getElementById("time");
  switch(state) {
    case "running":
      time.innerHTML = "<p>Running...</p>";
    break;
    case "debug":
      time.innerHTML = "<p>Running in Debug Mode...</p>";
    break;
    case "stopped":
      time.innerHTML = "<p>Stopped.</p>";
    break;
    case "finished":
      time.innerHTML = "<p>Finished in " + t + "ms!<br>See the result of the cells and the pointer in the console.</p>"
    break;
  }
}
