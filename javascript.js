
// BRUH.html
// okBOOMER.java

/*

  This is a BrainFuck Interpreter I made because, well, why not?
  Here's some stuff: http://www.muppetlabs.com/~breadbox/bf/standards.html

*/

// setup the "BrainFuck™ Cell Array," which is just fancy talk for "var cells = [9999 cells...];" :)
var cells = [];
for (var i = 0; i < 9999; i++) {
  // whoop whoop we can codeee
  cells.push(0);
}
// the pointer starts at 0. this is arguably the only thing that makes sense in this language:
var pointer = 0;

var curChar = 0;

// not a huge fan of these ("window.onload = function() {}" looks a lot cleaner imo), but hey, doing things different is good for you, right? yes, the answer to that is yes.
window.addEventListener("load", function() {
  // déjà vu...
  document.getElementById("run").addEventListener("click", function() {
    // get the garbage code the user wrote that probably does nothing interesting:
    var code = document.getElementById("code").value;
    var interval = setInterval(function() {
      run(code, code[curChar]);
      console.log(curChar);
      console.log(cells);
      console.log(pointer);
      console.log("---");
      curChar++;
      if (curChar >= code.length) {
        clearInterval(interval);
      }
    }, 200);
  });
});

function doShit(yesThisIsTheNameOfTheVariableSoDealWithIt) {
  // jk im not that mean to myself
}

// do whatever the current character says to do (">" moves the pointer right, "<" moves it left, etc.)
function run(code, curChar) {
  switch (curChar) {
    case ">": // ez
      pointer++;
    break;
    case "<": // ez pz
      pointer--;
    break;
    case "+": // ooo gettin' tougher
      cells[pointer]++;
    break;
    case "-": // alr, alr...
      cells[pointer]--;
    break;
    case ".": // now we talkin'
      document.getElementById("output").value += String.fromCharCode(cells[pointer]);
    break;
    case ",": // ooooo dis is fun!
      cells[pointer] = prompt("Enter a character to be used as an input. Only the first character will be read.").charAt(0);
    break;
    case "]": // we don't actually need to worry about loop openings, only the closings :)
      // do this, thanks :)
    break;
  }
}