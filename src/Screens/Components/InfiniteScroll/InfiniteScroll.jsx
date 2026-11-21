import React, { useState, useEffect, useLayoutEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiHelper from "../../../Helpers/ApiHelpers";

function InfiniteScrollComp() {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    data: [],
    page: 0,
    copyData: [],
    reverseData: [],
  });
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const fetchMoreData = () => {
    console.log("ok");
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   setItems((data) => ({
    //     ...data,
    //     items: items.concat(Array.from({ length: 20 })),
    //   }));
    // }, 1500);
    getData();
  };

  const getData = () => {
    setInitialData({ ...initialData, loading: true });

    ApiHelper(
      "auth-service/admin/getAdmins",
      "GET",
      "",
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //setInitialData(data);
        //console.warn("fetch data", res.data);
        if (res && res.data.data) {
          const revData = res.data.data;

          setInitialData((initialData) => ({
            ...initialData,
            loading: false,
            page: initialData.page + 1,
            data: initialData.data.concat(revData),
            //copyData: res.data.data,
            //reverseData: [...initialData.data.concat(res.data.data)],
          }));
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) => {
        //console.warn("fetch data", err.response);

        if (err?.response) {
          setInitialData((initialData) => ({
            ...initialData,
            loading: false,
            error: err.response.data.message,
          }));

          if (err.response.data.code === 401) {
            //setAlertBox({ show: true, type: "TokenExpire" });
            return;
          }
        } else {
          setInitialData((initialData) => ({
            ...initialData,
            loading: false,
          }));
          //setAlertBox({ show: true, type: "NetError" });
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        // overflow: "auto",
        //display: "flex",
        //flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={initialData.data.length}
        next={fetchMoreData}
        //style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        //inverse={true} //
        hasMore={initialData.data.length <= 20}
        loader={<h4>Loading...</h4>}
        //scrollableTarget="scrollableDiv"
      >
        {initialData.data.map((item, index) => (
          <div style={style} key={index}>
            div - #{index} - #{item.firstName}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollComp;

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};
