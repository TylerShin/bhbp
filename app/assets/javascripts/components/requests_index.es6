class RequestsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			receiverd_requests: []
		}
	}
	componentDidMount() {
		$.ajax({
			url: '/requests_api/ownlist',
			dataType: 'json',
			data: { user_id: this.props.user_id },
			success: function(res) {
				this.setState({
					receiverd_requests: res.requests
				})
			}.bind(this),
			error: function() {
				console.log("error!");
			}
		})
	}
	sendAcceptRequest(request_id, receiver_id) {
		$.ajax({
			url: `/requests_api/${request_id}`,
			method: 'PATCH',
			dataType: 'json',
			data: { receiver_id: receiver_id },
			success: function(res) {
				this.setState({
					receiverd_requests: res.requests
				});
			}.bind(this),
			error: function() {
				alert("만남 승인에 실패했습니다! 네트워크 상태를 확인해주세요.");
			}
		})
	}
	sendDenyRequest(request_id, receiver_id) {
		$.ajax({
			url: `/requests_api/${request_id}`,
			method: 'DELETE',
			dataType: 'json',
			data: { receiver_id: receiver_id },
			success: function(res) {
				this.setState({
					receiverd_requests: res.requests
				});
			}.bind(this),
			error: function() {
				alert("만남 거절에 실패했습니다! 네트워크 상태를 확인해주세요.");
			}
		})
	}
	render() {
		var received_list = this.state.receiverd_requests.map((req, index) => {
			//승낙여부 버튼
			if(req.accepted) {
				//만남여부 버튼
				if(req.met_or_not) {
					var met_btn = <button className="btn btn-sm btn-primary pull-right">평가하기</button>;
				} else {
					var met_btn= <button className="btn btn-sm btn-primary pull-right">만남확인</button>;
				}
			} else {
				var met_btn = (
					<div className="pull-right">
						<button onClick={this.sendAcceptRequest.bind(this, req.id ,req.receiver_id)} className="btn btn-sm btn-primary">승낙</button>
						<button onClick={this.sendDenyRequest.bind(this, req.id ,req.receiver_id)} className="btn btn-sm btn-danger">거절</button>
					</div>
				);
			}
			return (
				<li className="list-group-item clearfix" key={index}>
					<img src={req.sender_nano_img} className="pull-left" />
					<a href ={req.sender_profile_URL}>{req.sender_username}</a>
					{met_btn}
				</li>
			);
		});
		return (
			<div className="container">
				<div className="row">
					<div className="requests-box">
						<div className="col-md-4 col-md-offset-2">
							<ul className="list-group received-list">
								<li className="list-group-item list-group-header">받은 만남요청 목록</li>
								{received_list}
							</ul>
						</div>
						<div className="col-md-4">
							<ul className="list-group sended-list">
								<li className="list-group-item list-group-header">보낸 만남요청 목록</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}