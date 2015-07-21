(function($, cornerstone, cornerstoneMath, cornerstoneTools) {

    'use strict';

    function findHandleNear(element, handles, canvasPoint) {
        var nearbyHandle;

        Object.keys(handles).forEach(function(name) {
            var handle = handles[name];
            var handleCanvas = cornerstone.pixelToCanvas(element, handle);
            var distance = cornerstoneMath.point.distance(handleCanvas, canvasPoint);
            if (distance <= 36) {
                nearbyHandle = handle;
                return;
            }
        });

        return nearbyHandle;
    }

    function getActiveHandle(handles) {
        var activeHandle;

        Object.keys(handles).forEach(function(name) {
            var handle = handles[name];
            if (handle.active === true) {
                activeHandle = handle;
                return;
            }
        });

        return activeHandle;
    }

    function handleActivator(element, handles, canvasPoint) {
        var activeHandle = getActiveHandle(handles);
        var nearbyHandle = findHandleNear(element, handles, canvasPoint);
        if (activeHandle !== nearbyHandle) {
            if (nearbyHandle !== undefined) {
                nearbyHandle.active = true;
            }

            if (activeHandle !== undefined) {
                activeHandle.active = false;
            }

            return true;
        }

        return false;
    }

    // module/private exports
    cornerstoneTools.handleActivator = handleActivator;

})($, cornerstone, cornerstoneMath, cornerstoneTools);
