var ProfileFindBox = React.createClass({
    getInitialState: function () {
        return {
            results: {
                profiles: []
            }
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
        console.log(searchWord);
        $.ajax({
            url: this.props.url,
            data: {country: searchWord[0], gender: searchWord[1], minAge: searchWord[2], maxAge: searchWord[3]},
            datatype: 'json',
            success: function (profiles) {
                this.setState({results: profiles});
            }.bind(this),
            error: function () {
                console.log("Failed to find that terms");
            }
        });
    },
    render: function () {
        return (
            <div className="profileFindBox">
                <div className="row">
                    <div className="col-md-4">
                        <LeftBox handleSubmit={this.handleSubmit}/>
                    </div>
                    <div className="col-md-8">
                        <RightBox results={this.state.results.profiles}/>
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
                    <h2>원하는 친구를 찾아보세요</h2>

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
            searchWords: [],
            nation: '',
            gender: '',
            minAge: 0,
            maxAge: 100
        }
    },
    handleKoreaClick: function () {
        this.setState({nation: "한국"});
    },
    handleChinaClick: function () {
        this.setState({nation: "중국"});

    },
    handleMaleClick: function () {
        this.setState({gender: "남성"});
    },
    handleFemaleClick: function () {
        this.setState({gender: "여성"})
    },
    handleMinKeyup: function () {
        var min = React.findDOMNode(this.refs.min).value;
        this.setState({minAge: min});
    },
    handleMaxKeyup: function () {
        var max = React.findDOMNode(this.refs.max).value;
        this.setState({maxAge: max});
    },
    handleSubmit: function () {
        var terms = [];
        terms.push(this.state.nation, this.state.gender, this.state.minAge, this.state.maxAge);
        this.setState({searchWords: terms});

        console.log(this.state.searchWords);
        this.props.handleSubmit(this.state.searchWords);
    },
    render: function () {
        return (
            <div className="searchForm">
                <div>검색조건</div>
                <div>{this.state.searchWords}</div>
                <div className="genderSelect clearfix">
                    <label>성별</label>
                    <button className="btn btn-default left-btn gender-male"
                            onClick={this.handleMaleClick} value="남성">남성(男)
                    </button>
                    <button className="btn btn-default right-btn gender-female"
                            onClick={this.handleFemaleClick} value="여성">여성(女)
                    </button>
                </div>
                <div className="nationSelect clearfix">
                    <label>국적</label>
                    <button className="btn btn-default left-btn nation-korea" onClick={this.handleKoreaClick}
                            value="한국">한국(韓國)
                    </button>
                    <button className="btn btn-default right-btn nation-china" onClick={this.handleChinaClick}
                            value="중국">중국(韓國)
                    </button>
                </div>
                <div className="ageSelect">
                    <label>연령</label>

                    <form className="form-inline">
                        <input type="text" ref="min" onKeyUp={this.handleMinKeyup}/>세 ~
                        <input type="text" ref="max" onKeyUp={this.handleMaxKeyup}/>세
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
                <button className="btn btn-default" onClick={this.handleSubmit}>검색하기</button>
            </div>
        );
    }
});
var RightBox = React.createClass({
    render: function () {
        var results = this.props.results.map(function (r) {
            return (
                <SearchProfileBox image={r.user_image} username={r.username} region={r.region} interest={r.interest}
                                  intro={r.intro} key={r.id} url={r.url} flag={r.flag} point={r.point}
                                  nation={r.nation}/>
            )
        });
        return (
            <div className="rightBox">
                <div className="box-wrapper">
                    <h1>결과가 나오는 장소</h1>

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