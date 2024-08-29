import { Link } from "react-router-dom";

// #41 Show this component for each of the posts from local storage
const PostPreview = ({ postDetails }) => {
	console.log(postDetails);
	return (
		<div className="col-4">
			<div className="card">
				{/* <!-- <img src="..." className="card-img-top" alt="..." /> --> */}
				<div className="card-body">
					<h5 className="card-title">{postDetails.title}</h5>
					<div className="card-text">
						{postDetails.user && (
							<div className="author">
								by {postDetails.user.firstName}{" "}
								{postDetails.user.lastName}
							</div>
						)}
						<div className="timestamp">
							{new Date(
								postDetails.updatedAt
							).toLocaleTimeString()}
						</div>
						<p>
							{postDetails.content.substring(0, 100)}
							{postDetails.content.length > 100 && "..."}
						</p>
					</div>
					<Link
						to={`/read/${postDetails.id}`}
						className="btn btn-primary"
					>
						Read more
					</Link>
					{/* <!-- End of card-body --> */}
				</div>
				{/* <!-- End of card --> */}
			</div>
			{/* <!-- end of the col --> */}
		</div>
	);
};

export default PostPreview;
