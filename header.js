
var Navbar = require('navbar.js');
function header(){
  return (
    <Navbar />
    <div class="jumbotron">
    <h1>Electron App by Nik Solaz</h1>
    <p><a class="btn btn-success btn-lg" href="#" role="button">Learn more</a></p>
    </div>
  );
}

export header;
