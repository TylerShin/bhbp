var MasonryMixin = require('react-masonry-mixin')(React);

var url = '/react_profiles';
const Lang = {
    ko: {
        allUsers: "All Users",
        followings: "Followings",
        followers: 'Followers',
        information: "정보",
        message: '쪽지'
    },
    ch: {
        allUsers: '全体',
        followings: "粉丝",
        followers: '支持者',
        information: '信息',
        message: '便签'
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

var masonryOptions = {
   gutter: 20,
   transitionDuration: '0.5s',
   isFitWidth: true
};

class ProfileIndexBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                this.setState({
                    profiles: res.profiles
                });
            }.bind(this),
            error: function() {
                console.log('error!!');
            }
        });
    }
    handleAllListRequest() {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                this.setState({
                    profiles: res.profiles
                });
            }.bind(this),
            error: function() {
                console.log('error!!');
            }
        });
    }
    handleFollowingListRequest() {
        $.ajax({
            url: url,
            dataType: 'json',
            data: {condition: 'following'},
            success: function(res) {
                this.setState({
                    profiles: res.profiles
                });
            }.bind(this),
            error: function() {
                console.log('error!!');
            }
        });
    }
    handleFollowersListRequest() {
        $.ajax({
            url: url,
            dataType: 'json',
            data: {condition: 'followers'},
            success: function(res) {
                this.setState({
                    profiles: res.profiles
                });
            }.bind(this),
            error: function() {
                console.log('error!!');
            }
        });
    }
    render() {
        return (
            <div className="profileIndexBox">
                <Subnav handleFollowingListRequest={this.handleFollowingListRequest.bind(this)}
                    handleAllListRequest={this.handleAllListRequest.bind(this)}
                    handleFollowersListRequest={this.handleFollowersListRequest.bind(this)} />
                <ProfilesMasonry profiles={this.state.profiles} />
            </div>
        );
    }
}

class Subnav extends React.Component {
    handleFollowingListRequest() {
        this.props.handleFollowingListRequest();
    }
    handleAllListRequest() {
        this.props.handleAllListRequest();
    }
    handleFollowersListRequest() {
        this.props.handleFollowersListRequest();
    }

    handleFollowersListRequest() {
        this.props.handleFollowersListRequest();
    }

    render() {
        return (
            <div className="sub-nav">
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li role="presentation" onClick={this.handleAllListRequest.bind(this)}><a href="#">{lang.allUsers}</a></li>
                        <li role="presentation" onClick={this.handleFollowingListRequest.bind(this)}><a href="#">{lang.followings}</a></li>
                        <li role="presentation" onClick={this.handleFollowersListRequest.bind(this)}><a href="#">{lang.followers}</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
var ProfilesMasonry = React.createClass({
    mixins: [MasonryMixin('masonryContainer', masonryOptions)],
    render: function() {
        var profiles = this.props.profiles;
        var list = profiles.map((item, index) => {
            return (
                <ProfileMasonryBox key={index} nation={item.nation}
                    username={item.username} userimage={item.user_image}
                    url={item.url} userId={item.userId} point={item.point} />
            );
        });
        return (
            <div className="grey-wrapper">
                <div ref="masonryContainer" id="masonry-container" className="centered container clearfix">
                    {list}
                </div>
            </div>
        );
    }
});

class ProfileMasonryBox extends React.Component {
    render() {
        return (
            <div className="profile-box">
                <div className="box-wrapper">
                    <div className="profile-box-info">
                        <p>
                            {this.props.nation}
                            <span className="name">
                                {this.props.username}
                            </span>
                        </p>
                    </div>
                    <ul className="image-section-wrapper">
                        <li><img src={this.props.userimage} className='profile-image' /></li>
                        <div className="box-tooltip">
                            <div className="left-float-btn-group clearfix">
                                <a href={this.props.url}>
                                    <button>{lang.information}</button>
                                </a>
                                <button data-toggle="modal" data-id={this.props.userId} data-target="#message">{lang.message}</button>
                            </div>
                            <div className="bottom-float-btn-group">
                            <a href={this.props.url}>
                                <button>{lang.followers}</button>
                            </a>
                            </div>
                        </div>
                    </ul>
                    <div className="profile-box-info-bottom">
                        <p>{this.props.point} 포인트 남성</p>
                    </div>
                </div>
            </div>
        );
    }
}


React.render(
    <ProfileIndexBox />, document.getElementById('content')
);
