const fs = require('fs');
const path = require('path');

const folder = './';

let iconNames = [];

fs.readdirSync(folder).forEach(file => {
  // Сначала проверять что папки generated нет
  try {
    fs.mkdirSync(folder + 'generated');
  } catch(e) {

  }

  // добавлять только новые, мб еще new Set() нужен, но врятли


  if (/.svg$/.test(file)) {
    let filePath = folder + file;

    iconNames.push(file.replace(/.svg$/, ''))
    //normalizeFill(filePath) // replace on promise ?
    // педеравать контент вместо открытиев файла или -> fs.open fs.write fs.close <-
    let sizes = cutSize(file);
  } else {
  }
});

fs.writeFile(folder + '/generated/names.json', JSON.stringify(iconNames), (err) => {
  if (err) throw err;
});

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

function cutSize(file) {
  fs.readFile(folder + file, 'utf8', (err, content) => {
    if (err) throw err;

    let svgRow = content.match(/^<svg.+>/)[0]; // replace on func regexp with param content | тут сразу до индекса проверка
    let regexp = /(width|height)=(['"])\S*\2/g;
    let entries = svgRow.match(regexp).map(attr => attr.split('=')); // и тут

    let newContent = content.replace(regexp, '');
    svgRow = newContent.match(/^<svg.+>/)[0]
    svgRow = svgRow.replace(/\s+/, ' ')

    newContent = newContent.replace(/<svg.+>/, svgRow);

    console.log(newContent)

    fs.writeFile(folder + file, newContent, (err) => {
      if (err) throw err;
    });




    entries = entries.map(entrie => { // replace on size obj
      return [
        entrie[0],
        entrie[1].replace(/['"]/g, '')
      ]
    });

    let { width, height } = Object.fromEntries(entries);


    let styleRow = () => {
      let result = `.icon_${file.replace(/.\w+$/i, '')} {\n`;

      if (width) {
        result += `  font-size: ${width}px;\n  width: 1em;\n`
      }
      if (height) {
        let relativeHeight = height/width;
        relativeHeight = parseFloat(relativeHeight.toFixed(5)) + 'em';
        result += `  height: ${relativeHeight};\n`
      } else {
        throw new Error("Can't be parsed")
      }

      result += '}\n\n';

      return result;
    };


    // fs.appendFile(folder + 'generated/style.css', styleRow(), (err) => {
    //   if (err) throw err;
    // });

    return {width, height}
  });
}

function compareWidthStyleForSelectors() {

}
