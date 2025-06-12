import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDesignStore } from "@/store/useDesignStore";

const RouteSync = () => {
  const location = useLocation();
  const setSelectedPage = useDesignStore((state) => state.setSelectedPage);

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "";
    setSelectedPage(path);
  }, [location.pathname, setSelectedPage]);

  return null;
};

export default RouteSync;
