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

async function processImage() {
  try {
    const imageFile = 'target.jpg';
    const numberArray = await imageToNumberArray(imageFile);

    const jsonData = JSON.stringify(numberArray, null, 2);

    fs.writeFileSync('res.json', jsonData, 'utf8');
    console.log('Image processed successfully.');
  } catch (error) {
    console.error('Error while processing image:', error);
  }
}

processImage();
