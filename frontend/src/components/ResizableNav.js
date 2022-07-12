import React, { useRef, useEffect } from "react";
import Nav from "./Nav.js";
import "./ResizableNav.css";

const ResizableNav = () => {
  const ref = useRef(null);
  const refRight = useRef(null);

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let x = 0;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);


    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
    };
  }, []);

  return (
    <div ref={ref} className="resizeableNav">
      <Nav></Nav>
      <div ref={refRight} className="resizer resizer-r"></div>
    </div>
  );
};

export default ResizableNav;
