
Bormand did a really great job deobfuscating the Toledo Javascript Chess Game,
but I wanted to take it a step further and refactored all the global variables to more clearly reflect their usage.

File toledo_javascript_chess_3.html was chosen because it does not require
external images.

See project's wiki for some info on the board:
https://github.com/bormand/nanochess/wiki

Original source code borrowed from this site:
http://www.nanochess.org/chess4.html

**modularized1** was my first attempt at making a requirejs AMD module out of the code using a "class"
But for some reason some variables are not updated properly and it is **not working right**.
So I restarted the attempt staying closer to the original code.

And that is:
**modularized2**
**This works right** as far as I can tell.

The idea here is to separate the logic from the presentation and make the AI reusable.
