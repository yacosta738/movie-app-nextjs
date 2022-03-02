import Comment from "../models/comment";
import useLocalStorage from "../hooks/useLocalStorage";
import CommentsList from "./comments-list";
import User from "../models/user";

const CommentsForm = (props: {movieId: string}) => {
  const {movieId} = props;
  const [comment, setComment] = useLocalStorage<Comment>("comment",{id: Math.random(), content: "", movieId: movieId});
  const [comments, setComments] = useLocalStorage<Comment[]>("comments",[]);
  const [currentUser] = useLocalStorage<User>("currentUser", {
    id: Math.random(),
    name: "",
    password: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    comment.createdAt = new Date().toDateString();
    if (currentUser){
      comment.user = currentUser;
    }
    setComments([...comments, comment]);
    setComment({id: Math.random(), content: "", movieId: movieId});
    alert("Comment added!");
  };
//  {id: d324325safs, content: some big text, createdAt: new Date(), updatedAt: new Date()}
  return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
        <textarea id="comment"
                  className="w-full font-serif  p-4 text-gray-600 text-2xl bg-indigo-50 outline-none rounded-xl"
                  cols={30} rows={5} placeholder={'Add your comments here...'}
                  value={comment.content}
                  onChange={(e) => setComment({...comment, content: e.target.value})}
        />
          </div>
          <div className="flex justify-end items-center">
            <button type="submit"
                    className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
        <CommentsList comments={comments.filter(c => c.movieId === movieId)}/>
      </>

  );
};
export default CommentsForm;