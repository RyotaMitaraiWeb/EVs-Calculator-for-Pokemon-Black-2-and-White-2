# EVs calculator for Pokemon Black 2 and White 2

A tool to help you get results without having to fight all the trainers. [Link to tool]()

## How to use

### Top menu
At the top of the page you have a menu with some options to customize your results. You can input the level of your Pokemon (default 5), select your starter (which changes Hugh's starter to the appropriate one), and enable a trade experience boost (1.5). In addition, the button that triggers the calculation is located there. The menu is sticky, meaning it will always be at the top of the viewport.

### Checkboxes
In order to "defeat a Pokemon", all you have to do is check the box before its name (pro-tip: you can click the Pokemon name itself to do that too). Each trainer has been separated by location. 

You are provided with a "Check All" and "Reset" buttons for each location. The former button will check all the boxes in the location, while the latter will uncheck all of them. For locations whose trainers may vary per the version played, there are also buttons available that will only check the fights that can be done within the desired version. For example, the "Check all B2" button for Route 4 (post-Insect Badge) will check only the fights that can be done on Black 2 (such as Colress and the Black 2-exclusive fights).

Once you feel happy with the amount of Pokemon you "KOed", click the "Calculate" button in the top menu, which will lead you to the results and trigger the calculation. The state of the boxes does not reset upon clicking the button, thus you can use this to adjust your "KOed" list in case the amount of experience or the level do not satisfy you.

## What to expect as a result
In addition to all the EVs that the Pokemon would have accumulated by KOing all of the checked Pokemon, the calculator also provides you with the amount of experience it would have received and its level with that amount of experience. Note that all of these vary, depending on the experience group; the tool provides data for all the experience groups.

The formula (in JavaScript) used for calculating experience is as follows:
```javascript
Math.floor((Number((Math.sqrt(X).toFixed(4)))*(X*X))*Z/(Number((Math.sqrt(Y)).toFixed(4))*(Y*Y))+1)

X = opponent level * opponent level + 10
Y = opponent level * user level + 10
Z = Math.floor(Math.floor(opponent yield * opponent level / 5) * 1.5);
```
The `1.5` in `Z` comes from the fact that all fights (minus the Kyurem one) in this tool are Trainer fights.

Any Double fight will award you with only half of the experience. Any _potential_ Double battle is assumed to be a Single battle with each trainer due to it being more optimal experience-wise. Triple and Rotation battles are marked with two asterisks (**) and those award only 1/3 of the usual experience. The tool tries to emulate all of those fights' behavior as well. Kyurem awards 1.5x less experience due to it not being a trainer fight.

There are some limitations with the formula above, as explained below. Due to this, it's important to be cautious with any result you receive from the tool.

## Warnings and limitations
Due to rounding issues, the tool may produce results that are off by one experience point for any Double, Triple, Rotation, or Kyurem fight. This generally only becomes an issue if that result either produces a premature level up or does not cause a level up that would have happened otherwise at any point.

When you "KO" more than one Pokemon, the tool assumes that you are KOing all of your Pokemon in the exact order they appear on the web page. For example, if you want to KO all of Clay and the Route 6's Pokemon, the tool will assume that you KOed the Breeder's Pokemon first, then Krokorok, then Sandslash, then Excadrill. This means that the actual experience may be different from the tool's if those Pokemon are not KOed in that order and you get a level up before facing the last of those.

The tool does not check for 510 EVs, since this is not realistic to achieve in an efficient run. The tool does check if a stat has more than 252 EVs, though.

Not every fight has been tested, mostly due to effort constraints. I will be actively checking the levels to make sure that everything's correct.

## Contributing
When making changes to the CSS file, please do so through the SCSS file. This project uses SASS for a CSS pre-processor.

## Found an error or have a suggestion?
Feel free to contact me with any of those and I will let you know what I am going to do with it.

## License
[MIT](https://choosealicense.com/licenses/mit/)