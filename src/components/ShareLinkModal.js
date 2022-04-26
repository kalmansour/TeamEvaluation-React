// Libraries
import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Icons
import { BsClipboard } from "react-icons/bs";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 160,
  },
};

const ShareLinkModal = ({ modalIsOpen, closeModal, url }) => {
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h4 style={{ textAlign: "center" }}>Project Share Link</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {copy ? (
            <span
              style={{
                color: "red",
                position: "relative",
                top: 2,
                left: -50,
                fontSize: 20,
              }}
            >
              Copied!
            </span>
          ) : null}
          <h5
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "10px",
              textAlign: "center",
            }}
          >
            {url}
          </h5>
          <CopyToClipboard text={url} onCopy={() => setCopy({ copy: true })}>
            <BsClipboard
              size="2em"
              style={{
                //   marginTop: "auto",
                //   marginBottom: "auto",
                //   marginRight: "10px",
                color: "turquoise",
              }}
            />
          </CopyToClipboard>
        </div>
        <button
          class="btn btn-outline-danger float-end"
          type="button"
          onClick={() => {
            setCopy(false);
            closeModal();
          }}
        >
          Done
        </button>
      </Modal>
    </div>
  );
};

export default observer(ShareLinkModal);
