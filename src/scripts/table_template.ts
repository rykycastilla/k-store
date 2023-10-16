import { Language } from '../hooks/language'
import nameFixer from './name_fixer'
import numFixer from './num_fixer'
import TableData from '../classes/TableData'
import { Units } from '../interfaces/units'

const tableStyle = `
:root {
  --margin: 4.86vw;
  --cell-height: calc( ( 100vw - ( var( --margin ) * 2 ) ) / 16 );
  --cell-width: calc( 100% / 16 );
  --font-size: calc( var( --cell-height ) / 3.4 );
}

body {
  padding: var( --margin );
  flex-wrap: wrap;
  align-content: flex-start;
  display: flex;
}

.cell {
  width: calc( var( --cell-width ) * var( --size ) );
  height: var( --cell-height );
  box-shadow: 0px 0px 0px 1px black;
  font-size: var( --font-size );
  font-weight: 800;
  text-align: center;
  line-height: var( --cell-height );
}
`

function tableHeader( date:string, language:Language ): string {
  return `
<div class="cell" style="--size:12">${ language.tableTitle }</div>
<div class="cell" style="--size:4">${ date }</div>
  `
}

function titleSection( language:Language ): string {
  return `
  <div class="cell" style="--size:1">${ language.num }</div>
  <div class="cell" style="--size:3">${ language.article }</div>
  <div class="cell" style="--size:2">${ language.weight }</div>
  <div class="cell" style="--size:2">${ language.price }</div>
  <div class="cell" style="--size:2">${ language.init }</div>
  <div class="cell" style="--size:2">${ language.input }</div>
  <div class="cell" style="--size:2">${ language.output }</div>
  <div class="cell" style="--size:2">${ language.end }</div>
  `
}

function articleRow( index:number, name:string, weight:number, price:number, init:number, input:number, output:number, end:number, unitsData:Units ): string {
  return `
<div class="cell" style="--size:1">${ index }</div>
<div class="cell" style="--size:3">${ nameFixer( name ) }</div>
<div class="cell" style="--size:2">${ numFixer( weight, true ) }${ unitsData.mass }</div>
<div class="cell" style="--size:2">${ numFixer( price, true ) }${ unitsData.currency }</div>
<div class="cell" style="--size:2">${ numFixer( init ) }</div>
<div class="cell" style="--size:2">${ numFixer( input ) }</div>
<div class="cell" style="--size:2">${ numFixer( output ) }</div>
<div class="cell" style="--size:2">${ numFixer( end ) }</div>
  `
}

function tableFooter( totalInput:number, totalOutput:number, earns:number, language:Language, unitsData:Units ): string {
  return `
<div class="cell" style="--size:6">${ language.totalInput }</div>
<div class="cell" style="--size:6">${ language.totalOutput }</div>
<div class="cell" style="--size:4">${ language.earns }</div>
<div class="cell" style="--size:6">${ totalInput }</div>
<div class="cell" style="--size:6">${ totalOutput }</div>
<div class="cell" style="--size:4">${ numFixer( earns, true ) }${ unitsData.currency }</div>
  `
}

function tableTemplate( table:TableData, language:Language, unitsData:Units ): string {
  const { date, totalInput, totalOutput, earns, articles } = table
  const articlesContent: string[] = []
  for( let _this = 0; _this < articles.length; _this++ ) {
    const { name, weight, price, init, input, output, end } = articles[ _this ]
    const newRow: string = articleRow( _this + 1, name, weight, price, init, input, output, end, unitsData )
    articlesContent.push( newRow )
  }
  return `
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <style>${ tableStyle }</style>
  </head>
  <body>
    ${ tableHeader( date, language ) }
    ${ titleSection( language ) }
    ${ articlesContent.join( '\n' ) }
    ${ tableFooter( totalInput, totalOutput, earns, language, unitsData ) }
  </body>
</html>
  `
}

export default tableTemplate