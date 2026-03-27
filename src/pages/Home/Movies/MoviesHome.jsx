import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../features/home/movies/moviesSlice";

const MoviesHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, loading } = useSelector((state) => state.movies);
  const [activeFilter, setActiveFilter] = useState("All Videos");

  useEffect(() => {
    dispatch(getMovies({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  // Filter movies by category
  const filteredMovies =
    activeFilter === "All Videos"
      ? movies
      : movies.filter((movie) => movie.category === activeFilter);

  const filters = [
    "All Videos",
    "Relaxation",
    "Meditation",
    "Sleep",
    "Mindfulness",
  ];

  return (
    <div className="main-content">
      <div className="p-4">
        {/* Filters */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`btn ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="row g-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredMovies.length === 0 ? (
            <p>No videos found.</p>
          ) : (
            filteredMovies.map((item) => (
              <div className="col-md-4" key={item._id}>
                <div
                  className="video-card"
                  style={{
                    cursor: "pointer",
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                  onClick={() =>
                    navigate(`/home/moviesHome/moviesDetail`, {
                      state: { movie: item },
                    })
                  }
                >
                  <div
                    className="video-thumbnail"
                    style={{
                      width: "100%",
                      height: "180px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item?.thumbnail || "/images/movies-bg-one.png"}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    className="p-3"
                    style={{
                      minHeight: "90px",
                    }}
                  >
                    <h6 style={{ marginBottom: "5px" }}>
                      {item?.description || "Movie Title"}
                    </h6>
                    <p style={{ margin: 0 }}>
                      {item?.category || "Relaxation & mindfulness"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesHome;
