import React from "react";
import { Accordion } from "react-bootstrap";

const MyAccordion = (props) => {
  const { title, type, ActiveKey, GAD, PHQ, TOTAL } = props;
  return (
    <>
      <Accordion.Item
        eventKey={ActiveKey}
        className={`Acc-${type}-${ActiveKey}`}
      >
        <Accordion.Header>
          <div
            className={`row justify-content-between w-100-30 Acc-${type}-${ActiveKey}-inner`}
            data={ActiveKey}
          >
            <div className="titleLeft col-sm-12 col-md ">
              <h6 className="mb-0">{title}</h6>
            </div>
            {type === "Wellness" && (
              <div className="titleRight col-sm-12 col-md-auto">
                <div className="d-flex">
                  <div>
                    PHQ9-<strong>{PHQ}</strong>
                  </div>
                  <div>
                    GAD7-<strong>{GAD}</strong>
                  </div>
                  <div>
                    TOTAL-<strong>{TOTAL}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body>{props.children}</Accordion.Body>
      </Accordion.Item>
    </>
  );
};
export default MyAccordion;
