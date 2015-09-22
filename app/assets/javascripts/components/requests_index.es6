class RequestsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			received_requests: [],
			sended_requests: []
		}
	}
	componentDidMount() {
		$.ajax({
			url: '/requests_api/ownlist',
			dataType: 'json',
			data: { user_id: this.props.user_id },
			success: function(res) {
				this.setState({
					received_requests: res.requests
				})
			}.bind(this),
			error: function() {
				console.log("error!");
			}
		});
		$.ajax({
			url: '/requests_api/sendList',
			dataType: 'json',
			data: { user_id: this.props.user_id },
			success: function(res) {
				this.setState({
					sended_requests: res.requests
				})
			}.bind(this),
			error: function() {
				console.log("error!");
			}
		});
	}
	sendAcceptRequest(request_id, receiver_id) {
		$.ajax({
			url: `/requests_api/${request_id}`,
			method: 'PATCH',
			dataType: 'json',
			data: { receiver_id: receiver_id },
			success: function(res) {
				this.setState({
					received_requests: res.requests
				});
			}.bind(this),
			error: function() {
				alert("만남 승인에 실패했습니다! 네트워크 상태를 확인해주세요.");
			}
		});
	}
	sendDenyRequest(request_id, receiver_id) {
		$.ajax({
			url: `/requests_api/${request_id}`,
			method: 'DELETE',
			dataType: 'json',
			data: { receiver_id: receiver_id },
			success: function(res) {
				this.setState({
					received_requests: res.requests
				});
			}.bind(this),
			error: function() {
				alert("만남 거절에 실패했습니다! 네트워크 상태를 확인해주세요.");
			}
		});
	}
	sendMetRequest(request_id, receiver_id) {
		$.ajax({
			url: 'requests_api/met',
			dataType: 'json',
			data: { request_id: request_id, receiver_id: receiver_id },
			success: function(res) {
				this.setState({
					received_requests: res.requests
				});
			}.bind(this),
			error: function(err) {
				alert("만남 승인에 실패했습니다.", err);
			}
		});
	}
	sendEvaluation(modalId, request_id, e) {
		e.preventDefault();
		var evaluation = React.findDOMNode(this.refs.evaluation).value;
		var point = React.findDOMNode(this.refs.point).value;
		$.ajax({
			url: '/requests_api/evaluation',
			dataType: 'json',
			method: 'POST',
			data: { request_id: request_id, user_id: this.props.user_id, evaluation: evaluation, point: point },
			success: function(res) {
				this.setState({
					received_requests: res.requests
				});;
			}.bind(this),
			error: function(err) {
				alert("평가 등록에 실패했습니다.", err);
			}
		});
		$(`#${modalId}`).modal('hide');
	}
	render() {
		var received_list = this.state.received_requests.map((req, index) => {
			//승낙여부 버튼
			if(req.accepted) {
				//만남여부 버튼
				if(req.met_or_not) {
					var met_btn = (
						<div>
							<button className="btn btn-sm btn-primary pull-right" data-toggle="modal" data-target={`#modal${index}`}>평가하기</button>
							{/* modal */}
							<div className="modal fade" id={`modal${index}`} tabIndex={index} role="dialog" aria-labelledby="myModalLabel">
							  <div className="modal-dialog" role="document">
							    <div className="modal-content">
							      <div className="modal-header">
							        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							        <h4 className="modal-title" id="myModalLabel">평가남기기</h4>
							      </div>
							      <div className="modal-body">
							      	<form onSubmit={this.sendEvaluation.bind(this, `modal${index}`, req.id)}>
							      			<textarea className="form-control" cols="30" rows="10" ref="evaluation"></textarea>
													<select className="form-control" ref="point">
													  <option value="1">★</option>
													  <option value="2">★★</option>
													  <option value="3">★★★</option>
													  <option value="4">★★★★</option>
													  <option value="5">★★★★★</option>
													</select>
													<div className="modal-footer">
										        <button type="button" className="btn btn-default" data-dismiss="modal">취소</button>
										        <input type="submit" className="btn btn-primary" value="저장하기" / >
													</div>
											</form>
							      </div>
							    </div>
							  </div>
							</div>
						</div>
				);
				} else {
					var met_btn= (
						<div>
							<label>회원님과 만나셨나요?</label>
							<button className="btn btn-sm btn-danger pull-right" onClick={this.sendDenyRequest.bind(this, req.id, req.receiver_id)}>아니오</button>
							<button className="btn btn-sm btn-primary pull-right" onClick={this.sendMetRequest.bind(this, req.id, req.receiver_id)}>예</button>
						</div>
					);
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
		// sender_part
		var sended_list = this.state.sended_requests.map((req, index) => {
			return (
				<li className="list-group-item clearfix" key={index}>
					<img src={req.receiver_nano_img} className="pull-left" />
					<a href ={req.receiver_profile_URL}>{req.receiver_username}</a>
				</li>
			);
		});
		// result_part
		var sumList = this.state.sended_requests.concat(this.state.received_requests);
		var sortList = sumList.sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at) });
		var selectedList = sortList.filter(function(x) { return x.met_or_not == true });
		var resultsList = selectedList.map((req, index) => {
			return (
				<li className="list-group-item clearfix" key={index}>
					<img src={req.receiver_nano_img} className="pull-left" />
					<a href ={req.receiver_profile_URL}>{req.receiver_username}</a>
				</li>
			);
		});
		return (
			<div className="container">
				<div className="row">
					<div className="requests-box">
						<div className="col-md-4 col-md-offset-2 col-xs-12">
							<ul className="list-group received-list">
								<li className="list-group-item list-group-header">받은 만남요청 목록</li>
								{received_list}
							</ul>
						</div>
						<div className="col-md-4 col-xs-12">
							<ul className="list-group sended-list">
								<li className="list-group-item list-group-header">보낸 만남요청 목록</li>
								{sended_list}
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 col-md-offset-2 col-xs-12">
					<ul className="list-group sended-list">
						<li className="list-group-item list-group-header">만남 결과 모음</li>
						{resultsList}
					</ul>
					</div>
				</div>
			</div>
		);
	}
}
