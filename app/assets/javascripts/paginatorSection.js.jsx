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
        <ul className="pagination">{temp}</ul>
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
        <li>
          <a href='#'>{this.props.pageNumber}</a>
        </li>
      );
    }
    return (
      <li onClick={this._handleOnClick}>
        <a href='#'>{this.props.pageNumber}</a>
      </li>
    );
  }
});
