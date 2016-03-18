
function navbar(){
  return(
    <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <button type="button" class="btn btn-success navbar-btn" href="#">
            <span class="glyphicon glyphicon-calendar" aria-hidden="true">
              Google Calendar
            </span>
          </button>
        </div>
        <div class="col-md-6"></div>
      </div>
      </div>
    </div>
    </nav>
  );
}

export navbar;
