var ProfileBox = React.createClass({
  getInitialState: function() {
    return {
      user: {
        user: {
          profile: {}
        },
        meta: {}
      }
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(user) {
        this.setState({
          user: user
        });
      }.bind(this),
      error: function() {
        alert("데이터 통신에 실패했습니다.");
      }
    });
  },
  handleFollowSubmit: function() {
    $.ajax({
      url: '/profiles/follow',
      dataType: 'json',
      data: {user_id: this.state.user.user.id},
      success: function(user) {
        this.setState({
          user: user
        });
      }.bind(this),
      error: function() {
        alert("친구 추가가 실패했습니다.");
      }
    });
  },
  handleUnfollowSubmit: function() {
    var answer = confirm("친한 친구에서 제명합니까?");
    if(answer) {
      $.ajax({
        url: '/profiles/unfollow',
        dataType: 'json',
        data: {user_id: this.state.user.user.id},
        success: function(user) {
          this.setState({
            user: user
          });
        }.bind(this),
        error: function() {
          alert("친구 추가가 실패했습니다.");
        }
      });
    }
  },
  handleRequestSubmit: function() {
    var answer = confirm("정말 만남신청을 하시겠습니까?");
    if(answer) {
      $.ajax({
        url: '/profiles/sendrequest',
        dataType: 'json',
        data: {receiver_id: this.state.user.user.id},
        success: function(user) {
          this.setState({
            user: user
          });
        }.bind(this),
        error: function() {
          alert("만남 신청에 실패했습니다.");
        }
      });
    }
  },
  handleUndoRequestSubmit: function() {
    var answer = confirm("정말 만남신청을 취소하시겠습니까?");
    if(answer) {
      $.ajax({
        url: '/profiles/unsendrequest',
        dataType: 'json',
        data: {receiver_id: this.state.user.user.id},
        success: function(user) {
          this.setState({
            user: user
          });
        }.bind(this),
        error: function() {
          alert("만남 취소에 실패했습니다.");
        }
      });
    }
  },
  render: function() {
    return (
      <div className="ProfileBox mdl-card mdl-shadow--2dp demo-card-square">
        <div className="mdl-card__title mdl-card--expand">
          <img src={this.state.user.user.profile.user_image} width="400" height="400" />
        </div>
        <div className="mdl-card__supporting-text">
          <h4>{this.state.user.user.profile.username}</h4>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <p>email: {this.state.user.user.email}</p>
          <p>point: {this.state.user.user.profile.point}</p>
          <p>region: {this.state.user.user.profile.region}</p>
          <p>interest: {this.state.user.user.profile.interest}</p>
          <p>Introduce: {this.state.user.user.profile.intro}</p>
        </div>
        <ProfileBtnGroup handleFollowSubmit={this.handleFollowSubmit}
          handleUnfollowSubmit={this.handleUnfollowSubmit}
          handleRequestSubmit={this.handleRequestSubmit}
          handleUndoRequestSubmit={this.handleUndoRequestSubmit}
          currentUser={this.state.user.meta.mine}
          following={this.state.user.meta.following}
          request={this.state.user.meta.request}
          accepted={this.state.user.meta.process}
          id={this.state.user.user.id} />
      </div>
    );
  }
});

var ProfileBtnGroup = React.createClass({
  handleFollowSubmit: function() {
    this.props.handleFollowSubmit();
  },
  handleUnfollowSubmit: function() {
    this.props.handleUnfollowSubmit();
  },
  handleRequestSubmit: function() {
    this.props.handleRequestSubmit();
  },
  handleUndoRequestSubmit: function() {
    this.props.handleUndoRequestSubmit();
  },
  render: function() {
    return (
      <div className="mdl-card__actions mdl-card--border profile-card-btn-group">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
          과거이력
        </button>
        <SendMessage id={this.props.id} currentUser={this.props.currentUser} />
        <FollowButton handleUnfollowSubmit={this.handleUnfollowSubmit} handleFollowSubmit={this.handleFollowSubmit} currentUser={this.props.currentUser} following={this.props.following} />
        <MeetingButton handleUndoRequestSubmit={this.handleUndoRequestSubmit} accepted={this.props.accepted} request={this.props.request} handleRequestSubmit={this.handleRequestSubmit} currentUser={this.props.currentUser} />
      </div>
    );
  }
});

var SendMessage = React.createClass({
  render: function() {
    var messageUrl = "/messages/new?id=" + this.props.id;
    if(this.props.currentUser) {
      return (
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
            쪽지보기
        </button>
      );
    }
    else {
      return (
        <a href={messageUrl}>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              쪽지보내기
          </button>
        </a>
      );
    }
  }
});

var FollowButton = React.createClass({
  handleFollowSubmit: function() {
    this.props.handleFollowSubmit();
  },
  handleUnfollowSubmit: function() {
    this.props.handleUnfollowSubmit();
  },
  render: function() {
    if(this.props.currentUser) {
      return (
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          수정하기
        </button>
      );
    }
    else {
      if(this.props.following) {
        return (
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={this.handleUnfollowSubmit}>
            친한친구 해제
          </button>
        );
      }
      else {
        return (
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={this.handleFollowSubmit}>
            친한친구 등록
          </button>
        );
      }
    }
  }
});

var MeetingButton = React.createClass({
  handleRequestSubmit: function() {
    this.props.handleRequestSubmit();
  },
  handleUndoRequestSubmit: function() {
    this.props.handleUndoRequestSubmit();
  },
  render: function() {
    if(this.props.currentUser) {
      return (
        <a href="/">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            만남관리
          </button>
        </a>
      );
    }
    else {
      if(this.props.request && this.props.accepted) {
        return (
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            승낙완료
          </button>
        );
      }
      else if (this.props.request && !this.props.accepted) {
        return (
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            onClick={this.handleUndoRequestSubmit} >
            신청취소
          </button>
        );
      }
      else {
        return (
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            onClick={this.handleRequestSubmit} >
            만남신청
          </button>
        );
      }
    }
  }
});
