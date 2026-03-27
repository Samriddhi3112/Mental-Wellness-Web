import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWiseYogi } from "../../../features/home/wise yogi/wiseYogiSlice";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/wise-yogi-one.png"

const WiseYogiListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wiseYogi, loading } = useSelector((state) => state.wiseYogi);

  useEffect(() => {
    dispatch(fetchWiseYogi());
  }, [dispatch]);

  return (
    <div className="main-content">
      <div className="row wise-yogi">
        {loading ? (
          <p>Loading...</p>
        ) : (
          (wiseYogi || []).map((item) => (
            <div className="col-md-2" key={item._id}>
              
              <a
                onClick={(e) => {
                  e.preventDefault(); 
                  navigate("/home/wiseyogiHome/wiseyogiDetail", {
                    state: { data: item },
                  });
                }}
                href="#"
              >
                <div className="icon">
                  <img
                    src={item?.thumbnail || {img}}
                    alt=""
                  />
                </div>

                <h4>{item?.title || item?.activityName}</h4>

                <p>
                  {item?.duration
                    ? `${item.duration} min`
                    : "10 min"}
                </p>
              </a>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WiseYogiListing;