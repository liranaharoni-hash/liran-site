const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");
const path = require("path");

async function processPhoto() {
  const inputPath = path.join(__dirname, "../public/images/liran-portrait.jpg");
  const outputPath = path.join(__dirname, "../public/images/liran-cutout.png");

  console.log("Removing background...");
  const blob = await removeBackground(inputPath);
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log("Done! Saved to", outputPath);
}

processPhoto();
