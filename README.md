# BrainFuckInterpreter

Basic add modular (destructive):
```
, > ,
a   b

[-<+>] <
```

Basic add modular (non-destructive):
```
, > , <
a   b

[>>+>+<<<-] >>> [<<<+>>>-] <<
[>>+>+<<<-] >>> [<<<+>>>-] <
[<+>-] <
```

Basic if statement modular:
```
, > , <
a   b

[->-<] >

[ if (a !== b)
  do stuff
  
  return to cell 1
  [-] <->
]

<+

[ else
  do stuff
  
  return to cell 0
  [-]
]
```
