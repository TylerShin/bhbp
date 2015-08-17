var ProfileFindBox = React.createClass({
    getInitialState: function () {
        return {
            results: {
                profiles: []
            },
            isLoading: false
        };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (profiles) {
                this.setState({results: profiles});
            }.bind(this),
            error: function () {
                console.log("Failed to get UserDatas");
            }
        });
    },
    handleSubmit: function (searchWord) {
        this.setState({isLoading: true});
        $.ajax({
            url: this.props.url,
            data: searchWord,
            datatype: 'json',
            success: function (profiles) {
                this.setState({
                    results: profiles,
                    isLoading: false
                });
            }.bind(this),
            error: function () {
                console.log("Failed to find");
            }
        });
    },
    render: function () {
        return (
            <div className="container">
                <div className="profileFindBox">
                    <div className="row">
                        <div className="container">
                            <div className="basicConditionBox clearfix">
                                <ul>
                                    <li>회원점수순 </li>
                                    <li>가입일순(최신) </li>
                                    <li>가입일순(오래된) </li>
                                    <li>팔로워순 </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <LeftBox handleSubmit={this.handleSubmit}/>
                        </div>
                        <div className="col-md-9">
                            <RightBox isLoading={this.state.isLoading} results={this.state.results.profiles}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var LeftBox = React.createClass({
    handleSubmit: function (searchWord) {
        this.props.handleSubmit(searchWord);
    },
    render: function () {
        return (
            <div className="leftBox">
                <div className="captionBox">
                    <h2>친구를 찾아보세요</h2>
                    <p>여러분이 몰랐던 인연, 이번 기회에 찾을 수 있지 않을까요?</p>
                    <SearchForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        );
    }
});

var SearchForm = React.createClass({
    getInitialState: function () {
        return {
            searchWords: {}
        }
    },
    handleKoreaClick: function () {
        $('.nation').removeClass('selected');
        $(React.findDOMNode(this.refs.kor)).addClass('selected');
        var now = this.state.searchWords;
        now.nation = "한국";
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleChinaClick: function () {
        $('.nation').removeClass('selected');
        $(React.findDOMNode(this.refs.chi)).addClass('selected');
        var now = this.state.searchWords;
        now.nation = "중국";
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleMaleClick: function () {
        $('.gender').removeClass('selected');
        $(React.findDOMNode(this.refs.male)).addClass('selected');
        var now = this.state.searchWords;
        now.gender = "남성";
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleFemaleClick: function () {
        $('.gender').removeClass('selected');
        $(React.findDOMNode(this.refs.female)).addClass('selected');
        var now = this.state.searchWords;
        now.gender = "여성";
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleMinKeyup: function () {
        var min = React.findDOMNode(this.refs.min).value;
        var now = this.state.searchWords;
        now.minAge = min;
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleMaxKeyup: function () {
        var max = React.findDOMNode(this.refs.max).value;
        var now = this.state.searchWords;
        now.maxAge = max;
        this.setState({searchWords: now});
        this.handleSubmit(this.state.searchWords);
    },
    handleSubmit: function (searchWord) {
        this.props.handleSubmit(searchWord);
    },
    render: function () {
        console.log(this.state.searchWords);
        return (
            <div className="searchForm">
                <div className="genderSelect clearfix">
                    <label>성별</label>
                    <button className="btn btn-default left-btn gender"
                            ref="male" onClick={this.handleMaleClick} value="남성">남성(男)
                    </button>
                    <button className="btn btn-default right-btn gender"
                            ref="female" onClick={this.handleFemaleClick} value="여성">여성(女)
                    </button>
                </div>
                <div className="nationSelect clearfix">
                    <label>국적</label>
                    <button className="btn btn-default left-btn nation" onClick={this.handleKoreaClick}
                            ref="kor" value="한국">한국(韓國)
                    </button>
                    <button className="btn btn-default right-btn nation" onClick={this.handleChinaClick}
                            ref="chi" value="중국">중국(韓國)
                    </button>
                </div>
                <div className="ageSelect">
                    <label>연령</label>

                    <form className="form-inline">
                        <input type="text" ref="min" onKeyUp={this.handleMinKeyup}/>세 ~
                        <input type="text" className="max" ref="max" onKeyUp={this.handleMaxKeyup}/>세
                    </form>
                </div>
                <div className="regionSelect">
                    <label>선호지역</label>
                    <select className="form-control">
                        <option>서울</option>
                        <option>경기</option>
                        <option>강원</option>
                        <option>경상</option>
                        <option>전라</option>
                    </select>
                </div>
            </div>
        );
    }
});




var RightBox = React.createClass({
    render: function () {
        if(this.props.isLoading) {
            var results = <h1>is Loading...</h1>
        }
        else {
            var results = this.props.results.map(function (r) {
                return (
                    <SearchProfileBox image={r.user_image} username={r.username} region={r.region} interest={r.interest}
                                      intro={r.intro} key={r.id} url={r.url} flag={r.flag} point={r.point}
                                      nation={r.nation}/>
                );
            });
        }

        return (
            <div className="rightBox">
                <div className="box-wrapper">
                    <div className="result-wrapper clearfix">
                        {results}
                    </div>
                </div>
            </div>
        );
    }
});

var SearchProfileBox = React.createClass({
    render: function () {
        return (
            <div className="col-md-4">
                <div className="profile-box">
                    <div className="box-wrapper">
                        <div className="profile-box-info">
                            <p><img src={this.props.flag}/><span className="name">{this.props.username}</span></p>
                        </div>
                        <ul className="image-section-wrapper">
                            <li><img src={this.props.image} className="profile-image"/></li>
                            <div className="box-tooltip">
                                <div className="left-float-btn-group clearfix">
                                    <a href={this.props.url}>
                                        <button>상세정보</button>
                                    </a>
                                    <a href="#">
                                        <button>메시지</button>
                                    </a>
                                </div>
                                <div className="bottom-float-btn-group">
                                    <a href={this.props.url}>
                                        <button>개인페이지</button>
                                    </a>
                                </div>
                            </div>
                        </ul>
                        <div className="profile-box-info-bottom">
                            <p>{this.props.point} 포인트</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});