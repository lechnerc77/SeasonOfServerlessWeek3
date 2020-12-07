import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    if (req.query && req.query.weightingrams && +req.query.weightingrams > 0) {
        const weight: number = +req.query.weightingrams

        // Calculate number of servings
        // We assume 453 gram are 4 Servings

        const servings: number = Math.round(weight / 453) * 4

        const meatUnit = +(weight / 453).toFixed(2)

        const onion = `${meatUnit.toFixed(1)} small onions (minced)`

        const garlic = `${(meatUnit * 4).toFixed(1)} cloves garlic (minced)`

        const cumin = `${(meatUnit * 1.5).toFixed(1)} teaspoons ground cumin (divided)`

        const sumac = `${(meatUnit * 1.5).toFixed(1)} teaspoons ground sumac (divided)`

        const salt = `${(meatUnit * 0.5).toFixed(1)} teaspoon salt`

        const pepper = `${(meatUnit * 0.25).toFixed(2)} teaspoon ground black pepper`

        const redpepper = `${(meatUnit * 0.25).toFixed(2)} teaspoon red pepper flakes`

        const water = `${(meatUnit * 2).toFixed(0)} tablespoons water`

        // Calculate  length
        // We assume a cylinder as one portion 
        // we assume the density to by  0.96 g/ml
        // Calculate the volume in liter/dm^3    
        const volumeOfKebap: number = weight / (0.96 * 1000)

        //Diameter: 3cm => radius = 1.5 cm = 0.15 dm
        //*10 to get result in cm    
        const lengthFor3cmDiameter = ((volumeOfKebap / (Math.PI * Math.pow(0.15, 2))) * 10).toFixed(1)

        //Diameter: 6cm => radius = 3 cm = 0.3 dm
        //*10 to get result in cm    
        const lengthFor6cmDiameter = ((volumeOfKebap / (Math.PI * Math.pow(0.3, 2))) * 10).toFixed(1)


        //Diameter: 9cm => radius = 4.5 cm = 0.45 dm
        //*10 to get result in cm    
        const lengthFor9cmDiameter = ((volumeOfKebap / (Math.PI * Math.pow(0.45, 2))) * 10).toFixed(1)

        context.res = {
            status: 200,
            body: {

                "🍽 - Number of servings ": servings,
                "📏 - Length of Kebap (in cm)": [
                    { "Diameter 3 cm": lengthFor3cmDiameter },
                    { "Diameter 6 cm": lengthFor6cmDiameter },
                    { "Diameter 9 cm": lengthFor9cmDiameter }
                ],
                "📜 - Ingredients": [
                    onion,
                    garlic,
                    cumin,
                    sumac,
                    salt,
                    pepper,
                    redpepper,
                    water

                ]

            }
        }

    }

    else {
        context.res = {
            status: 400,
            body: "Please provide a weight in grams"
        }
    }



}

export default httpTrigger