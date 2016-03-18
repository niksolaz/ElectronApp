
var Navbar = require('navbar.js');
function seeEvent(){
  return (
    <Navbar />
    <div class="jumbotron">
      <h1>ElectronApp</h1>
      <ul class="list-group">
        <li class="list-group-item">No Upcoming Events</li>
      </ul>
    </div>
  );
}

export seeEvent;
