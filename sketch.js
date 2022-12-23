const width = window.innerWidth - 40;
const height = window.innerHeight - 40;

let img;
let pixel;
let brightness;
let map;
let slider;
let downsample;
let fetchedImage;
let ascii = " .:-=+*#%@";
let ready = false;

function setup() {
  createCanvas(width, height);
  createFileInput(acceptFile);
  slider = createSlider(1, 20, 10, 1);
}

function draw() {
  downsample = slider.value();
  background(0);
  if (ready) {
    if (img.width != 1) {
      fetchedImage = img.get();
      fetchedImage.width > fetchedImage.height
        ? fetchedImage.resize(width / downsample, 0)
        : fetchedImage.resize(0, height / downsample);
      textSize(downsample);
      fill(255);
      fetchedImage.loadPixels();
      for (j = 0; j < fetchedImage.height; j++) {
        for (i = 0; i < fetchedImage.width; i++) {
          pixel = (i + j * fetchedImage.width) * 4;
          brightness =
            (fetchedImage.pixels[pixel + 0] +
              fetchedImage.pixels[pixel + 1] +
              fetchedImage.pixels[pixel + 2]) /
            3;
          map = map(brightness, 0, 255, 0, ascii.length - 1);
          text(ascii.charAt(map), i * downsample, j * downsample);
        }
      }
      fetchedImage.updatePixels();
    }
  }
}

function acceptFile(file) {
  if (file.type === "image") {
    console.log("valid file type");
    img = loadImage(file.data);
    ready = true;
  } else {
    console.log("fix your file type");
  }
}