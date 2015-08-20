var Lang = {
    ko: {
        findFriend: '친구를 찾아보세요.',
        findFriendSub: '여러분이 몰랐던 인연, 이번 기회에 찾을 수 있지 않을까요?',
        gender: '성별',
        male: '남성',
        female: '여성',
        nation: '국가',
        korea: '한국',
        china: '중국',
        age: '연령',
        ageUnit: '세',
        region: '지역'
    },
    ch: {
        findFriend: '寻访朋友',
        findFriendSub: '大家不知道的关系,借此机会,能找到吗?',
        gender: '性别',
        male: '男性',
        female: '女性',
        nation: '国家',
        korea: '韩国',
        china: '中国',
        age: '年龄',
        ageUnit: '岁',
        region: '地区'
    }
};

(function() {
    var langSetting = function() {
        var setArray = document.cookie.split('=');
        if(setArray[0] === 'educator_locale') {
            var curLang = setArray[1];
        }
        else {
            var curLang = '';
        }
        return curLang
    };
    if(langSetting() == 'zh-CN') {
        window.lang = Lang.ch;
    }
    else {
        window.lang = Lang.ko;
    }

}());

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
                    <h2>{lang.findFriend}</h2>
                    <p>{lang.findFriendSub}</p>
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
                    <label>{lang.gender}</label>
                    <button className="btn btn-default left-btn gender"
                            ref="male" onClick={this.handleMaleClick} value="남성">{lang.male}
                    </button>
                    <button className="btn btn-default right-btn gender"
                            ref="female" onClick={this.handleFemaleClick} value="여성">{lang.female}
                    </button>
                </div>
                <div className="nationSelect clearfix">
                    <label>{lang.nation}</label>
                    <button className="btn btn-default left-btn nation" onClick={this.handleKoreaClick}
                            ref="kor" value="한국">{lang.korea}
                    </button>
                    <button className="btn btn-default right-btn nation" onClick={this.handleChinaClick}
                            ref="chi" value="중국">{lang.china}
                    </button>
                </div>
                <div className="ageSelect">
                    <label>{lang.age}</label>

                    <form className="form-inline">
                        <input type="text" ref="min" onKeyUp={this.handleMinKeyup}/>{lang.ageUnit} ~
                        <input type="text" className="max" ref="max" onKeyUp={this.handleMaxKeyup}/>{lang.ageUnit}
                    </form>
                </div>
                <div className="regionSelect">
                    <label>{lang.region}</label>
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
