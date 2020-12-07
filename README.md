# Season of Serverless - Challenge Week 3

This repository contains the solution for the Season of Serverless Challenge week 3 aka "The Longest Kebab" via Azure Functions in TypeScript

## Solution Components

The solution is a simple Azure Function that provides a GET endpoint. Based on the query parameter `weightingrams` (which is the weight of the ground lamb in grams) the function calcuates:

* The number of servings
* The length of the kebab three variants depending on the diameter of the kebab)
* The recipe for the kebab

## Internal Design

* The calculation of the serving is based on the [recipe](https://www.thespruceeats.com/adana-kebab-4164647) provided in the challenge description. The base unit is 453 grams of ground lamb which delivers 4 servings
* The length of the kebab is calculated based on the following assumptions:
  * The average density of ground lamb is 0.96 g/ml (comparable to beef). With this information we can calulate the volume of the lamb (we neglect the volume added by the other ingredients)
  * We assume the basic geometric form of kebab is a cylinder so the volume is  V = r² * h * 𝜋. Consequently we can calculate the length as a variable of the radius.
  * We calculate the length of the kebab in cm for 3 possible diameters (3, 6 and 9 cm)
* The evaluation of the recipe is also based on the values given [here](https://www.thespruceeats.com/adana-kebab-4164647)

## How to execute

You can run the functions locally via `npm run start`. Several HTTP calls are available in the file `requests.http` (required: [REST CLient extension in VSCode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))
