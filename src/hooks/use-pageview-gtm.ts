import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/gtm";


export const usePageViewGTM = () => {
    const location = useLocation();

    useEffect(() => {
        trackPageView({location, title: document.title});
    }, [location])

}