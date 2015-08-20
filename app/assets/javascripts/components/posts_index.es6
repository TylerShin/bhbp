const PostsUrl = '/posts_api/';

class PostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        $.ajax({
            url: `${PostsUrl}free`,
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
        console.log(this.props.lang);
        return (
            <div className="postIndex">
                <SubHeader changeTable={this.changeTable.bind(this)}/>
                <div className="container">
                    <a href="/posts/new"><button className="btn btn-default">글쓰기</button></a>
                    <ForumBox posts={this.state.posts} isLoading={this.state.isLoading} />
                </div>
            </div>
        );
    }
}

class SubHeader extends React.Component {
    render() {
        return (
            <ul className="nav nav-pills nav-justified post-sub-nav">
                <li><a href="#" onClick={this.props.changeTable.bind(this, "free")}>자유게시판</a></li>
                <li><a href="#" onClick={this.props.changeTable.bind(this, "question")}>질문게시판</a></li>
                <li><a href="#" onClick={this.props.changeTable.bind(this, "info")}>정보게시판</a></li>
                <li><a href="#" onClick={this.props.changeTable.bind(this, "free")}>자기소개</a></li>
            </ul>
        );
    }
}

class ForumBox extends React.Component {
    render() {
        const postsList = this.props.posts.map((post, index) => {
            return (
                <div className="postBox clearfix" key={index}>
                    <img src={post.userImage} />
                    <span className="postInfo"><a href={post.postPath} className="title">{post.title}</a> <strong>5개</strong> 코멘트 , <strong>7명</strong>이 좋아합니다. <button className="btn btn-default btn-xs category">{post.category}</button></span>
                    <p className="subInfo"><span className="username">{post.username}</span> <span className="created-at">{moment(post.created_at).fromNow()}</span></p>
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
