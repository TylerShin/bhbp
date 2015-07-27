var MessageInbox = React.createClass({
  getInitialState: function() {
    return {
      didFetchData: false,
      messages: {
        messages: []
      },
      meta: {},
      fetchData: {
        page: 1
      }
    }
  },
  _fetchMessages: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: this.state.fetchData,
      success: this._fetchDataDone,
      error: this.__fetchDataFail
    });
  },
  _fetchDataDone: function(data, textStatus, jqXHR) {
    this.setState({
      didFetchData: true,
      messages: data,
      meta: data.meta
    });
  },
  _handleOnPaginate: function(pageNumber) {
    this.state.fetchData.page = pageNumber;
    this._fetchMessages();
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(messages) {
        this.setState({
          didFetchData: true,
          messages: messages,
          meta: messages.meta
        });
      }.bind(this),
      error: function() {
        alert("통신...실패...");
      }
    });
  },
  handleNewClick: function(id) {
    var page = this.state.fetchData.page;
    $.ajax({
      url: '/messages/read',
      dataType: 'json',
      data: {id: id},
      success: function(messages) {
        this._handleOnPaginate(page);
      }.bind(this),
      error: function() {
        alert('Failed...');
      }
    });
  },
  handleDelete: function(id) {
    var answer = confirm("정말 메시지를 삭제하시겠습니까?");
    if(answer) {
      var page = this.state.fetchData.page;
      $.ajax({
        url: '/messages/' + id,
        dataType: 'json',
        type: 'DELETE',
        success: function(messages) {
          this.setState({messages: messages});
          this._handleOnPaginate(page);
        }.bind(this),
        error: function() {
          alert("삭제실패");
        }
      });
    }
  },
  render: function () {
    var self = this;
    var Messageitem = this.state.messages.messages.map(function(m) {
      return (
        <MessageItems message={m.message} id={m.id} key={m.id}
          readOrNot={m.read_or_not} sender_id={m.sender_id}
          handleNewClick={self.handleNewClick}
          handleDelete={self.handleDelete} />
      );
    });
    return (
      <div>
        <ul className="messageInbox">
          {Messageitem}
        </ul>
        <PaginatorSection totalPages={this.state.meta.total_pages}
          currentPage={this.state.meta.current_page}
          onPaginate={this._handleOnPaginate} />
      </div>
    );
  }
});

var MessageItems = React.createClass({
  getInitialState: function() {
    return {
      visible: false
    }
  },
  handleClick: function() {
    this.setState({visible: !this.state.visible});
  },
  handleNewClick: function() {
    this.setState({visible: !this.state.visible});
    this.props.handleNewClick(this.props.id);
  },
  handleDelete: function(id) {
    this.props.handleDelete(id);
  },
  render: function() {
    if(this.state.visible) {
      return (
        <li className="message-item">
          <div className="message-title" onClick={this.handleClick}>
            {this.props.message.substring(0, 10) + "..."}
          </div>
          <ContentBox message={this.props.message} id={this.props.id}
            handleDelete={this.handleDelete} sender_id={this.props.sender_id} />
        </li>
      );
    }
    else {
      if(this.props.readOrNot) {
        return (
          <li className="message-item">
            <div className="message-title" onClick={this.handleClick}>{this.props.message.substring(0, 10) + "..."}</div>
          </li>
        );
      }
      else {
        return (
          <li className="message-item">
            <span className="mdl-badge message-title" data-badge="new" onClick={this.handleNewClick}>{this.props.message.substring(0, 10) + "..."}</span>
          </li>
        );
      }
    }
  }
});

var ContentBox = React.createClass({
  handleDelete: function() {
    this.props.handleDelete(this.props.id);
  },
  render: function() {
    var url = '/messages/new?id='+this.props.sender_id;
    return (
      <div className="contentBox">
        {this.props.message}
        <div className="btn-group">
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect
            button mdl-button--primary" onClick={this.handleDelete}>
            삭제하기
          </button>
          <a href={url}>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
              답장하기
            </button>
          </a>
        </div>
      </div>
    );
  }
});
