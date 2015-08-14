<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=us-ascii">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DataTables example - Zero configuration</title>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.8/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="http://datatables.net/release-datatables/extensions/ColVis/css/dataTables.colVis.css">
<link rel="stylesheet" type="text/css" href="https://datatables.net/release-datatables/extensions/ColReorder/css/dataTables.colReorder.css">
<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/plug-ins/1.10.8/integration/jqueryui/dataTables.jqueryui.css">

<style type="text/css" class="init">
tfoot input {
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
}
</style>

<style id="jsbin-css">


td.highlight {
    background-color: whitesmoke !important;
}

.content{
  font-size: 0.9em;
  font-size: 1.1vw;
}
@media screen and (min-width: 1300px) {
    .content {
	font-size: 0.9em;
    }
}
@media screen and (max-width: 920px) {
    .content {
	font-size: 0.7em;
    }
}

#header{
//     font-size:0.7em;
}

.topWrapper{
  height: 600px;
  width: 99%;

  margin-top:1%;
  margin-left:1%;
  margin-right:1%;
  margin-bottom:0%;

  border:1px solid #0033CC;
}
.topWrapper div{
  width: 50%;
  overflow: auto;
}

.vsplitbar {
  width: 4px;
  background: #cab;
}
.leftDiv{
  background: #FAFAFA;
  max-width: 400px;
}
.rightDiv{
  overflow: auto;
}


.lowerDiv{
  clear:both;
  height:50%;
  width:96%;
  margin-top:1%;
  margin-left:2%;
  margin-right:2%;
}
.topWrapper .vsplitbar {
  width: 10px;
  cursor: e-resize;     /* in case col-resize isn't supported */
  cursor: col-resize;
  background: #0033CC ;
}
.tfoot{
 display: table-header-group;  // https://datatables.net/examples/api/multi_filter.html
}
a.tooltip{
  position: relative;
}
a.tooltip::before {
    content: attr(data-tooltip) ;
    font-size: 12px;
    position:absolute;
    z-index: 999;
    white-space:nowrap;
    bottom:9999px;
    left: 0;
    background:#000;
    color:#e0e0e0;
    padding:0px 7px;
    line-height: 24px;
    height: 24px;
    opacity: 0;
}
a.tooltip:hover::before {
    opacity: 1;
    top:22px;
}
a.tooltip:hover::after {
    content: "";
    opacity: 1;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    z-index: 999;
    position:absolute;
    white-space:nowrap;
    top:17px;
    left: 0px;
}
th.tooltip{
  position: relative;
}
th.tooltip::before {
    content: attr(data-tooltip) ;
    font-size: 12px;
    position:absolute;
    z-index: 999;
    white-space:nowrap;
    bottom:9999px;
    left: 0;
    background:#000;
    color:#e0e0e0;
    padding:0px 7px;
    line-height: 24px;
    height: 24px;
    opacity: 0;
}
th.tooltip:hover::before {
    opacity: 1;
    top:0px;
}
th.tooltip:hover::after {
    content: "";
    opacity: 1;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    z-index: 999;
    position:absolute;
    white-space:nowrap;
    top:17px;
    left: 0px;
}

</style>

<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-1.8.3.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.8/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="http://datatables.net/release-datatables/extensions/ColVis/js/dataTables.colVis.js"></script>
<script type="text/javascript" language="javascript" src="http://datatables.net/release-datatables/extensions/ColReorder/js/dataTables.colReorder.js"></script>
<script type="text/javascript" language="javascript" src="http://tablefilter.free.fr/TableFilter/tablefilter.js"></script>
<script type="text/javascript" language="javascript" src="http://methvin.com/splitter/splitter.js"></script>
<script type="text/javascript" class="init">

$().ready(function() {
	$(".topWrapper").splitter();
});


/* Custom filtering function which will search data in column four between two values */
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var selection= $('#globalSelectionMI').val();
	var result=1;
        if (selection.length>0) {
            result=eval(selection);
	}
        console.log("Selection" + selection+"\t"+dataIndex+ "\t"+result);
        return result;
    }
);

$(document).ready( function () {
  var lastIdx = null;
  //
  $('#runTable tfoot th').each( function () {
    var title = $('#runTable').eq( $(this).index() ).text();
    $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
  } );

  var table =$('#runTable').DataTable( {
    "dom": 'C<"clear">Rlfrtip',
    "scrollY":        1000,
    "scrollCollapse": true,
    "jQueryUI":       true,
    stateSave: true
  } );

  // Apply the search
  table.columns().every( function () {
     // Apply the search using footer selection
     // Inspired by https://datatables.net/examples/api/multi_filter.html
    var that = this;
    $( 'input', this.footer() ).on( 'keyup change', function () {
      that
      .search( this.value )
      .draw();
      console.log(this.value);
    } );
  } );
  $('#runTable tbody')
  .on( 'mouseover', 'td', function () {
    // this part of the code make run figure drawing
    var colIdx = table.cell(this).index().column;
    var rowIdx = table.cell(this).index().row;
    if ( colIdx !== lastIdx ) {
      $( table.cells().nodes() ).removeClass( 'highlight' );
      $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
      var cid = $(this).attr('id');
      var cval = $(this).text();
      var chtml = $(this).html();
      console.log("mouse over cell "+colIdx+" "+rowIdx+" "+cval+""+chtml);
      var c = document.getElementById("canvasDraw");
      var ctx = c.getContext("2d");
      ctx.clearRect ( 0 , 0 , c.width, c.height ); // clears the canvas
      var chtml2=chtml.substring(chtml.lastIndexOf("ref")+5,chtml.lastIndexOf("\""));
      var img = new Image();
      img.src=chtml2;
      c.width = 800; // canvas shrinks to show the whole plot at once
      ctx.drawImage(img,0,0,c.width,c.height);
    }
  } )
  .on( 'mouseleave', function () {
    // make collumn/row highlighted - see
    $( table.cells().nodes() ).removeClass( 'highlight' );
    console.log("mouse leave cell");
    var myCell   = table.cell(this);
    var cellHtml = table.cell(this).html;
    console.log(cellHtml);
  } );
  $('#globalSelectionMI').keyup( function() {
        table.draw();
  } );
  $('.leftDiv')
  .on( 'mouseover', 'a', function () {
    var c = document.getElementById("canvasDraw");
    var ctx = c.getContext("2d");
    ctx.clearRect ( 0 , 0 , c.width, c.height ); // clears the canvas
    var chtml = $(this).attr('href');
    console.log(chtml);
    var img = new Image();
    img.src=chtml;
    c.width = img.width; // canvas fills the whole range in x direction
    ctx.drawImage(img,0,0,c.width,c.height); // image is only compressed in y direction
  });


} );


</script>
</head>
