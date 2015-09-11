var ProfileBox = React.createClass({
    getInitialState: function () {
        return {
            profile: {
                myposts: []
            },
            requests: []
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (res) {
                this.setState({
                    profile: res.profile
                });
                $.ajax({
                    url: '/requests_api/ownlist',
                    dataType: 'json',
                    data: { user_id: this.state.profile.userId },
                    success: function(res) {
                        this.setState({
                            requests: res.requests
                        });
                    }.bind(this),
                    error: function() {
                        alert("초기 데이터 통신에 실패했습니다.");
                    }
                });
            }.bind(this),
            error: function () {
                alert("초기 데이터 통신에 실패했습니다.");
            }
        });
    },
    handleFollowSubmit: function() {
        var profState = this.state.profile;
        profState.follow_or_not = true;
        this.setState({
            profile: profState
        });
        $.ajax({
            url: '/profiles/follow',
            dataType: 'json',
            data: { profile_id: this.state.profile.id },
            success: function (res) {
                this.setState({
                    profile: res.profile
                });
            }.bind(this),
            error: function() {
                alert("팔로우에 실패했습니다.");
            }
        });
    },
    handleUnfollowSubmit: function() {
        var confirmation = confirm("팔로우를 취소하시겠습니까?");
        var profState = this.state.profile;
        profState.follow_or_not = false;
        this.setState({
            profile: profState
        });
        if (confirmation) {
            $.ajax({
                url: '/profiles/unfollow',
                dataType: 'json',
                data: { profile_id: this.state.profile.id },
                success: function (res) {
                    this.setState({
                        profile: res.profile
                    });
                }.bind(this),
                error: function() {
                    alert("언팔로우에 실패했습니다.");
                }
            });
        }
    },
    handleRequestSubmit: function () {
        var answer = confirm("정말 만남신청을 하시겠습니까?");
        if (answer) {
            var prof = this.state.profile;
            prof.request_or_not = true;
            this.setState({ profile: prof });
            $.ajax({
                url: '/profiles/sendrequest',
                dataType: 'json',
                data: { receiver_id: this.state.profile.userId },
                success: function (res) {
                    this.setState({
                        profile: res.profile
                    });
                    $.ajax({
                        url: '/requests_api/ownlist',
                        dataType: 'json',
                        data: { user_id: this.state.profile.userId },
                        success: function(res) {
                            this.setState({
                                requests: res.requests
                            });
                        }.bind(this),
                        error: function() {
                            alert("초기 데이터 통신에 실패했습니다.");
                        }
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
            var prof = this.state.profile;
            prof.request_or_not = false;
            this.setState({ profile: prof });
            $.ajax({
                url: '/profiles/unsendrequest',
                dataType: 'json',
                data: { receiver_id: this.state.profile.userId },
                success: function (res) {
                    this.setState({
                        profile: res.profile
                    });
                    $.ajax({
                        url: '/requests_api/ownlist',
                        dataType: 'json',
                        data: { user_id: this.state.profile.userId },
                        success: function(res) {
                            this.setState({
                                requests: res.requests
                            });
                        }.bind(this),
                        error: function() {
                            alert("초기 데이터 통신에 실패했습니다.");
                        }
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
        if(this.state.profile.myposts.length === 0) {
            var myPostArr = <li className="list-group-item">작성한 글이 없습니다.</li>
        } else {
            var myPostArr = this.state.profile.myposts.map(function(post, index) {
                var postURL = "/posts/" + post.id
                return (
                    <a href={postURL} className="list-group-item" key={index}>
                        {post.title}
                    </a>
                );
            });
        }
        // Profile Edit Btn
        if (this.state.profile.mine_or_not) {
            var profileEditURL = "/profiles/" + this.state.profile.id + "/edit"
            var profileEditBtn = <a href={profileEditURL} className="btn btn-default btn-sm pull-right">프로필 수정</a>
        } else {
            //Relationship Btn
            if (!this.state.profile.follow_or_not) {
                var relationshipBtn = <button onClick={this.handleFollowSubmit} className="btn btn-primary btn-sm pull-right">Follow</button>
            } else {
                var relationshipBtn = <button onClick={this.handleUnfollowSubmit} className="btn btn-danger btn-sm pull-right">Unfollow</button>
            }
            if (!this.state.profile.request_or_not) {
                var requestBtn = <button onClick={this.handleRequestSubmit} className="btn btn-sm btn-primary pull-right">만남신청하기</button>
            } else {
                var requestBtn = <button onClick={this.handleUndoRequestSubmit} className="btn btn-sm btn-danger pull-right">만남신청 취소하기</button>
            }
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
                        <div className="action-btn-group">
                            {requestBtn}
                            {relationshipBtn}
                            {profileEditBtn}
                        </div>
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="requestBox">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-header">
                                        최근 받은 만남요청
                                        <a href="#" className="pull-right">관리하기</a>
                                    </li>
                                    <RequestList requests={this.state.requests} />
                                    <li className="list-group-item list-group-item-footer">
                                        더 보기
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="requestBox">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-header">
                                        친한 팔로워들
                                    </li>
                                    <li className="list-group-item">
                                        사진, 국적, 서영진(이름), 포인트(혹은 가입일)
                                    </li>
                                    <li className="list-group-item list-group-item-footer">
                                        더 보기
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var RequestList = React.createClass({
    render: function() {
        var arr = this.props.requests.map(function(request, index) {
            if(request.accepted) {
                var status = <div><p><strong>평점</strong> {request.evaluation.point}</p><p><strong>평가</strong> {request.evaluation.comment}</p></div>
            } else {
                var status = <p>미승낙</p>
            }
            return (
                <li className="list-group-item clearfix" key={index}>
                    <img className="pull-left hidden-xs" src={request.sender_nano_img} />
                    <a href={request.sender_profile_URL} className="username">{request.sender_username}</a>
                    <span className="created-at">{moment(request.created_at).fromNow()} 신청함</span>
                    {status}
                </li>
            );
        });
        return (
            <div>
                {arr}
            </div>
        );
    }
});
