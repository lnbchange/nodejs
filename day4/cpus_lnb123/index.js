


var _ = require('lodash');
var ps = require('current-processes');
let blessed = require('blessed') 

function render(){
  ps.get(function(err, processes) {
 
    var sorted = _.sortBy(processes, 'cpu');
    var top5  = sorted.reverse().splice(0, 5);   

    let ylist=top5.map(item=>item.cpu);
    let xlist=top5.map(item=>item.name);
    console.log(xlist);
    var blessed = require('blessed')
    , contrib = require('blessed-contrib')
    , screen = blessed.screen()
    , line = contrib.line(
        { style:
          { line: "yellow"
          , text: "green"
          , baseline: "black"}
        , xLabelPadding: 3
        , xPadding: 5
        , label: 'Title'})
    , data = {
        x:xlist,
        y:ylist
     }
  screen.append(line) //must append before setting data
  line.setData([data])

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.render()
});
}

setInterval(render,1000)

render()