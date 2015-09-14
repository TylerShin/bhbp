const Lang = {
    ko: {
        freeBoard: '자유게시판',
        questionBoard: '질문게시판',
        infoBoard: '정보게시판',
        introduceBoard: '자기소개',
        postBtn: '글쓰기',
        comment: '댓글',
        like: '명이 좋아합니다.',
        bestPosts: '최고인기글'
    },
    ch: {
        freeBoard: '自由公告栏',
        questionBoard: '问题公告栏',
        infoBoard: '信息公告栏',
        introduceBoard: '自我介绍',
        postBtn: '写作',
        comment: '阅读',
        like: '好文',
        bestPosts: '最受欢迎的文章'
    }
};
const PostsUrl = '/posts_api/';

(function() {
        function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    if(getCookie('educator_locale') === 'zh-CN') {
        window.lang = Lang.ch;
    }
    else {
        window.lang = Lang.ko;
    }

}());

class PostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: false,
            meta: {},
            fetchData: {
                page: 1
            }
        }
    }
    _fetchPosts() {
        $.ajax({
            url: `${PostsUrl}free`,
            dataType: 'json',
            data: this.state.fetchData,
            success: this._fetchDataDone.bind(this),
            error: this.__fetchDataFail
        });
    }
    _fetchDataDone(data, textStatus, jqXHR) {
        this.setState({
            posts: data.posts_api,
            meta: data.meta
        });
    }
    _handleOnPaginate(pageNumber) {
        this.state.fetchData.page = pageNumber;
        this._fetchPosts();
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        $.ajax({
            url: `${PostsUrl}free`,
            dataType: 'json',
            success: function(res) {
                this.setState({
                    posts:  res.posts_api,
                    isLoading: false,
                    meta: res.meta
                });
            }.bind(this),
            errror: function() {
                alert("정보를 얻어오는데 실패했습니다. 통신상태를 확인하여주십시오.")
            }
        });
    }
    changeTable(table) {
        this.setState({ isLoading: true });
        $.ajax({
            url: `${PostsUrl}${table}`,
            dataType: 'json',
            success: function(res) {
                this.setState({
                    posts:  res.posts_api,
                    isLoading: false
                });
            }.bind(this),
            errror: function() {
                alert("정보를 얻어오는데 실패했습니다. 통신상태를 확인하여주십시오.")
            }
        });
    }
    render() {
        return (
            <div className="postIndex">
                <SubHeader changeTable={this.changeTable.bind(this)}/>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-8'>
                            <ForumBox posts={this.state.posts} isLoading={this.state.isLoading} />
                            <div className='menuBox clearfix'>
                                <PaginatorSection totalPages={this.state.meta.total_pages}
                                    currentPage={this.state.meta.current_page}
                                    onPaginate={this._handleOnPaginate.bind(this)} />
                                    <div className='clearfix'></div>
                                <div className='postBtn'>
                                    <a href="/posts/new"><button className="btn btn-default">{lang.postBtn}</button></a>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <BestPostsBox />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class BestPostsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: false,
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        $.ajax({
            url: `${PostsUrl}best`,
            dataType: 'json',
            success: function(res) {
                this.setState({
                    posts:  res.posts_api,
                    isLoading: false,
                });
            }.bind(this),
            errror: function() {
                alert("베스트 글을 얻어오는데 실패했습니다. 통신상태를 확인하여주십시오.")
            }
        });
    }
    render() {
        var tempArray = this.state.posts.map((post, index) => {
            return (
                <div className='postItem' key={index}>
                    <p className='title'><a href={post.postPath}>{post.title}</a></p>
                    <p className='sub-info'>
                        <a href={post.profileUrl}><span className='username'>{post.username}</span></a>
                        <span className='createdAt'>{moment(post.created_at).fromNow()}</span>
                        <span>{lang.comment} {post.likesCount}</span>
                    </p>
                </div>
            );
        });
        return (
            <div className='bestPostsBox hidden-xs hidden-sm'>
                <div className='box-header'>
                    <h4>{lang.bestPosts}</h4>
                </div>
                    {tempArray}
            </div>
        );
    }
}

class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'free'
        }
    }
    change(param) {
      console.log(param);
      this.setState({ value: param });
      this.props.changeTable(param);
    }
    render() {
        return (
            <div>
              <ul className="nav nav-pills nav-justified post-sub-nav hidden-xs">
                  <li><a href="#" onClick={this.change.bind(this, "free")}>{lang.freeBoard}</a></li>
                  <li><a href="#" onClick={this.change.bind(this, "question")}>{lang.questionBoard}</a></li>
                  <li><a href="#" onClick={this.props.changeTable.bind(this, "info")}>{lang.infoBoard}</a></li>
                  <li><a href="#" onClick={this.props.changeTable.bind(this, "intro")}>{lang.introduceBoard}</a></li>
              </ul>
              <select className="form-control visible-xs sub-nav" value="free" onChange={console.log()}>
                <option value="free">{lang.freeBoard}</option>
                <option value="question">{lang.questionBoard}</option>
                <option value="info">{lang.infoBoard}</option>
                <option value="intro">{lang.introduceBoard}</option>
              </select>
            </div>
        );
    }
}

class ForumBox extends React.Component {
    render() {
        const postsList = this.props.posts.map((post, index) => {
            return (
                <div className="postBox clearfix" key={index}>
                    <img src={post.userImage} className="hidden-xs" />
                    <span className="postInfo"><a href={post.postPath} className="title">{post.title}</a> <strong>{post.commentCount}</strong> {lang.comment} , <strong>{post.likesCount}</strong>{lang.like} </span>
                    <p className="subInfo"><a href={post.profileUrl} className="username">{post.username}</a> <span className="created-at">{moment(post.created_at).fromNow()}</span></p>
                </div>
            );
        });
        return (
            <div className="forumBox">
                {postsList}
            </div>
        );
    }
}
