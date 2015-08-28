var ProfileBox = React.createClass({
    getInitialState: function () {
        return {
            user: {
                user: {
                    followings: [],
                    followers: [],
                    profile: {}
                },
                meta: {}
            }
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (user) {
                this.setState({
                    user: user
                });
            }.bind(this),
            error: function () {
                alert("초기 데이터 통신에 실패했습니다.");
            }
        });
    },
    handleFollowSubmit: function () {
        var user = this.state.user.user;
        this.setState({
           user: {
               user: user,
               meta: {
                   following: true
               }
           }
        });
        $.ajax({
            url: '/profiles/follow',
            dataType: 'json',
            data: {user_id: this.state.user.user.id},
            success: function (user) {
                this.setState({
                    user: user
                });
            }.bind(this),
            error: function () {
                alert("팔로우에 실패했습니다.");
            }
        });
    },
    handleUnfollowSubmit: function () {
        var answer = confirm("친한 친구에서 제명합니까?");
        var user = this.state.user.user;
        this.setState({
            user: {
                user: user,
                meta: {
                    following: false
                }
            }
        });
        if (answer) {
            $.ajax({
                url: '/profiles/unfollow',
                dataType: 'json',
                data: {user_id: this.state.user.user.id},
                success: function (user) {
                    this.setState({
                        user: user
                    });
                }.bind(this),
                error: function () {
                    alert("언팔로우에 실패했습니다.");
                }
            });
        }
    },
    handleRequestSubmit: function () {
        var answer = confirm("정말 만남신청을 하시겠습니까?");
        if (answer) {
            $.ajax({
                url: '/profiles/sendrequest',
                dataType: 'json',
                data: {receiver_id: this.state.user.user.id},
                success: function (user) {
                    this.setState({
                        user: user
                    });
                }.bind(this),
                error: function () {
                    alert("만남 신청에 실패했습니다.");
                }
            });
        }
    },
    handleUndoRequestSubmit: function () {
        var answer = confirm("정말 만남신청을 취소하시겠습니까?");
        if (answer) {
            $.ajax({
                url: '/profiles/unsendrequest',
                dataType: 'json',
                data: {receiver_id: this.state.user.user.id},
                success: function (user) {
                    this.setState({
                        user: user
                    });
                }.bind(this),
                error: function () {
                    alert("만남 취소에 실패했습니다.");
                }
            });
        }
    },
    render: function () {
        console.log(this.state.user.meta);
        return (
            <div className="profile-box">
                <div className="image-box">
                    <img src={this.state.user.user.profile.user_image} width="400" height="400"/>

                    <div className="info-box">
                        <div className="basic-info">
                            <img src={this.state.user.user.profile.flag} className="flag"/>
                            <span className="username">{this.state.user.user.profile.username}</span>
                        </div>
                        <p className="intro">{this.state.user.user.profile.intro}</p>
                        <ProfileBtnGroup handleFollowSubmit={this.handleFollowSubmit}
                                         handleUnfollowSubmit={this.handleUnfollowSubmit}
                                         handleRequestSubmit={this.handleRequestSubmit}
                                         handleUndoRequestSubmit={this.handleUndoRequestSubmit}
                                         currentUser={this.state.user.meta.mine}
                                         following={this.state.user.meta.following}
                                         request={this.state.user.meta.request}
                                         accepted={this.state.user.meta.process}
                                         id={this.state.user.user.id}
                                         profile_id={this.state.user.user.profile.id} />
                    </div>
                </div>
                <ProfileContent followingCount={this.state.user.user.followings.length}
                                followersCount={this.state.user.user.followers.length}
                                pointCount={this.state.user.user.profile.point}
                                chinesePoint={this.state.user.user.profile.chinese_point}
                                koreanPoint={this.state.user.user.profile.korean_point}
                                region={this.state.user.user.profile.region}
                                interest={this.state.user.user.profile.interest}/>
            </div>
        );
    }
});

var ProfileBtnGroup = React.createClass({
    handleFollowSubmit: function () {
        this.props.handleFollowSubmit();
    },
    handleUnfollowSubmit: function () {
        this.props.handleUnfollowSubmit();
    },
    handleRequestSubmit: function () {
        this.props.handleRequestSubmit();
    },
    handleUndoRequestSubmit: function () {
        this.props.handleUndoRequestSubmit();
    },
    render: function () {
        return (
            <div className="profile-card-btn-group">
                <MeetingButton handleUndoRequestSubmit={this.handleUndoRequestSubmit} accepted={this.props.accepted}
                               request={this.props.request} handleRequestSubmit={this.handleRequestSubmit}
                               currentUser={this.props.currentUser}/>
                <SendMessage id={this.props.id} currentUser={this.props.currentUser}/>
                <FollowButton handleUnfollowSubmit={this.handleUnfollowSubmit} id={this.props.id}
                              handleFollowSubmit={this.handleFollowSubmit} currentUser={this.props.currentUser}
                              following={this.props.following} profile_id={this.props.profile_id} />
            </div>
        );
    }
});

