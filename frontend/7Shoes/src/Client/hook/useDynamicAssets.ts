import { useEffect, useState } from "react";

export function useDynamicAssets(
    cssLinks: string[] = [
        "/Client/assets/css/bootstrap.min.css",
        "/Client/assets/css/font-awesome.min.css",
        "/Client/assets/css/elegant-icons.css",
        "/Client/assets/css/magnific-popup.css",
        "/Client/assets/css/nice-select.css",
        "/Client/assets/css/owl.carousel.min.css",
        "/Client/assets/css/slicknav.min.css",
        "/Client/assets/css/style.css",
    ],
    jsScripts: string[] = [
        "/Client/assets/js/jquery-3.3.1.min.js",
        "/Client/assets/js/bootstrap.min.js",
        "/Client/assets/js/jquery.nice-select.min.js",
        "/Client/assets/js/jquery.nicescroll.min.js",
        "/Client/assets/js/jquery.magnific-popup.min.js",
        "/Client/assets/js/jquery.countdown.min.js",
        "/Client/assets/js/jquery.slicknav.js",
        "/Client/assets/js/mixitup.min.js",
        "/Client/assets/js/owl.carousel.min.js",
        "/Client/assets/js/main.js",
    ],
    minLoadTime = 1300
) {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [timerDone, setTimerDone] = useState(false);

    useEffect(() => {
        const totalScripts = jsScripts.length;
        const timer = setTimeout(() => setTimerDone(true), minLoadTime);

        // Load CSS
        cssLinks.forEach((href) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = href;
                link.type = "text/css";
                document.head.appendChild(link);
            }
        });

        // Load JS tuần tự
        const loadScriptSequentially = async (index: number) => {
            if (index >= totalScripts) {
                setAssetsLoaded(true);
                return;
            }

            const src = jsScripts[index];

            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement("script");
                script.src = src;
                script.async = false;
                script.onload = () => loadScriptSequentially(index + 1);
                script.onerror = () => {
                    console.error(`Failed to load script: ${src}`);
                    loadScriptSequentially(index + 1);
                };
                document.body.appendChild(script);
            } else {
                loadScriptSequentially(index + 1);
            }
        };

        loadScriptSequentially(0);

        return () => {
            clearTimeout(timer);
            cssLinks.forEach((href) => {
                const link = document.querySelector(`link[href="${href}"]`);
                if (link) document.head.removeChild(link);
            });

            jsScripts.forEach((src) => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) document.body.removeChild(script);
            });
        };
    }, [cssLinks, jsScripts, minLoadTime]);

    return assetsLoaded && timerDone;
}
