import { useEffect, useState } from "react";

export const useDynamicAssets = (cssLinks: string[], jsScripts: string[]) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false); //Thêm state kiểm tra load

    useEffect(() => {
        const addedElements: (HTMLLinkElement | HTMLScriptElement)[] = [];
        let loadedCount = 0;
        const totalFiles = cssLinks.length + jsScripts.length;

        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === totalFiles) {
                setAssetsLoaded(true); //Đánh dấu khi tất cả file đã load
            }
        };

        // Load CSS
        cssLinks.forEach((href) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = href;
                link.onload = checkAllLoaded; //Kiểm tra khi load xong
                document.head.appendChild(link);
                addedElements.push(link);
            } else {
                loadedCount++;
            }
        });

        // Load JS
        jsScripts.forEach((src) => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement("script");
                script.src = src;
                script.async = false; // Giữ thứ tự tải
                script.onload = checkAllLoaded; //Đánh dấu khi load xong
                document.body.appendChild(script);
                addedElements.push(script);
            } else {
                loadedCount++;
            }
        });

        return () => {
            addedElements.forEach((el) => el.parentNode?.removeChild(el));
        };
    }, [cssLinks, jsScripts]);

    return assetsLoaded; //Trả về trạng thái tải
};

//Custom Hook
export const loadAdminAssets = () => {
    return useDynamicAssets(
        [
            "/src/Admin/assets/css/fonts.min.css",
            "/src/Admin/assets/css/bootstrap.min.css",
            "/src/Admin/assets/css/plugins.min.css",
            "/src/Admin/assets/css/kaiadmin.min.css",
        ],
        [
            "/src/Admin/assets/js/plugin/webfont/webfont.min.js",
            "/src/Admin/assets/js/core/jquery-3.7.1.min.js",
            "/src/Admin/assets/js/core/popper.min.js",
            "/src/Admin/assets/js/core/bootstrap.min.js",
            "/src/Admin/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
            "/src/Admin/assets/js/kaiadmin.min.js",
        ]
    );
};
