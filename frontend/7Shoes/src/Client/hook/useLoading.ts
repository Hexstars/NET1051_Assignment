// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export function useLoading() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 400); // Giả lập load trong 1s
//     return () => clearTimeout(timer);
//   }, [location.pathname]); // Chạy khi đổi trang

//   return loading;
// }

//Mới, chỉ load 1 lần khi chạy trang
import { useState, useEffect } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a short duration, then disable it
    const timer = setTimeout(() => setLoading(false), 1000); 

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this only runs on first mount

  return loading;
}