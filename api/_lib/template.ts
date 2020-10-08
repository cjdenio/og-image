import { readFileSync } from "fs";
import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Poppins-Regular.ttf`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Poppins-Bold.ttf`).toString(
  "base64"
);

function getCss(theme: string, fontSize: string) {
  let foreground = "white";
  let headingColor = "white";
  let size = fontSize;
  console.log(theme);

  if (theme === "major") {
    foreground = "white";
    size = "180px";
    headingColor = "#11e38c";
  }
  return `
    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: #262626;
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading, .name {
        font-family: 'Poppins', sans-serif;
        font-size: ${sanitizeHtml(size)};
        font-style: normal;
        color: ${foreground};
    }

    .heading {
        color: ${headingColor};
        font-weight: ${theme == "major" ? "bold" : "regular"};
    }

    .name {
        font-size: 70px;
        font-weight: bold;
        position: absolute;
        top: 200px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    
    .green {
        color: #11e38c;
    }
    
    p {
        margin: 0;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="name"><span class="green">Caleb</span> Denio</div>
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

// function getImage(src: string, width = "auto", height = "225") {
//   return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`;
// }

// function getPlusSign(i: number) {
//   return i === 0 ? "" : '<div class="plus">+</div>';
// }