var SendMessage = React.createClass({
    render: function () {
        var messageUrl = "/messages/new?id=" + this.props.id;
        if (this.props.currentUser) {
            return (
                <button className="sendmsg-btn">
                    Message
                </button>
            );
        }
        else {
            return (
                <a href={messageUrl}>
                    <button className="sendmsg-btn">
                        Message
                    </button>
                </a>
            );
        }
    }
});

var FollowButton = React.createClass({
    handleFollowSubmit: function () {
        this.props.handleFollowSubmit();
    },
    handleUnfollowSubmit: function () {
        this.props.handleUnfollowSubmit();
    },
    render: function () {
        if (this.props.currentUser) {
            var url = '/profiles/' + this.props.profile_id + '/edit';
            return (
                <a href={url}>
                    <button className="modify-btn">
                        수정하기
                    </button>
                </a>
            );
        }
        else {
            if (this.props.following) {
                return (
                    <button className="unfollow-btn" onClick={this.handleUnfollowSubmit}>
                        Unfollow
                    </button>
                );
            }
            else {
                return (
                    <button className="follow-btn" onClick={this.handleFollowSubmit}>
                        Follow
                    </button>
                );
            }
        }
    }
});

var MeetingButton = React.createClass({
    handleRequestSubmit: function () {
        this.props.handleRequestSubmit();
    },
    handleUndoRequestSubmit: function () {
        this.props.handleUndoRequestSubmit();
    },
    render: function () {
        if (this.props.currentUser) {
            return (
                <a href="/">
                    <button className="meeting-btn">
                        만남관리
                    </button>
                </a>
            );
        }
        else {
            if (this.props.request && this.props.accepted) {
                return (
                    <button className="meeting-btn">
                        승낙완료
                    </button>
                );
            }
            else if (this.props.request && !this.props.accepted) {
                return (
                    <button className="meeting-btn"
                            onClick={this.handleUndoRequestSubmit}>
                        신청취소
                    </button>
                );
            }
            else {
                return (
                    <button className="meeting-btn"
                            onClick={this.handleRequestSubmit}>
                        만남신청
                    </button>
                );
            }
        }
    }
});

var ProfileContent = React.createClass({
    render: function () {
        var chinesePoint = this.props.chinesePoint + '%';
        var koreanPoint = this.props.koreanPoint + '%';
        $(document).ready(function () {
            $('.chinese-progress-bar').width(chinesePoint);
            $('.korean-progress-bar').width(koreanPoint);
        });
        return (
            <div className="profileContent">
                <div className="groupTitle">
                    <div className="groupTitleWrapper">
                        <h4>Social Status</h4>
                    </div>
                </div>
                <div className="countersWrapper">
                    <ul>
                        <li>
                            <h1 className="counterUp">{this.props.followersCount}</h1>

                            <p>Followers</p>
                        </li>
                        <li>
                            <h1 className="counterUp">{this.props.followingCount}</h1>

                            <p>Followers</p>
                        </li>
                        <li>
                            <h1 className="counterUp">{this.props.pointCount}</h1>

                            <p>Followers</p>
                        </li>
                        <li>
                            <h1>다이아몬드</h1>
                        </li>
                    </ul>
                </div>
                <div className="progress-group">
                    <div className="progressTitle">
                        <div className="progressTitleWrapper">
                            <h4>Language Skills</h4>
                        </div>
                    </div>
                    <div className="lang-progress-group clearfix">
                        <span>중국어</span>

                        <div className="progress">
                            <div className="chinese-progress-bar progress-bar progress-bar-success">
                            </div>
                        </div>
                    </div>
                    <div className="lang-progress-group clearfix">
                        <span>한국어</span>

                        <div className="progress">
                            <div className="korean-progress-bar progress-bar progress-bar-info">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-group">
                    <div className="groupTitle">
                        <div className="groupTitleWrapper">
                            <h4>Details</h4>
                        </div>
                    </div>
                    <div className="region-group">
                        <p className="title">Region</p>

                        <p className="content">{this.props.region}</p>
                    </div>
                    <div className="interest-group">
                        <p className="title">Interest</p>

                        <p className="content">{this.props.interest}</p>
                    </div>
                </div>
            </div>
        );
    }
});
