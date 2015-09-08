var ProfileBox = React.createClass({
    getInitialState: function () {
        return {
            profile: {
                myposts: []
            }
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (res) {
                console.log(res.user);
                this.setState({
                    profile: res.profile
                });
            }.bind(this),
            error: function () {
                alert("초기 데이터 통신에 실패했습니다.");
            }
        });
    },
    handleFollowSubmit: function () {
        $.ajax({
            url: '/profiles/follow',
            dataType: 'json',
            data: { profile_id: this.state.profile.id },
            success: function (res) {
                this.setState({
                    profile: res.profile
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
        //User Posts list mapping
        var myPostArr = this.state.profile.myposts.map(function(post, index) {
            var postURL = "/posts/" + post.id
            return (
                <a href={postURL} className="list-group-item" key={index}>
                    {post.title}
                </a>
            );
        });
        // Profile Edit Btn
        if(this.state.profile.mine_or_not) {
            var profileEditURL = "/profiles/" + this.state.profile.id + "/edit"
            var profileEditBtn = <a href={profileEditURL} className="btn btn-default btn-sm pull-right">프로필 수정</a>
        }
        //Relationship Btn
        if(!this.state.profile.follow_or_not) {
            var relationshipBtn = <a href="#" onClick={this.handleFollowSubmit} className="btn btn-primary btn-sm pull-right">Follow</a>
        }
        else {
            var relationshipBtn = <a href="#" onClick={this.handleUnfollowSubmit} className="btn btn-danger btn-sm pull-right">Unfollow</a>
        }
        return (
            <div className="profile-box container">
                <div className="col-md-3">
                    <div className="leftBox clearfix">
                        <div className="image-box">
                            <img src={this.state.profile.mini_user_image} />
                        </div>
                        <div className="name-section">
                            <h2>{this.state.profile.username}</h2>
                            <h3>{this.state.profile.nation}</h3>
                        </div>
                        <div className="info-section">
                            <p>한국어 능력 : {this.state.profile.korean_point}</p>
                            <p>중국어 능력 : {this.state.profile.chinese_point}</p>
                            <p>레벨(포인트) : {this.state.profile.point}</p>
                            <p>{this.state.profile.intro}</p>
                        </div>
                        <div className="relationship-section">
                            <ul className="list-inline">
                                <li>
                                    <h3>{this.state.profile.followersCount}</h3>
                                    Followers
                                </li>
                                <li>
                                    <h3>{this.state.profile.followingCount}</h3>
                                    Followings
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {relationshipBtn}
                        {profileEditBtn}
                    </div>
                    <div className="row">
                        <div className="postBox">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-header">
                                    작성글 목록
                                </li>
                                {myPostArr}
                                <li className="list-group-item list-group-item-footer">
                                    더 보기
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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