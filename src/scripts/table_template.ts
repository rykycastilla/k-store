import TableData from '../classes/TableData'

const tableStyle = `
:root {
  --margin: 4.86vw;
  --cell-height: calc( ( 100vw - ( var( --margin ) * 2 ) ) / 16 );
  --cell-width: calc( 100% / 16 );
  --font-size: calc( var( --cell-height ) / 2.5 );
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

function tableHeader( date:string ): string {
  return `
<div class="cell" style="--size:12">Resumen de Inventario</div>
<div class="cell" style="--size:4">${ date }</div>
  `
}

const titleSection = `
<div class="cell" style="--size:1">No.</div>
<div class="cell" style="--size:3">Artículo</div>
<div class="cell" style="--size:2">Peso</div>
<div class="cell" style="--size:2">Precio</div>
<div class="cell" style="--size:2">Inicio</div>
<div class="cell" style="--size:2">Entrada</div>
<div class="cell" style="--size:2">Salida</div>
<div class="cell" style="--size:2">Final</div>
`

function articleRow( index:number, name:string, weight:number, price:number, init:number, input:number, output:number, end:number ): string {
  return `
<div class="cell" style="--size:1">${ index }</div>
<div class="cell" style="--size:3">${ name }</div>
<div class="cell" style="--size:2">${ weight }Kg</div>
<div class="cell" style="--size:2">${ price }$</div>
<div class="cell" style="--size:2">${ init }</div>
<div class="cell" style="--size:2">${ input }</div>
<div class="cell" style="--size:2">${ output }</div>
<div class="cell" style="--size:2">${ end }</div>
  `
}

function tableFooter( totalInput:number, totalOutput:number, earns:number ): string {
  return `
<div class="cell" style="--size:6">Entrada Total</div>
<div class="cell" style="--size:6">Salida Total</div>
<div class="cell" style="--size:4">Ingreso Bruto</div>
<div class="cell" style="--size:6">${ totalInput }</div>
<div class="cell" style="--size:6">${ totalOutput }</div>
<div class="cell" style="--size:4">${ earns }$</div>
  `
}

function tableTemplate( table:TableData ): string {
  const { date, totalInput, totalOutput, earns, articles } = table
  const articlesContent: string[] = []
  for( let _this = 0; _this < articles.length; _this++ ) {
    const { name, weight, price, init, input, output, end } = articles[ _this ]
    const newRow: string = articleRow( _this + 1, name, weight, price, init, input, output, end )
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
    ${ tableHeader( date ) }
    ${ titleSection }
    ${ articlesContent.join( '\n' ) }
    ${ tableFooter( totalInput, totalOutput, earns ) }
  </body>
</html>
  `
}

export default tableTemplate