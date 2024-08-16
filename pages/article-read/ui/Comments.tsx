import { useContext } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export const Comments = () => {
  const { comments } = useLoaderData<typeof loader>();
  const currentUser = useContext(CurrentUser);

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {currentUser !== null ? (
        <Form
          preventScrollReset
          method="post"
          className="card comment-form"
          key={Date()}
        >
          <div className="card-block">
            <textarea
              required
              name="comment"
              placeholder="Write a comment..."
              rows={3}
              className="form-control"
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={currentUser.image}
              alt=""
              className="comment-author-img"
            />
            <button
              className="btn-sm btn-primary"
              name="_action"
              value="createComment"
            >
              Post Comment
            </button>
          </div>
        </Form>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">Sign in</Link>
              &nbsp; or &nbsp;
              <Link to="/register">Sign up</Link>
              &nbsp; to add comments on this article.
            </p>
          </div>
        </div>
      )}
      {comments.comments.map(({ id, body, author, createdAt }) => (
        <div className="card" key={id}>
          <div className="card-block">
            <p className="card-text">{body}</p>
          </div>
          <div className="card-footer">
            <Link to={`/profile/${author.username}`} className="comment-author">
              <img src={author.image} alt="" className="comment-author-img" />
            </Link>
            &nbsp;
            <Link to={`/profile/${author.username}`} className="comment-author">
              {author.username}
            </Link>
            <span className="date-posted">{createdAt}</span>
            {author.username === currentUser?.username && (
              <span className="mod-options">
                <Form method="post" preventScrollReset>
                  <input type="hidden" name="id" value={id} />
                  <button
                    name="_action"
                    value="deleteComment"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <i className="ion-trash-a"></i>
                  </button>
                </Form>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
