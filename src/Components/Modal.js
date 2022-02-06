import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <text>
              &#10006; 
            </text>
          </button>
        </div>
        <div className="title">
          <h2>About Sorting Algorithms</h2>
        </div>
        <div className="footer">
          <div className="modal-body">
            <p>
              {" "}
              &nbsp;&nbsp; If you are interested in learning more about the
              Sorting Algorithms I implemented in React JS and others, I've
              provided the following links which should be useful.
            </p>
            <h3>General Overview</h3>
            <ul>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/sorting-algorithms/"
                  target="_blank"
                >
                  GeeksforGeeks
                </a>
              </li>
              <li>
                <a
                  href="https://www.interviewbit.com/tutorial/sorting-algorithms/"
                  target="_blank"
                >
                  InterviewBit
                </a>
              </li>
            </ul>

            <h3>Quick Sort</h3>
            <ul>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/quick-sort/"
                  target="_blank"
                >
                  GeeksforGeeks (Pseudo code included)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=Hoixgm4-P4M"
                  target="_blank"
                >
                  Quick Sort in 4 min (YT)
                </a>
              </li>
            </ul>

            <h3>Merge Sort</h3>
            <ul>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/merge-sort//"
                  target="_blank"
                >
                  GeeksforGeeks (Pseudo code included)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=4VqmGXwpLqc"
                  target="_blank"
                >
                  Merge Sort in 3 min (YT)
                </a>
              </li>
            </ul>

            <h3>Heap Sort</h3>
            <ul>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/heap-sort/"
                  target="_blank"
                >
                  GeeksforGeeks (Pseudo code included)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=2DmK_H7IdTo"
                  target="_blank"
                >
                  Quick Sort in 4 min (YT)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Close
            </button>
            {/* <button>Continue</button> */}
          </div>

          <div className="about-me">
            <text> Github and LinkedIn</text>
            <div className="modal-bottom">
              <a href="https://github.com/victorsamsonov" target="_blank">
                <img src={require("./images/github.png").default} />
              </a>
              <a
                href="https://www.linkedin.com/in/victor-samsonov-56948a1a3/"
                target="_blank"
              >
                <img src={require("./images/linkedin.png").default} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
