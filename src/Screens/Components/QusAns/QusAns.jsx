import React from "react";

const QusAns = (props) => {
  const { qus, ans, type, score, no } = props;
  return (
    <>
      <div className="QusAns-Item">
        <div className="QusBox d-flex">
          <div className="QusIconArea">
            <div className="QusIcon">Q.{no && no}</div>
          </div>
          <div className="QusTextArea w-100">
            <div className="d-flex justify-content-between">
              <div className="QusText col-sm">{qus && qus}</div>
              {type === "Wellness" && (
                <div className="QusScore col-sm-auto">
                  {score !== -1 ? <>Score - {score}</> : ""}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="AnsBox d-flex">
          <div className="AnsIcon">Ans:</div>
          <div className="AnsText" style={{ wordBreak: "break-all" }}>
            {ans}
          </div>
        </div>
      </div>
    </>
  );
};

export default QusAns;
