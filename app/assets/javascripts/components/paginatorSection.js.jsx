var PaginatorSection = React.createClass({
  _handleOnClick: function (pageNumber) {
    this.props.onPaginate(pageNumber)
  },
  render: function() {
    if(this.props.totalPages > 1) {
      var temp = [];
      for(var i=1; i < this.props.totalPages + 1; i++ ) {
        temp.push(
          <PaginatorLink pageNumber={i} key={i} currentPage={this.props.currentPage} onPaginatorLinkClick={this._handleOnClick} />
        );
      }
      return (
        <div className="btn-group">{temp}</div>
      );
    }
    else {
      return (<div>&nbsp;</div>);
    }
  }
});


var PaginatorLink = React.createClass({
  _handleOnClick: function (e) {
    e.preventDefault();
    this.props.onPaginatorLinkClick(this.props.pageNumber);
  },
  render: function() {
    if(this.props.currentPage == this.props.pageNumber) {
      return (
        <button className="mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect">
          {this.props.pageNumber}
        </button>
      );
    }
    return (
      <button className="mdl-button mdl-js-button mdl-js-ripple-effect"
        onClick={this._handleOnClick}>
        {this.props.pageNumber}
      </button>
    );
  }
});
