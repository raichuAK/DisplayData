export default function(nodeName, nodeDescription) { return `<template id="dialog-template">
  <style>
    .wrapper {
      opacity: 0;
      transition: visibility 0s, opacity 0.25s ease-in;
    }
    .wrapper:not(.open) {
      visibility: hidden;
    }
    .wrapper.open {
      opacity: 1;
    }
    .overlay {
      height: 100%;
      position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      width: 100%;
    }
    .dialog {
      background: #ffffff;
      width: 200px;
      height: 100px;
      padding: 2px;
      position: absolute;
      top: 5px;
      left: 10px;
      color: green;
    }
    .close {
      background: green;
      max-width: 40px;
      height: 5px;
      width: 5px;
      padding: 1rem;
      position: absolute;
      top: 5px;
      left: 210px;
      color: white;
    }
    .content {
      margin-top: 50px;
    }
  </style>
  <div class="wrapper">
    <button class="close" aria-label="Close">X</button>
    <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
      <span id="title"></span>
      <div id="content" >
        <p id="description" class="content"></p>
      </div>
    </div>
  </div>
</template>`;
}
