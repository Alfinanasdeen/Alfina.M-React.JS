import { useState, useEffect, useRef, useCallback } from "react";
import "./InfiniteScroll.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Flag for more items availability
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null); // Reference for the loader div

  // Simulated API function to fetch data
  const fetchData = async (page) => {
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newItems = Array.from(
        { length: 20 },
        (_, i) => `Item ${i + 1 + (page - 1) * 20}`
      );

      // Add new items while ensuring uniqueness
      setItems((prevItems) => {
        const combinedItems = [...prevItems, ...newItems];
        return [...new Set(combinedItems)];
      });

      if (newItems.length < 20) setHasMore(false); // No more items available
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on page change
  useEffect(() => {
    if (hasMore) fetchData(page);
  }, [page, hasMore]);

  // Intersection observer callback to trigger next page fetch
  const loadMore = useCallback(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    },
    [hasMore, loading]
  );

  // Set up the intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current); // Observe loader

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current); // Cleanup observer
    };
  }, [loadMore]);

  return (
    <div className="app-infinite">
      <h1 className="title">Infinite Scroll</h1>
      <p className="description">
        Infinite scrolling automatically loads new content as the user scrolls,
        providing a seamless and continuous browsing experience.
      </p>
      <div className="item-list-infinite">
        {items.map((item, index) => (
          <div key={index} className="item-infinite">
            {item}
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="loader">
        {hasMore ? "Loading..." : "No more items"}
      </div>
    </div>
  );
};

export default App;
