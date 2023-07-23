import Jimp from 'jimp';
import fs from 'fs';

// Function to convert a single pixel to a number between -1 and 1
function pixelToNumber(pixel) {
  const { r, g, b } = Jimp.intToRGBA(pixel);

  // Normalize RGB components to a range of 0 to 1
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  // Map normalized values to the range -1 to 1
  const mappedR = (normalizedR - 0.5) * 2;
  const mappedG = (normalizedG - 0.5) * 2;
  const mappedB = (normalizedB - 0.5) * 2;

  // Calculate the average value to represent the overall brightness of the color
  const averageValue = (mappedR + mappedG + mappedB) / 3;

  return averageValue;
}

// Function to convert the image to an array of numbers between -1 and 1
async function imageToNumberArray(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    const width = image.getWidth();
    const height = image.getHeight();

    const numberArray = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = image.getPixelColor(x, y);
        const numberValue = pixelToNumber(pixel);
        numberArray.push(numberValue);
      }
    }

    return numberArray;
  } catch (error) {
    console.error('Error processing the image:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

const imagePath = 'training/';

async function processImages() {
  try {
    const imageFiles = fs.readdirSync(imagePath).filter(
      (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );

    const data = [];

    for (const file of imageFiles) {
      try {
        const numberArray = await imageToNumberArray(imagePath + file);
        data.push(numberArray);

        // Wait 1 second before processing the next image
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error processing image:', file, error);
      }
    }

    fs.writeFileSync('trainingRes/data.json', JSON.stringify(data), 'utf8');
    console.log('All images processed successfully.');
  } catch (error) {
    console.error('Error while processing images:', error);
  }
}

processImages();
