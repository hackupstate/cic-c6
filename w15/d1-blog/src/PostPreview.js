// #41 Show this component for each of the posts from local storage
const PostPreview = () => {
	return (
		<div className="col-4">
			<div className="card">
				{/* <!-- <img src="..." className="card-img-top" alt="..." /> --> */}
				<div className="card-body">
					<h5 className="card-title">My first post</h5>
					<div className="card-text">
						<div className="author">by Max Matthews</div>
						<div className="timestamp">3 minutes ago</div>
						<p>Example content from this blog post</p>
					</div>
					<a href="#" className="btn btn-primary">
						Read more
					</a>
					{/* <!-- End of card-body --> */}
				</div>
				{/* <!-- End of card --> */}
			</div>
			{/* <!-- end of the col --> */}
		</div>
	);
};

export default PostPreview;
