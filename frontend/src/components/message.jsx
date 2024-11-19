import React from "react";

const Message = ({ message, setMessage }) => {
  if (message.error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show message" role="alert">
        {message.error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setMessage(null)}></button>
      </div>
    );
  } else {
    return (
      <div className="alert alert-success alert-dismissible fade show message" role="alert">
        {message.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setMessage(null)}></button>
      </div>
    );
  }
};

export default Message;
