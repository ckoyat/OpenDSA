//Yijing Wu, fall 2019

$(document).ready(function() {
    "use strict";
    var av_name = "RlRegGramDFACON";
    var av = new JSAV(av_name, {animationMode: "none"});
    var url = "../../../AV/WuChen/Machines/FAtest.jff";
    var RlRegGramDFA = new av.ds.FA({url: url});
    av.displayInit();
    av.recorded();
  });