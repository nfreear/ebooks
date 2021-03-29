/**
 *
 * @author Nick.Anon.UK, 04-Nov-2020.
 * @see https://npmjs.com/package/ebook-convert
 * @see https://manual.calibre-ebook.com/generated/en/ebook-convert.html#txt-input-options
 */

const path = require('path')
// const xtend = require('xtend')
const convert = require('ebook-convert')

const SRC_DIR = 'source';
const TEMP_DIR = 'temp';
const DIST_DIR = 'dist';

const DEFAULTS = {
  // Metadata.
  authors: null,
  bookProducer: '"@ndf"',
  // comments: 'COMMENTS', // Description.
  // cover: null, // File or URL.
  language: 'en',
  publisher: '"@ndf"',
  pubdate: new Date().toISOString(),
  series: '@ndf/ebooks',
  // tags: null, // Comma-separated.
  title: null,
  // Debug.
  debugPipeline: true,
  verbose: true,
  // TXT Input Options.
  formattingType: 'markdown',
  inputEncoding: 'utf-8',
  // EPUB Output options.
  epubVersion: 2,
  // preserveCoverAspectRatio: true,
  // PDF Output Options.
  // paperSize: 'a5',
  // pdfDefaultFontSize: null,
  // pdfMarkLinks: true, // Debug.
  // pdfPageNumbers: true,
  // pdfSansFont: 'Arial',

  pageBreaksBefore: '//h:h1',
  chapter: '//h:h1',
  insertBlankLine: true,
  insertBlankLineSize: '1',
  lineHeight: '12',
  marginTop: '50',
  marginRight: '50',
  marginBottom: '50',
  marginLeft: '50'
}

const IF_POEM = {
  title: '"If—"',
  authors: '"Rudyard Kipling"',
  input: path.join(__dirname, '..', SRC_DIR, 'if.md'),
  output: path.join(__dirname, '..', DIST_DIR, 'if.epub'),
}

// see more options at https://manual.calibre-ebook.com/generated/en/ebook-convert.html
const SERENITY_PRAYER = {
  title: '"Serenity Prayer"',
  input: path.join(__dirname, '..', SRC_DIR, 'serenity-prayer.md'), // '.md'
  output: path.join(__dirname, '..', DIST_DIR, 'serenity-prayer.epub'), // '.epub', '.pdf'
  /*
  input: path.join(__dirname, 'example.html'),
  output: path.join(__dirname, 'example.epub'),
  authors: '"Seth Vincent"'
  */
}

const options = { ...DEFAULTS, ...IF_POEM }

console.debug('Options:', options);

/*
* create epub file
*/
convert(options, (err, resp) => {
  if (err) console.log(err)

  console.log(resp)
})

console.debug('OK?');

// End.
