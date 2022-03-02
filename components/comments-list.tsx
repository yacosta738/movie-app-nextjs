import Comment from "../models/comment";


const CommentsList = (props:{comments: Comment[]}) => {
  const { comments } = props;
  return (
      <div className="commentary">
        {comments?.map(
            (comment: Comment) =>
                <div className="my-4" key={comment.id}>
                  <div className="comment-header">
                    <div
                        className="text-3xl text-gray-400 font-bold">{`${comment.user?.name ? comment.user?.name : 'Anonymous'} - ${comment.createdAt}`}</div>
                  </div>
                  <div className="text-2xl my-4 py-4 text-ellipsis overflow-hidden">{comment.content}</div>
                </div>
        )}
      </div>
  );
};

export default CommentsList;