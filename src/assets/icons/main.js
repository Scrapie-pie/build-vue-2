const fs = require('fs');
const path = require('path');

// свойства файла оттуда размер вытягивать

const folder = './';
const iconNames = [];

main();

async function main() {


  try {
    fs.mkdirSync(folder + 'generated');
  } catch(e) {
  }

  fs.readdirSync(folder).forEach(file => {
  let isSvgFile = /.svg$/.test(file);


  if (isSvgFile) {
    //let filePath = folder + file;
    let iconName = file.replace(/.svg$/, '');

    // fs.readFile(folder + 'generated.json', 'utf8', (err, content) => {
    //   let names = JSON.parse(content);
    //   console.log(names)
    // });

    iconNames.push(iconName);
    //normalizeFill(filePath) // replace on promise ?
    // педеравать контент вместо открытиев файла или -> fs.open fs.write fs.close <-
    //let size = cutSize(file);
    //
    //
    //
    //console.log(size)
    //
    // if (size) {
    //   addSizeToCSS(file, null, size.width, size.height);



    svgHandler(file)




  } else {
  }
  });
}



fs.writeFile(folder + '/generated/names.json', JSON.stringify(iconNames), (err) => {
  if (err) throw err;
});

async function svgHandler(file) {
  let size = await cutSize(file);

  if (size) {
    console.log(size.height)
    let cssRow = getSvgCssRow(file, size.width, size.height);

    fs.appendFile(folder + 'generated/style.css', cssRow, (err) => {
      if (err) throw err;
    });
  }
}


function normalizeFill(file) {
  fs.readFile(file, 'utf8', (err, content) => {
    if (err) throw err;

    let getFillRegexp = (value) => new RegExp(
      `fill=(?<q>["'])(?<color>${value})\\k<q>`,
      'g'
    )

    let fills = Array.from(
      content.matchAll(getFillRegexp('\\S*'))
    ).map(found => found[found.length - 1]); // WTF ???

    fills = fills.filter(fill => !(/none/.test(fill)));

    let hasSameColor = !fills.filter(fill => fill !== fills[0]).length;

    if (hasSameColor) {
      let result = content.replace(getFillRegexp(fills[0]), (match, q, color) => {
        return `fill=${q}currentColor${q}`;
      });

      fs.writeFile(file, result, (err) => {
        if (err) throw err;
      });
    } else {

    }
  });
}

function normalizeStroke() {

}

async function cutSize(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(folder + file, 'utf8', (err, content) => {
      if (err) throw err;

      let svgRegexp = /<svg[^>]+>/;
      let svgMatched = content.match(svgRegexp);

      if (!svgMatched) return;

      let svgRow = svgMatched[0];
      let sizeRegexp = /(width|height)=(['"])\S*\2/g;
      let sizeRow = svgRow.match(sizeRegexp);

      if (!sizeRow) return;

      let sizeEntries = sizeRow.map(attr => attr.split('='));
      let newSvgRow = svgRow.replace(sizeRegexp, '');
      let newContent = content
        .replace(svgRow, newSvgRow)
        .replace(/\s{2,}/, ' ');

      let size = Object.fromEntries(sizeEntries.map(entrie => {
        return [entrie[0], entrie[1].replace(/['"]/g, '')]
      }));

      fs.writeFile(folder + file, newContent, (err) => {
        if (err) throw err;
      });

      resolve(size)
    });
  });
}

function getSvgCssRow(svgFile, width, height) {
  let result = `.icon_${svgFile.replace(/.\w+$/i, '')} {\n`;

  if (width) {
    result += `  font-size: ${width}px;\n  width: 1em;\n`
  }

  if (height) {
    let relativeHeight = height/width;
    relativeHeight = parseFloat(relativeHeight.toFixed(5)) + 'em';
    result += `  height: ${relativeHeight};\n`
  }

  result += '}\n\n';

  return result;
}
