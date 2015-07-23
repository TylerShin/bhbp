var ProfileBox = React.createClass({
  getInitialState: function() {
    return {
      profile: {
        profile: {
          followings: [],
          followers: []
        },
        meta: {}
      }
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(profile) {
        this.setState({
          profile: profile
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
      data: {profile: this.state.profile.profile.id},
      success: function(profile) {
        this.setState({
          profile: profile
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
        data: {profile: this.state.profile.profile.id},
        success: function(profile) {
          this.setState({
            profile: profile
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
        data: {receiver_id: this.state.profile.profile.user_id},
        success: function(request) {
          this.setState({
            profile: request
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
        data: {receiver_id: this.state.profile.profile.user_id},
        success: function(request) {
          this.setState({
            profile: request
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
      <div classNameName="ProfileBox mdl-card mdl-shadow--2dp demo-card-square">
        <div className="mdl-card__title mdl-card--expand">
          <img src={this.state.profile.profile.image} width="400" height="400" />
        </div>
        <div className="mdl-card__supporting-text">
          <h4>{this.state.profile.profile.username}</h4>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <p>{this.state.profile.profile.email}</p>
          <p>등급</p>
          <p>주요 활동지역</p>
          <p>{this.state.profile.profile.intro}</p>
          <p>기타 기술내용들</p>
        </div>
        <ProfileBtnGroup handleFollowSubmit={this.handleFollowSubmit}
          handleUnfollowSubmit={this.handleUnfollowSubmit}
          handleRequestSubmit={this.handleRequestSubmit}
          handleUndoRequestSubmit={this.handleUndoRequestSubmit}
          currentUser={this.state.profile.meta.mine}
          following={this.state.profile.meta.following}
          request={this.state.profile.meta.request}
          accepted={this.state.profile.meta.process} />
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
        <SendMessage currentUser={this.props.currentUser} />
        <FollowButton id={this.props.id} handleUnfollowSubmit={this.handleUnfollowSubmit} handleFollowSubmit={this.handleFollowSubmit} currentUser={this.props.currentUser} following={this.props.following} />
        <MeetingButton handleUndoRequestSubmit={this.handleUndoRequestSubmit} accepted={this.props.accepted} request={this.props.request} handleRequestSubmit={this.handleRequestSubmit} currentUser={this.props.currentUser} />
      </div>
    );
  }
});

var SendMessage = React.createClass({
  render: function() {
    if(this.props.currentUser) {
      return (
      <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          쪽지보기
      </button>
      );
    }
    else {
      return (
      <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          쪽지보내기
      </button>
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
