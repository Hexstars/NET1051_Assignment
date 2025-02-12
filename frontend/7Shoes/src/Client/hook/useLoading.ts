import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useLoading() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Giả lập load trong 1s
    return () => clearTimeout(timer);
  }, [location.pathname]); // Chạy khi đổi trang

  return loading;
}
