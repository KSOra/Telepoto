import React from "react";
import {render} from "react-dom";
import './global.scss';

render(
    <div className={'content'}>
      hello world!
    </div>,
    document.getElementById("app")
);
