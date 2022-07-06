import React, { useRef, useEffect } from "react";
import "./Resizable.css"

const Resizable = () => {
  const ref = useRef(null);
  const refTop = useRef(null);
  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let height = parseInt(styles.height, 10);
    let y = 0;

    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);

    return () => {
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
    };
  }, []);
  return (
      <div ref={ref} className="resizeable">
        <div ref={refTop} className="resizer resizer-t"></div>
    </div>
  );
}

export default Resizable;